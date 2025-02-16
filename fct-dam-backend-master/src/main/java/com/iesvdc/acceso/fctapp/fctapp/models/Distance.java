package com.iesvdc.acceso.fctapp.fctapp.models;

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
public class Distance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    //@Column(nullable = false)
    @ManyToOne
    private TextValue distance;

    //@Column(nullable = false)
    @ManyToOne
    private TextValue duration;

    @Column(nullable = false)
    private String status;
}
