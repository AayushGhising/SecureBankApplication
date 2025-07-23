package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.model.Customer;
import com.springsecurity.springsecurity.repo.CustomerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RegisterController {
    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Customer customer) {
        // Save the new user
        if (customerRepo.findByEmail(customer.getEmail()).isEmpty()) {
            String hashedPassword = passwordEncoder.encode(customer.getPassword());
            customer.setPassword(hashedPassword);
            customerRepo.save(customer);
            return ResponseEntity.ok("User registered successfully.");

        }
        return ResponseEntity.badRequest().body("User with this email already exists.");
    }
}
