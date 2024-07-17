package com.tangedco.spring.eb_billing_system.dao;

import com.tangedco.spring.eb_billing_system.entity.HouseholdConnections;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HouseholdConnectionRepository extends JpaRepository<HouseholdConnections, Long> {
    Optional<HouseholdConnections> findByUser_UserId(String userId);


}
