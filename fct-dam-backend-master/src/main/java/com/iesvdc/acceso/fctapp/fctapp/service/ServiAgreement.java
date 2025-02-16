package com.iesvdc.acceso.fctapp.fctapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.fctapp.fctapp.models.Agreement;
import com.iesvdc.acceso.fctapp.fctapp.repository.RepoAgreement;

@RestController
@RequestMapping("/fctapp")
public class ServiAgreement {
    @Autowired
    RepoAgreement repoAgreement;

    @GetMapping("agreement/{id}")
    Agreement getAgreementById(@PathVariable (value = "id") Integer id){
        return repoAgreement.findById(id).get();
    }

    @GetMapping("agreement")
    List<Agreement> getAgreementByUser(@RequestParam (value = "userId") String userId){
        return repoAgreement.findAllByUserId(userId);
    }

    @PostMapping("agreement")
    Agreement create(@RequestBody Agreement agreement){
        return repoAgreement.save(agreement);
    }

    @DeleteMapping("agreement/{id}")
    void delete(@PathVariable (value = "id") Integer id){
        repoAgreement.deleteById(id);
    }
}
