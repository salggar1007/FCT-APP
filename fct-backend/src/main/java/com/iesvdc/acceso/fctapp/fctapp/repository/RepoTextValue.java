package com.iesvdc.acceso.fctapp.fctapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iesvdc.acceso.fctapp.fctapp.models.TextValue;

@Repository
public interface RepoTextValue extends JpaRepository<TextValue, Integer>{
    
}
