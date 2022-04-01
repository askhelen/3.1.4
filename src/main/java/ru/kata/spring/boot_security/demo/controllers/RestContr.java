package ru.kata.spring.boot_security.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.service.UserServiceImpl;

import java.util.Collections;
import java.util.List;

@RestController
public class RestContr {

    @Autowired
    UserServiceImpl userService;

    @GetMapping("admin/getAll")
    public List<User> getList() {
        return userService.listUsers();
    }

    @PostMapping("/admin")
    public void addNewUser(@RequestBody User user) {
        userService.addUser(user);
    }

    @DeleteMapping("/admin/delete/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.removeUser(id);
    }

    @GetMapping("/admin/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUserById(id);
    }


    @PutMapping(value = "admin/edit")
    public ResponseEntity<String> updateUser(@RequestBody User user) {
        if (user.getRole() != null) {
            if (user.getRole().equals("ROLE_ADMIN")) {
                user.setRoles(Collections.singleton(new Role(1L, "ROLE_ADMIN")));
            } else {
                user.setRoles(Collections.singleton(new Role(2L, "ROLE_USER")));
            }
        }
        userService.addUser(user);
        return new ResponseEntity<String>("ok", HttpStatus.OK);
    }

    @GetMapping("index/user")
    public User viewUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (User) authentication.getPrincipal();
    }

}
