package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.dao.BillRepository;
import com.tangedco.spring.eb_billing_system.dao.HouseholdConnectionRepository;
import com.tangedco.spring.eb_billing_system.dao.CommercialConnectionRepository;
import com.tangedco.spring.eb_billing_system.dao.PaymentRepository;
import com.tangedco.spring.eb_billing_system.dto.PrintResponse;
import com.tangedco.spring.eb_billing_system.entity.*;
import com.tangedco.spring.eb_billing_system.entity.HouseholdConnections;
import com.tangedco.spring.eb_billing_system.entity.CommercialConnections;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;
@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private HouseholdConnectionRepository householdConnectionRepository;

    @Autowired
    private CommercialConnectionRepository commercialConnectionRepository;

    @Autowired
    private RestTemplate restTemplate;

    private static final Logger logger = LoggerFactory.getLogger(PaymentServiceImpl.class);

    public void fetchAndStorePaymentDetails(String paymentId, int billId) {
        String url = "https://api.razorpay.com/v1/payments/" + paymentId;

        PrintResponse response;
        try {
            response = restTemplate.getForObject(url, PrintResponse.class);
        } catch (Exception e) {
            logger.error("Error fetching payment details from Razorpay: {}", e.getMessage());
            throw new RuntimeException("Error fetching payment details");
        }

        Bill bill = billRepository.findById(billId)
                .orElseThrow(() -> new RuntimeException("Bill not found"));

        MeterReadings meterReadings = bill.getMeterReading();
        if (meterReadings == null) {
            logger.error("MeterReadings not found for billId: {}", billId);
            throw new RuntimeException("Meter readings not found");
        }

        if (response != null) {
            Payment payment = new Payment();


            String connectionType = meterReadings.getConnectionType();
            String userId = meterReadings.getUserId();
            boolean serviceNoSet = false;

            if ("household".equals(connectionType)) {
                Optional<HouseholdConnections> householdConnection = householdConnectionRepository.findByUser_UserId(userId);
                if (householdConnection.isPresent()) {
                    payment.setServiceNo(householdConnection.get().getConnectionId());
                    serviceNoSet = true;
                }
            } else if ("commercial".equals(connectionType)) {
                Optional<CommercialConnections> commercialConnection = commercialConnectionRepository.findByUser_UserId(userId);
                if (commercialConnection.isPresent()) {
                    payment.setServiceNo(commercialConnection.get().getConnectionId());
                    serviceNoSet = true;
                }
            }

            if (!serviceNoSet) {
                logger.error("Service number not found for userId: {} and connectionType: {}", userId, connectionType);
                throw new RuntimeException("Service number not found for the given user and connection type");
            }

            payment.setBill(bill);
            payment.setReceiptNo(response.getOrder_id());
            payment.setAmountDebited(response.getAmount() / 100.0); // Ensure correct type conversion
            payment.setTransactionNo(response.getAcquirer_data().get("bank_transaction_id"));
            payment.setReceiptDate(new java.util.Date(response.getCreated_at() * 1000L)); // Convert to Date
            payment.setBankName(response.getBank());
            payment.setCardType(response.getMethod());

            paymentRepository.save(payment);
        } else {
            logger.error("No response received for paymentId: {}", paymentId);
            throw new RuntimeException("Failed to fetch payment details from Razorpay");
        }
    }

    @Override
    public List<Payment> getPaymentsByBillId(int billId) {
        return paymentRepository.findByBill_BillId(billId);
    }
}
