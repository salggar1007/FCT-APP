package com.iesvdc.acceso.fctapp.fctapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.fctapp.fctapp.models.Teacher;
import com.iesvdc.acceso.fctapp.fctapp.repository.RepoTeacher;

@RestController
@RequestMapping("/fctapp")
public class ServiTeacher {
    @Autowired
    RepoTeacher repoTeacher;

    @GetMapping("teacher")
    List<Teacher> findAll(){
        return repoTeacher.findAll();
    }
}
