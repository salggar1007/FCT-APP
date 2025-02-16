package com.iesvdc.acceso.fctapp.fctapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.fctapp.fctapp.models.Business;
import com.iesvdc.acceso.fctapp.fctapp.repository.RepoBusiness;

@RestController
@RequestMapping("/fctapp")
public class ServiBusiness {
    @Autowired
    RepoBusiness repoBusiness;

    @GetMapping("business")
    List<Business> getBusiness(){
        return repoBusiness.findAll();
    }

    @GetMapping("business/{id}")
    Business getBusinessById(@PathVariable (value = "id") Integer id){
        return repoBusiness.findById(id).get();
    }

    @PostMapping("business")
    Business create(@RequestBody Business business){
        return repoBusiness.save(business);
    }

    @DeleteMapping("business/{id}")
    void delete(@PathVariable (value = "id") Integer id){
        repoBusiness.deleteById(id);
    }
}
