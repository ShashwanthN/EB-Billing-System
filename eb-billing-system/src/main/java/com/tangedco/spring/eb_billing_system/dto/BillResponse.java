package com.tangedco.spring.eb_billing_system.dto;

import com.tangedco.spring.eb_billing_system.entity.Bill;
import com.tangedco.spring.eb_billing_system.entity.Payment;
import com.tangedco.spring.eb_billing_system.entity.User;

public class BillResponse {
    private User user;
    private Bill bill;
    private Payment payment;
}
