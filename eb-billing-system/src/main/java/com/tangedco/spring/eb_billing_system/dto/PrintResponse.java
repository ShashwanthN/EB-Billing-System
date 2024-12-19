package com.tangedco.spring.eb_billing_system.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Setter
@Getter
public class PrintResponse {

    private String id;
    private String entity;
    private int amount;
    private String currency;
    private String status;
    private String order_id;
    private String invoice_id;
    private boolean international;
    private String method;
    private int amount_refunded;
    private String refund_status;
    private boolean captured;
    private String description;
    private String card_id;
    private String bank;
    private String wallet;
    private String vpa;
    private String email;
    private String contact;
    private Map<String, String> acquirer_data;
    private long created_at;


}
