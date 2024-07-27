package com.tangedco.spring.eb_billing_system.dao;

import com.tangedco.spring.eb_billing_system.entity.CommercialConnections;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommercialConnectionRepository extends JpaRepository<CommercialConnections, Long> {
    Optional<CommercialConnections> findByUser_UserId(String userId);


    //Optional<CommercialConnections> findByUserId(String );
}
