package com.tangedco.spring.eb_billing_system.dto;

import org.springframework.web.multipart.MultipartFile;

public class HouseholdConnectionRequest {
    private String userId;
    private String address;
    private Double loadRequired;
    private Double phase;
    private MultipartFile applicantPhoto;
    private MultipartFile propertyTaxReport;

    public HouseholdConnectionRequest(String userId, String address, Double loadRequired, Double phase, MultipartFile applicantPhoto, MultipartFile propertyTaxReport) {
        this.userId = userId;
        this.address = address;
        this.loadRequired = loadRequired;
        this.phase = phase;
        this.applicantPhoto = applicantPhoto;
        this.propertyTaxReport = propertyTaxReport;
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
}
