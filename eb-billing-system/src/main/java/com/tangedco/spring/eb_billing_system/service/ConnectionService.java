package com.tangedco.spring.eb_billing_system.service;

import com.tangedco.spring.eb_billing_system.dto.HouseholdConnectionRequest;
import com.tangedco.spring.eb_billing_system.dto.CommercialConnectionRequest;
import com.tangedco.spring.eb_billing_system.entity.HouseholdConnections;
import com.tangedco.spring.eb_billing_system.entity.CommercialConnections;

import java.util.Optional;

public interface ConnectionService {
    HouseholdConnections registerHouseholdConnection(HouseholdConnectionRequest request);
    CommercialConnections registerCommercialConnection(CommercialConnectionRequest request);
    HouseholdConnections markHouseholdConnectionAsPaid(String id);
    CommercialConnections markCommercialConnectionAsPaid(String id);

    Optional<HouseholdConnections> getHouseholdConnectionByUserId(String userId);
    Optional<CommercialConnections> getCommercialConnectionByUserId(String userId);
}
