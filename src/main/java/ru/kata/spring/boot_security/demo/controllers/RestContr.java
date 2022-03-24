package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.List;

@RestController
public class RestContr {
    @Autowired
    UserServiceImpl userService;

    @GetMapping("admin/getAll")
    public List<User> getList() {
        return userService.listUsers();
    }

}
