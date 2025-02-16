package com.iesvdc.acceso.fctapp.fctapp.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Agreement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String students;

    @Column(nullable = false)
    private Date beginDate;

    @Column(nullable = false)
    private Date endDate;

    @Column(nullable = false)
    private Date creationDate;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false)
    private Integer businessId;

    @ManyToOne
    private Business agreementBusiness;
}
