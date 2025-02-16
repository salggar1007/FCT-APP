package com.iesvdc.acceso.fctapp.fctapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.fctapp.fctapp.models.Response;
import com.iesvdc.acceso.fctapp.fctapp.repository.RepoResponse;

@RestController
@RequestMapping("/fctapp")
public class ServiResponse {
    @Autowired
    RepoResponse repoResponse;

    @GetMapping("response")
    List<Response> findAll(){
        return repoResponse.findAll();
    }
}
