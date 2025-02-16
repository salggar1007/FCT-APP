package com.iesvdc.acceso.fctapp.fctapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.fctapp.fctapp.models.Vehicle;
import com.iesvdc.acceso.fctapp.fctapp.repository.RepoVehicle;

@RestController
@RequestMapping("/fctapp")
public class ServiVehicle {
    @Autowired
    RepoVehicle repoVehicle;

    @GetMapping("vehicle")
    List<Vehicle> getVehicles(){
        return repoVehicle.findAll();
    }

    @PostMapping("vehicle") 
    Vehicle create(@RequestBody Vehicle vehicle){
        return repoVehicle.save(vehicle);
    }

}
