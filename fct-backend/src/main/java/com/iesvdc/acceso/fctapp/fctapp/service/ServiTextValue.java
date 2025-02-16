package com.iesvdc.acceso.fctapp.fctapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.fctapp.fctapp.models.TextValue;
import com.iesvdc.acceso.fctapp.fctapp.repository.RepoTextValue;

@RestController
@RequestMapping("/fctapp")
public class ServiTextValue {
    @Autowired
    RepoTextValue repoTextValue;

    @GetMapping("text_value")
    List<TextValue> findAll(){
        return repoTextValue.findAll();
    }

    @PostMapping("text_value")
    TextValue create(@RequestBody TextValue textValue){
        return repoTextValue.save(textValue);
    }
}
