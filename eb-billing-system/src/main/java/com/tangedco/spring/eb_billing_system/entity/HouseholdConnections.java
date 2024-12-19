package com.tangedco.spring.eb_billing_system.entity;

import jakarta.persistence.*;

@Entity
public class HouseholdConnections {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "connection_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "address")
    private String address;

    @Column(name = "load_required")
    private Double loadRequired;

    @Column(name = "phase")
    private Double phase;

    @Column(name = "applicant_photo")
    @Lob
    private byte[] applicantPhoto;

    @Column(name = "property_tax_report")
    @Lob
    private byte[] propertyTaxReport;

    @Column(name = "applicant_reference_number")
    private String applicantReferenceNumber;

    @Column(name = "payment_status")
    private String paymentStatus;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getLoadRequired() {
        return loadRequired;
    }

    public void setLoadRequired(Double loadRequired) {
        this.loadRequired = loadRequired;
    }

    public Double getPhase() {
        return phase;
    }

    public void setPhase(Double phase) {
        this.phase = phase;
    }

    public byte[] getApplicantPhoto() {
        return applicantPhoto;
    }

    public void setApplicantPhoto(byte[] applicantPhoto) {
        this.applicantPhoto = applicantPhoto;
    }

    public byte[] getPropertyTaxReport() {
        return propertyTaxReport;
    }

    public void setPropertyTaxReport(byte[] propertyTaxReport) {
        this.propertyTaxReport = propertyTaxReport;
    }

    public String getApplicantReferenceNumber() {
        return applicantReferenceNumber;
    }

    public void setApplicantReferenceNumber(String applicantReferenceNumber) {
        this.applicantReferenceNumber = applicantReferenceNumber;
    }

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public Long getConnectionId() {
        return this.id;
    }
}
