package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.model.Account;
import com.springsecurity.springsecurity.model.Customer;
import com.springsecurity.springsecurity.repo.AccountRepository;
import com.springsecurity.springsecurity.repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/myAccount")
    public Account getAccountDetails(@RequestParam String email) {

        List<Customer> customers = customerRepository.findByEmail(email);

        if(customers != null && customers.size() > 0) {
            Account account = accountRepository.findByCustomerCustomerId(customers.get(0).getCustomerId());
            if (account != null) {
                return account;
            } else {
                return null;
            }
        }
        return null;
    }

}
