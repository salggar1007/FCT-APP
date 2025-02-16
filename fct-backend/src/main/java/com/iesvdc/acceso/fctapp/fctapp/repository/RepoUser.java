package com.iesvdc.acceso.fctapp.fctapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iesvdc.acceso.fctapp.fctapp.models.User;

@Repository
public interface RepoUser extends JpaRepository<User, Integer>{
    User findByUid(String uid);
}
