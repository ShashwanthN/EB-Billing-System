package com.tangedco.spring.eb_billing_system.controller;

import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.tangedco.spring.eb_billing_system.dto.PaymentResponse;
import com.tangedco.spring.eb_billing_system.entity.*;
import com.tangedco.spring.eb_billing_system.service.*;
import com.tangedco.spring.eb_billing_system.utils.RetryUtils;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.Callable;

@Controller
@RequestMapping("/payment")
public class PaymentController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);
    @Value("${razorpay.key_id}")
    private String apiKey;
    @Value("${razorpay.key_secret}")
    private String apiSecret;
    @Autowired
    private MeterReadingsService billingService;
    @Autowired
    private ConnectionService connectionService;
    @Autowired
    private UserService userService;
    @Autowired
    private PdfService pdfService;
    @Autowired
    private PaymentServiceImpl paymentServiceImpl;

    @PostMapping("/process/{UserId}/{connection_id}/{connectionType}")
    public ResponseEntity<PaymentResponse> createPaymentLinkForServiceRegistration(
            @PathVariable Long connection_id,
            @PathVariable String UserId,
            @PathVariable String connectionType) throws RazorpayException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = (String) authentication.getPrincipal();

        if (!UserId.equals(currentUserId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to create a payment link for this user.");
        }

        User details = userService.findById(UserId);
        if (details == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found.");
        }

        double amount = 0;

        if (connectionType.equalsIgnoreCase("household")) {
            Optional<HouseholdConnections> householdConnection = connectionService.getHouseholdConnectionByConnectionId(connection_id);
            if (householdConnection.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Household connection not found.");
            }
            //amount = householdConnection.get().getRegistrationAmount();
        } else if (connectionType.equalsIgnoreCase("commercial")) {
            Optional<CommercialConnections> commercialConnection = connectionService.getCommercialConnectionConnectionId(connection_id);
            if (commercialConnection.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Commercial connection not found.");
            }
            // amount = commercialConnection.get().getRegistrationAmount();
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid connection type.");
        }

        try {
            RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);

            Callable<PaymentLink> createPaymentLinkCallable = () -> {
                JSONObject paymentLinkRequest = new JSONObject();
                paymentLinkRequest.put("amount", 1850 * 100);
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
                paymentLinkRequest.put("callback_url", "http://localhost:5173/Payment_Success/Service/" + connection_id + "/" + connectionType);
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
            logger.error("Error creating payment link for service registration", e);
            throw new RazorpayException(e.getMessage());
        }
    }

    @PostMapping("/process/{UserId}/{ReadingId}")
    public ResponseEntity<PaymentResponse> createPaymentLink(@PathVariable int ReadingId, @PathVariable String UserId) throws RazorpayException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = (String) authentication.getPrincipal();


        if (!UserId.equals(currentUserId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to create a payment link for this user.");
        }

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

                // http://192.168.0.102:8080/
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
    public ResponseEntity<MeterReadings> redirect(@RequestParam(name = "payment_id") String paymentId, @RequestParam(name = "Order_id") int readingId) throws RazorpayException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = (String) authentication.getPrincipal();

        MeterReadings meter = billingService.getMeterReadingByReadingId(readingId);


        if (!meter.getUserId().equals(currentUserId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to access this resource.");
        }

        logger.info("Redirect method called with paymentId: {} and readingId: {}", paymentId, readingId);

        Bill bill = billingService.getBillByReadingId(readingId);
        logger.info("Retrieved bill with amount: {}", bill.getAmount());

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

                paymentServiceImpl.fetchAndStorePaymentDetails(paymentId, bill.getBillId());
                logger.info("Payment details stored for bill ID: {}", bill.getBillId());
            }

            return new ResponseEntity<>(meter, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            logger.error("Error processing payment redirect", e);
            throw new RazorpayException(e.getMessage());
        }
    }

    @GetMapping("/redirect/registration")
    public ResponseEntity<Void> redirectForServiceRegistration(
            @RequestParam(name = "payment_id") String paymentId,
            @RequestParam(name = "Connection_id") Long connectionId,
            @RequestParam(name = "connectionType") String connectionType) throws RazorpayException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = (String) authentication.getPrincipal();

        User user = userService.findById(currentUserId);

        if (user == null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "User not authorized.");
        }

        RazorpayClient razorpayClient = new RazorpayClient(apiKey, apiSecret);

        try {
            Callable<Payment> fetchPaymentCallable = () -> razorpayClient.payments.fetch(paymentId);
            Payment payment = RetryUtils.retryWithBackoff(fetchPaymentCallable);

            logger.info("Fetched payment with details: {}", payment.toString());

            if (payment.get("status").equals("captured")) {
                if (connectionType.equalsIgnoreCase("household")) {
                    HouseholdConnections connection = connectionService.getHouseholdConnectionByConnectionId(connectionId).orElseThrow(() ->
                            new ResponseStatusException(HttpStatus.NOT_FOUND, "Connection not found.")
                    );
                    connectionService.markHouseholdConnectionAsPaid(connectionId.toString());
                    logger.info("Marked household connection as paid for ID: {}", connectionId);
                } else if (connectionType.equalsIgnoreCase("commercial")) {
                    CommercialConnections connection = connectionService.getCommercialConnectionConnectionId(connectionId).orElseThrow(() ->
                            new ResponseStatusException(HttpStatus.NOT_FOUND, "Connection not found.")
                    );
                    connectionService.markCommercialConnectionAsPaid(connectionId.toString());
                    logger.info("Marked commercial connection as paid for ID: {}", connectionId);
                }
            }

            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (Exception e) {
            logger.error("Error processing payment redirect", e);
            throw new RazorpayException(e.getMessage());
        }
    }


    @GetMapping("/receipt/{readingId}")
    public ResponseEntity<byte[]> downloadReceipt(@PathVariable int readingId) throws IOException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserId = (String) authentication.getPrincipal();

        MeterReadings meterReadings = billingService.getMeterReadingByReadingId(readingId);


        if (!meterReadings.getUserId().equals(currentUserId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to access this receipt.");
        }

        User user = userService.findById(meterReadings.getUserId());
        Bill bill = billingService.getBillByReadingId(readingId);
        List<com.tangedco.spring.eb_billing_system.entity.Payment> payments = paymentServiceImpl.getPaymentsByBillId(bill.getBillId());


        byte[] pdfBytes = pdfService.generatePaymentReceipt(user, payments);

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=receipt.pdf");
        headers.add(HttpHeaders.CONTENT_TYPE, "application/pdf");

        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }
}
