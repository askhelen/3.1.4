package ru.kata.spring.boot_security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;
import ru.kata.spring.boot_security.demo.repository.UserRepository;

import java.util.*;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;


    public void addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        if ("ROLE_ADMIN".equals(user.getRole())) {
            user.setRoles(new HashSet<>(Set.of(new Role(1L, "ROLE_ADMIN"),
                                                new Role(2L, "ROLE_USER"))));
        } else {
            user.setRoles(Collections.singleton(new Role(2L, "ROLE_USER")));
        }
        userRepository.save(user);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }

    public void removeUser(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            userRepository.deleteById(id);
        }
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).get();
    }

    public List<User> listUsers() {
        return userRepository.findAll();
    }

}
