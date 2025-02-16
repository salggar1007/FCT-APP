package com.iesvdc.acceso.fctapp.fctapp.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String uid;

    @Column(nullable = false)
    private String email;

    // @Column(nullable = true)
    // private String model;

    // @Column(nullable = true)
    // private String registrationNumber;

    @OneToOne
    private Vehicle vehicle;

    @Column(nullable = false)
    private Boolean admin;
}
