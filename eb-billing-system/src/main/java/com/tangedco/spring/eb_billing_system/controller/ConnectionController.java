package com.tangedco.spring.eb_billing_system.controller;
import com.tangedco.spring.eb_billing_system.dto.HouseholdConnectionRequest;
import com.tangedco.spring.eb_billing_system.dto.CommercialConnectionRequest;
import com.tangedco.spring.eb_billing_system.entity.HouseholdConnections;
import com.tangedco.spring.eb_billing_system.entity.CommercialConnections;
import com.tangedco.spring.eb_billing_system.service.ConnectionService;
import com.tangedco.spring.eb_billing_system.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
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

        HouseholdConnectionRequest request = new HouseholdConnectionRequest(
                userId, address, loadRequired, phase, applicantPhoto, propertyTaxReport);

        HouseholdConnections connection = connectionService.registerHouseholdConnection(request);

        String paymentUrl = generatePaymentUrl(connection);
        Map<String, Object> response = new HashMap<>();
        response.put("payment_url", paymentUrl);
        response.put("reference_number", connection.getApplicantReferenceNumber());

        return ResponseEntity.ok(response);
    }


    @Autowired
    private UserService userService;

    @GetMapping("/details")
    public ResponseEntity<?> getConnectionDetails(
            @RequestParam String userId,
            @RequestParam String referenceNumber,
            @RequestParam String connectionType) {

        if (connectionType.equalsIgnoreCase("household")) {
            Optional<HouseholdConnections> householdConnection = connectionService.getHouseholdConnectionByReferenceNumber(userId, referenceNumber);
            if (householdConnection.isPresent()) {
                return ResponseEntity.ok(householdConnection.get());
            }
        } else if (connectionType.equalsIgnoreCase("commercial")) {
            Optional<CommercialConnections> commercialConnection = connectionService.getCommercialConnectionByReferenceNumber(userId, referenceNumber);
            if (commercialConnection.isPresent()) {
                return ResponseEntity.ok(commercialConnection.get());
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Connection details not found.");
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

        CommercialConnectionRequest request = new CommercialConnectionRequest(
                userId, address, loadRequired, phase, applicantPhoto, propertyTaxReport, businessName, businessType, sqMeter, ownershipProof);
        CommercialConnections connection = connectionService.registerCommercialConnection(request);
        String paymentUrl = generatePaymentUrl(connection);

        Map<String, Object> response = new HashMap<>();
        response.put("payment_url", paymentUrl);
        response.put("reference_number", connection.getApplicantReferenceNumber());

        return ResponseEntity.ok(response);
    }

    private String generatePaymentUrl(HouseholdConnections connection) {
        return "http://payment-url.com?connectionId=" + connection.getId();
    }

    private String generatePaymentUrl(CommercialConnections connection) {
        return "http://payment-url.com?connectionId=" + connection.getId();
    }

    @GetMapping("/type/{userId}")
    public ResponseEntity<String> getConnectionType(@PathVariable String userId) {
        Optional<HouseholdConnections> householdConnection = connectionService.getHouseholdConnectionByUserId(userId);
        Optional<CommercialConnections> commercialConnection = connectionService.getCommercialConnectionByUserId(userId);

        if (householdConnection.isPresent()) {
            return ResponseEntity.ok("household");
        } else if (commercialConnection.isPresent()) {
            return ResponseEntity.ok("commercial");
        } else {
            return ResponseEntity.ok("none");
        }
    }
}
