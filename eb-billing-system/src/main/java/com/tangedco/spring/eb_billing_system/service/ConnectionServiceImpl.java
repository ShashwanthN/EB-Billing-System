package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.dao.HouseholdConnectionRepository;
import com.tangedco.spring.eb_billing_system.dao.CommercialConnectionRepository;
import com.tangedco.spring.eb_billing_system.dao.UserRepository;
import com.tangedco.spring.eb_billing_system.dto.HouseholdConnectionRequest;
import com.tangedco.spring.eb_billing_system.dto.CommercialConnectionRequest;
import com.tangedco.spring.eb_billing_system.entity.HouseholdConnections;
import com.tangedco.spring.eb_billing_system.entity.CommercialConnections;
import com.tangedco.spring.eb_billing_system.entity.User;
import com.tangedco.spring.eb_billing_system.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class ConnectionServiceImpl implements ConnectionService {

    private static final Logger logger = LoggerFactory.getLogger(ConnectionServiceImpl.class);

    private final HouseholdConnectionRepository householdConnectionRepository;
    private final CommercialConnectionRepository commercialConnectionRepository;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Autowired
    public ConnectionServiceImpl(HouseholdConnectionRepository householdConnectionRepository,
                                 CommercialConnectionRepository commercialConnectionRepository,
                                 UserRepository userRepository, JwtUtil jwtUtil) {
        this.householdConnectionRepository = householdConnectionRepository;
        this.commercialConnectionRepository = commercialConnectionRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public HouseholdConnections registerHouseholdConnection(HouseholdConnectionRequest request) {
        logger.info("Registering household connection for user ID: {}", request.getUserId());

        HouseholdConnections connection = new HouseholdConnections();
        String userId = request.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        connection.setUser(user);
        connection.setAddress(request.getAddress());
        connection.setLoadRequired(request.getLoadRequired());
        connection.setPhase(request.getPhase());

        try {
            connection.setApplicantPhoto(convertMultipartFileToBytes(request.getApplicantPhoto()));
            connection.setPropertyTaxReport(convertMultipartFileToBytes(request.getPropertyTaxReport()));
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert MultipartFile to byte[]", e);
        }

        connection.setApplicantReferenceNumber(generateReferenceNumber());
        connection.setPaymentStatus("not_paid");
        return householdConnectionRepository.save(connection);
    }

    @Override
    public CommercialConnections registerCommercialConnection(CommercialConnectionRequest request) {
        logger.info("Registering commercial connection for user ID: {}", request.getUserId());

        CommercialConnections connection = new CommercialConnections();
        String userId = request.getUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        connection.setUser(user);
        connection.setAddress(request.getAddress());
        connection.setLoadRequired(request.getLoadRequired());
        connection.setPhase(request.getPhase());
        connection.setBusinessName(request.getBusinessName());
        connection.setBusinessType(request.getBusinessType());
        connection.setSqMeter(request.getSqMeter());

        try {
            connection.setApplicantPhoto(convertMultipartFileToBytes(request.getApplicantPhoto()));
            connection.setPropertyTaxReport(convertMultipartFileToBytes(request.getPropertyTaxReport()));
            connection.setOwnershipProof(convertMultipartFileToBytes(request.getOwnershipProof()));
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert MultipartFile to byte[]", e);
        }

        connection.setApplicantReferenceNumber(generateReferenceNumber());
        connection.setPaymentStatus("not_paid");
        return commercialConnectionRepository.save(connection);
    }

    @Override
    public HouseholdConnections markHouseholdConnectionAsPaid(String id) {
        logger.info("Marking household connection as paid for ID: {}", id);

        HouseholdConnections connection = householdConnectionRepository.findById(Long.parseLong(id)) // Convert String to Long
                .orElseThrow(() -> new RuntimeException("Household connection not found with ID: " + id));
        connection.setPaymentStatus("paid"); // Set to a valid ENUM value
        return householdConnectionRepository.save(connection);
    }

    @Override
    public CommercialConnections markCommercialConnectionAsPaid(String id) {
        logger.info("Marking commercial connection as paid for ID: {}", id);

        CommercialConnections connection = commercialConnectionRepository.findById(Long.parseLong(id)) // Convert String to Long
                .orElseThrow(() -> new RuntimeException("Commercial connection not found with ID: " + id));
        connection.setPaymentStatus("paid");
        return commercialConnectionRepository.save(connection);
    }

    private byte[] convertMultipartFileToBytes(MultipartFile file) throws IOException {
        return file.getBytes();
    }
    @Override
    public Optional<HouseholdConnections> getHouseholdConnectionByReferenceNumber(String userId, String referenceNumber) {
        return householdConnectionRepository.findByUser_UserIdAndApplicantReferenceNumber(userId, referenceNumber);
    }
@Override
    public Optional<CommercialConnections> getCommercialConnectionByReferenceNumber(String userId, String referenceNumber) {
        return commercialConnectionRepository.findByUser_UserIdAndApplicantReferenceNumber(userId, referenceNumber);
    }
    private String generateReferenceNumber() {
        return UUID.randomUUID().toString();
    }
    @Override
    public Optional<HouseholdConnections> getHouseholdConnectionByUserId(String userId) {

        return householdConnectionRepository.findByUser_UserId(userId);
    }


    @Override
    public Optional<CommercialConnections> getCommercialConnectionByUserId(String userId) {
        return commercialConnectionRepository.findByUser_UserId(userId);
    }

    @Override
    public Optional<HouseholdConnections> getHouseholdConnectionByConnectionId(Long Id) {

        return householdConnectionRepository.findById(Id);
    }
    @Override
    public Optional<CommercialConnections> getCommercialConnectionConnectionId(Long Id) {
        return commercialConnectionRepository.findById(Id);
    }
}
