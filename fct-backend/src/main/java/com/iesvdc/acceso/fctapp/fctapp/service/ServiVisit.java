package com.iesvdc.acceso.fctapp.fctapp.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.fctapp.fctapp.models.User;
import com.iesvdc.acceso.fctapp.fctapp.models.Visit;
import com.iesvdc.acceso.fctapp.fctapp.repository.RepoVisit;

@RestController
@RequestMapping("/fctapp")
public class ServiVisit {
    @Autowired
    RepoVisit repoVisit;

    @GetMapping("visit")
    List<Visit> getVisitByUser(@RequestParam (value = "userId") String userId){
        return repoVisit.findAllByUserId(userId);
    }

    @GetMapping("visit/{id}")
    Visit getVisitById(@PathVariable (value = "id") Integer id){
        return repoVisit.findById(id).get();
    }

    @PostMapping("visit")
    Visit create(@RequestBody Visit visit){
        return repoVisit.save(visit);
    }

    @PutMapping("visit/{id}")
    Visit update(@PathVariable(value = "id") Integer id, @RequestBody Visit newVisit) {
        Visit visit = repoVisit.findById(id).get();
        if (visit != null) {
            return repoVisit.save(newVisit);
        } else {
            return null;
        }
    }

    @DeleteMapping("visit/{id}")
    void delete(@PathVariable (value = "id") Integer id){
        repoVisit.deleteById(id);
    }
}
