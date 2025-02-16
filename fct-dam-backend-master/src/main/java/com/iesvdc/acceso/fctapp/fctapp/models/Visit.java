package com.iesvdc.acceso.fctapp.fctapp.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Visit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String userId;

    @ManyToOne
    private Agreement agreement;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private VisitType type;

    @Column(nullable = false)
    private Boolean last;

    @Column(nullable = false)
    private Boolean request_help;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Conveyance transport;

    @ManyToOne
    private Vehicle vehicle;

    @Column(nullable = false)
    private Double publicTransportIncome;

    @Column(nullable = false)
    private Date beginDate;

    @Column(nullable = false)
    private Date endDate;

    @Column(nullable = false)
    private Date creationDate;

    @Column(nullable = false)
    private String observations;

    @Column(nullable = false)
    private Boolean authorized;

    @Column(nullable = true)
    private Date authorizedDate;
}
