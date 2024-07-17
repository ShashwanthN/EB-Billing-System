
package com.tangedco.spring.eb_billing_system.dao;

import com.tangedco.spring.eb_billing_system.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<Bill, Integer> {
}
