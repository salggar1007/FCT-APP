package com.iesvdc.acceso.fctapp.fctapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.fctapp.fctapp.models.Distance;
import com.iesvdc.acceso.fctapp.fctapp.repository.RepoDistance;

@RestController
@RequestMapping("/fctapp")
public class ServiDistance {
    @Autowired
    RepoDistance repoDistance;

    @GetMapping("distance")
    List<Distance> findAll(){
        return repoDistance.findAll();
    }

    @PostMapping("distance")
    Distance create(@RequestBody Distance distance){
        return repoDistance.save(distance);
    }
}
