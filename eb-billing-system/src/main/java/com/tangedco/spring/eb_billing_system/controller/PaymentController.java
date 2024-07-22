package com.tangedco.spring.eb_billing_system.controller;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.tangedco.spring.eb_billing_system.dto.PaymentResponse;
import com.tangedco.spring.eb_billing_system.entity.Bill;
import com.tangedco.spring.eb_billing_system.entity.MeterReadings;
import com.tangedco.spring.eb_billing_system.entity.User;
import com.tangedco.spring.eb_billing_system.service.MeterReadingsService;
import com.tangedco.spring.eb_billing_system.service.UserService;
import com.tangedco.spring.eb_billing_system.utils.RetryUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.Callable;

@RestController
@RequestMapping("/payment")
public class PaymentController {

    @Value("${razorpay.key_id}")
    private String apiKey;

    @Value("${razorpay.key_secret}")
    private String apiSecret;

    @Autowired
    private MeterReadingsService billingService;

    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @PostMapping("process/{UserId}/{ReadingId}")
    public ResponseEntity<PaymentResponse> createPaymentLink(@PathVariable int ReadingId, @PathVariable String UserId) throws RazorpayException {
        Bill order = billingService.getBillByReadingId(ReadingId);
        User details = userService.findById(UserId);

        try {
            RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);

            Callable<PaymentLink> createPaymentLinkCallable = () -> {
                JSONObject paymentLinkRequest = new JSONObject();
                paymentLinkRequest.put("amount", order.getAmount() * 100);
                paymentLinkRequest.put("currency", "INR");

                JSONObject customer = new JSONObject();
                customer.put("name", details.getFirstName());
                customer.put("email", details.getEmail());
                customer.put("contact", details.getPhoneNumber());
                paymentLinkRequest.put("customer", customer);

                JSONObject notify = new JSONObject();
                notify.put("sms", true);
                notify.put("email", true);
                paymentLinkRequest.put("notify", notify);
                paymentLinkRequest.put("callback_url", "http://localhost:5173/Payment_Success/" + order.getBillId());
                paymentLinkRequest.put("callback_method", "get");

                return razorpayClient.paymentLink.create(paymentLinkRequest);
            };

            PaymentLink payment = RetryUtils.retryWithBackoff(createPaymentLinkCallable);
            String paymentLinkId = payment.get("id");
            String paymentLinkUrl = payment.get("short_url");
            PaymentResponse res = new PaymentResponse();
            res.setPaymentLink(paymentLinkUrl);
            res.setPaymentLinkId(paymentLinkId);
            return new ResponseEntity<>(res, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new RazorpayException(e.getMessage());
        }
    }

    @GetMapping("/redirect")
    public ResponseEntity<MeterReadings> redirect(@RequestParam(name="payment_id") String paymentId, @RequestParam(name="Order_id") int readingId) throws RazorpayException {
        logger.info("Redirect method called with paymentId: {} and readingId: {}", paymentId, readingId);

        Bill bill = billingService.getBillByReadingId(readingId);
        logger.info("Retrieved bill with amount: {}", bill.getAmount());

        MeterReadings meter = billingService.getMeterReadingByReadingId(readingId);
        logger.info("Retrieved meter reading with ID: {}", meter.getReadingId());

        RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);

        try {
            Callable<Payment> fetchPaymentCallable = () -> razorpayClient.payments.fetch(paymentId);
            Payment payment = RetryUtils.retryWithBackoff(fetchPaymentCallable);

            logger.info("Fetched payment with details: {}", payment.toString());

            if (payment.get("status").equals("captured")) {
                meter.setPaymentStatus("paid");
                logger.info("Setting payment status to 'paid' for reading ID: {}", meter.getReadingId());

                billingService.saveMeterReading(meter);
                logger.info("Meter reading updated in database for reading ID: {}", meter.getReadingId());
            }

            return new ResponseEntity<>(meter, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            logger.error("Error processing payment redirect", e);
            throw new RazorpayException(e.getMessage());
        }
    }
}
