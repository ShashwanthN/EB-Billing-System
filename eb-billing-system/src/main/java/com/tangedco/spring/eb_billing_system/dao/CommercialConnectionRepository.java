package com.tangedco.spring.eb_billing_system.dao;

import com.tangedco.spring.eb_billing_system.entity.CommercialConnections;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommercialConnectionRepository extends JpaRepository<CommercialConnections, Long> {
}
