package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.model.AccountTransaction;
import com.springsecurity.springsecurity.repo.AccountTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BalanceController {

    @Autowired
    private AccountTransactionRepository accountTransactionRepository;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/myBalance")
    public List<AccountTransaction> getBalanceDetails(@RequestParam int id) {
        List<AccountTransaction> accountTransaction = accountTransactionRepository.
                findByCustomerCustomerIdOrderByTransactionDtDesc(id);
        if (accountTransaction != null ) {
            return accountTransaction;
        }else {
            return null;
        }
    }
}
