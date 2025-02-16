package com.iesvdc.acceso.fctapp.fctapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iesvdc.acceso.fctapp.fctapp.models.User;
import com.iesvdc.acceso.fctapp.fctapp.repository.RepoUser;

@RestController
@RequestMapping("/fctapp")
public class ServiUser {
    @Autowired
    RepoUser repoUser;

    @GetMapping("user/{uid}")
    User getUserById(@PathVariable (value = "uid") String uid){
        return repoUser.findByUid(uid);
    }

    @PostMapping("user") 
    User create(@RequestBody User user){
        return repoUser.save(user);
    }

    @PutMapping("user/{uid}")
    User update(@PathVariable(value = "uid") String uid, @RequestBody User newUser) {
        User user = repoUser.findByUid(uid);
        if (user != null) {
            return repoUser.save(newUser);
        } else {
            return null;
        }
    }


    @DeleteMapping("user/{id}")
    void delete(@PathVariable(value = "id") Integer id){
        repoUser.deleteById(id);
    }
}
