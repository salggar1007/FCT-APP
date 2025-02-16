package com.iesvdc.acceso.fctapp.fctapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iesvdc.acceso.fctapp.fctapp.models.Location;

@Repository
public interface RepoLocation extends JpaRepository<Location, Integer>{
    
}
