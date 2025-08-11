package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.model.Account;
import com.springsecurity.springsecurity.repo.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/myAccount")
    public Account getAccountDetails(@RequestParam int id) {
        Account account = accountRepository.findByCustomerCustomerId(id);
        if (account != null ) {
            return account;
        }else {
            return null;
        }
    }

}
