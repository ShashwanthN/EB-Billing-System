package com.tangedco.spring.eb_billing_system.dto;

public class PaymentResponse {

    private String paymentLink;
    private String paymentLinkId;

    public PaymentResponse() {
    }

    public PaymentResponse(String paymentLink, String paymentLinkId) {
        this.paymentLink = paymentLink;
        this.paymentLinkId = paymentLinkId;
    }

    public String getPaymentLink() {
        return paymentLink;
    }

    public void setPaymentLink(String paymentLink) {
        this.paymentLink = paymentLink;
    }

    public String getPaymentLinkId() {
        return paymentLinkId;
    }

    public void setPaymentLinkId(String paymentLinkId) {
        this.paymentLinkId = paymentLinkId;
    }
}
