package com.tangedco.spring.eb_billing_system.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
public class CommercialConnections {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "connection_id")
    private Long id;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Getter
    @Setter
    @Column(name = "address")
    private String address;

    @Getter
    @Setter
    @Column(name = "load_required")
    private Double loadRequired;

    @Getter
    @Setter
    @Column(name = "phase")
    private Double phase;

    @Getter
    @Setter
    @Column(name = "business_name")
    private String businessName;

    @Getter
    @Setter
    @Column(name = "business_type")
    private String businessType;

    @Getter
    @Setter
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

    @Setter
    @Getter
    @Column(name = "applicant_reference_number")
    private String applicantReferenceNumber;

    @Setter
    @Getter
    @Column(name = "payment_status")
    private String paymentStatus;


    public byte[] getApplicantPhoto() {
        return applicantPhoto != null ? applicantPhoto.clone() : null;
    }

    public void setApplicantPhoto(byte[] applicantPhoto) {
        this.applicantPhoto = applicantPhoto != null ? applicantPhoto.clone() : null;
    }

    public byte[] getPropertyTaxReport() {
        return propertyTaxReport != null ? propertyTaxReport.clone() : null;
    }

    public void setPropertyTaxReport(byte[] propertyTaxReport) {
        this.propertyTaxReport = propertyTaxReport != null ? propertyTaxReport.clone() : null;
    }

    public byte[] getOwnershipProof() {
        return ownershipProof != null ? ownershipProof.clone() : null;
    }

    public void setOwnershipProof(byte[] ownershipProof) {
        this.ownershipProof = ownershipProof != null ? ownershipProof.clone() : null;
    }

    public Long getConnectionId() {
        return this.id;
    }
}
