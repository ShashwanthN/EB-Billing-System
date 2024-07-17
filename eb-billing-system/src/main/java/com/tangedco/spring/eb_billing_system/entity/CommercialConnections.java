package com.tangedco.spring.eb_billing_system.entity;

import jakarta.persistence.*;

@Entity
public class CommercialConnections {

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

    @Column(name = "business_name")
    private String businessName;

    @Column(name = "business_type")
    private String businessType;

    @Column(name = "sq_meter")
    private Double sqMeter;

    @Column(name = "applicant_photo")
    @Lob
    private byte[] applicantPhoto;

    @Column(name = "property_tax_report")
    @Lob
    private byte[] propertyTaxReport;

    @Column(name = "ownership_proof")
    @Lob
    private byte[] ownershipProof;

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

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBusinessType() {
        return businessType;
    }

    public void setBusinessType(String businessType) {
        this.businessType = businessType;
    }

    public Double getSqMeter() {
        return sqMeter;
    }

    public void setSqMeter(Double sqMeter) {
        this.sqMeter = sqMeter;
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

    public byte[] getOwnershipProof() {
        return ownershipProof;
    }

    public void setOwnershipProof(byte[] ownershipProof) {
        this.ownershipProof = ownershipProof;
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
