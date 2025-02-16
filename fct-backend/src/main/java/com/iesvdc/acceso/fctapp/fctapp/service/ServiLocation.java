package com.iesvdc.acceso.fctapp.fctapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.fctapp.fctapp.models.Location;
import com.iesvdc.acceso.fctapp.fctapp.repository.RepoLocation;

@RestController
@RequestMapping("/fctapp")
public class ServiLocation {
    @Autowired
    RepoLocation repoLocation;

    @GetMapping("location")
    List<Location> findAll(){
        return repoLocation.findAll();
    }

    @PostMapping("location")
    Location create(@RequestBody Location location){
        return repoLocation.save(location);
    }
}
