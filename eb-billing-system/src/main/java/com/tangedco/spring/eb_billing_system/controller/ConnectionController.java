package com.tangedco.spring.eb_billing_system.controller;

import com.tangedco.spring.eb_billing_system.dto.HouseholdConnectionRequest;
import com.tangedco.spring.eb_billing_system.dto.CommercialConnectionRequest;
import com.tangedco.spring.eb_billing_system.entity.HouseholdConnections;
import com.tangedco.spring.eb_billing_system.entity.CommercialConnections;
import com.tangedco.spring.eb_billing_system.service.ConnectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/connections")
public class ConnectionController {

    private static final Logger logger = LoggerFactory.getLogger(ConnectionController.class);

    private final ConnectionService connectionService;

    @Autowired
    public ConnectionController(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @PostMapping("/household")
    public ResponseEntity<?> registerHouseholdConnection(
            @RequestParam("userId") String userId,
            @RequestParam("address") String address,
            @RequestParam("load_required") Double loadRequired,
            @RequestParam("phase") Double phase,
            @RequestParam("applicant_photo") MultipartFile applicantPhoto,
            @RequestParam("property_tax_report") MultipartFile propertyTaxReport) {

        HouseholdConnectionRequest request = new HouseholdConnectionRequest(userId, address, loadRequired, phase, applicantPhoto, propertyTaxReport);
        HouseholdConnections connection = connectionService.registerHouseholdConnection(request);
        String paymentUrl = generatePaymentUrl(connection);
        return ResponseEntity.ok(Collections.singletonMap("payment_url", paymentUrl));
    }

    @PostMapping("/commercial")
    public ResponseEntity<?> registerCommercialConnection(
            @RequestParam("userId") String userId,
            @RequestParam("address") String address,
            @RequestParam("load_required") Double loadRequired,
            @RequestParam("phase") Double phase,
            @RequestParam("applicant_photo") MultipartFile applicantPhoto,
            @RequestParam("property_tax_report") MultipartFile propertyTaxReport,
            @RequestParam("business_name") String businessName,
            @RequestParam("business_type") String businessType,
            @RequestParam("sq_meter") Double sqMeter,
            @RequestParam("ownership_proof") MultipartFile ownershipProof) {

        CommercialConnectionRequest request = new CommercialConnectionRequest(userId, address, loadRequired, phase, applicantPhoto, propertyTaxReport, businessName, businessType, sqMeter, ownershipProof);
        CommercialConnections connection = connectionService.registerCommercialConnection(request);
        String paymentUrl = generatePaymentUrl(connection);
        return ResponseEntity.ok(Collections.singletonMap("payment_url", paymentUrl));
    }

    @PutMapping("/household/{id}/pay")
    public ResponseEntity<HouseholdConnections> markHouseholdConnectionAsPaid(@PathVariable String id) {
        logger.info("Marking household connection as paid for ID: {}", id);
        HouseholdConnections connection = connectionService.markHouseholdConnectionAsPaid(id);
        return ResponseEntity.ok(connection);
    }

    @PutMapping("/commercial/{id}/pay")
    public ResponseEntity<CommercialConnections> markCommercialConnectionAsPaid(@PathVariable String id) {
        logger.info("Marking commercial connection as paid for ID: {}", id);
        CommercialConnections connection = connectionService.markCommercialConnectionAsPaid(id);
        return ResponseEntity.ok(connection);
    }

    private String generatePaymentUrl(HouseholdConnections connection) {
        return "http://payment-url.com?connectionId=" + connection.getId();
    }

    private String generatePaymentUrl(CommercialConnections connection) {
        return "http://payment-url.com?connectionId=" + connection.getId();
    }
}
