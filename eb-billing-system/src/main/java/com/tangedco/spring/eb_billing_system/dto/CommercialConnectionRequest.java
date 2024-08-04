package com.tangedco.spring.eb_billing_system.dto;

import org.springframework.web.multipart.MultipartFile;

public class CommercialConnectionRequest {
    private String userId;
    private String address;
    private Double loadRequired;
    private Double phase;
    private MultipartFile applicantPhoto;
    private MultipartFile propertyTaxReport;
    private String businessName;
    private String businessType;
    private Double sqMeter;
    private MultipartFile ownershipProof;

    public CommercialConnectionRequest(String userId, String address, Double loadRequired, Double phase, MultipartFile applicantPhoto, MultipartFile propertyTaxReport, String businessName, String businessType, Double sqMeter, MultipartFile ownershipProof) {
        this.userId = userId;
        this.address = address;
        this.loadRequired = loadRequired;
        this.phase = phase;
        this.applicantPhoto = applicantPhoto;
        this.propertyTaxReport = propertyTaxReport;
        this.businessName = businessName;
        this.businessType = businessType;
        this.sqMeter = sqMeter;
        this.ownershipProof = ownershipProof;
    }


    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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

    public MultipartFile getApplicantPhoto() {
        return applicantPhoto;
    }

    public void setApplicantPhoto(MultipartFile applicantPhoto) {
        this.applicantPhoto = applicantPhoto;
    }

    public MultipartFile getPropertyTaxReport() {
        return propertyTaxReport;
    }

    public void setPropertyTaxReport(MultipartFile propertyTaxReport) {
        this.propertyTaxReport = propertyTaxReport;
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

    public MultipartFile getOwnershipProof() {
        return ownershipProof;
    }

    public void setOwnershipProof(MultipartFile ownershipProof) {
        this.ownershipProof = ownershipProof;
    }
}
