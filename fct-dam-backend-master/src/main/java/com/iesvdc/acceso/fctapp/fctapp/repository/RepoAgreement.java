package com.iesvdc.acceso.fctapp.fctapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iesvdc.acceso.fctapp.fctapp.models.Agreement;

@Repository
public interface RepoAgreement extends JpaRepository<Agreement, Integer>{
    List<Agreement> findAllByUserId(String userId);
}
