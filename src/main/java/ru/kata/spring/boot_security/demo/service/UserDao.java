package ru.kata.spring.boot_security.demo.service;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.kata.spring.boot_security.demo.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@Transactional
public class UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    public User findByUsername(String email){
        return (User) entityManager.createQuery("FROM User where email = '" + email + "'").getSingleResult();
    }

}
