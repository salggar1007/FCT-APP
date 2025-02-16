package com.iesvdc.acceso.fctapp.fctapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iesvdc.acceso.fctapp.fctapp.models.Visit;

@Repository
public interface RepoVisit extends JpaRepository<Visit, Integer>{
    List<Visit> findAllByUserId(String userId);
}
