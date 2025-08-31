package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.model.AccountTransaction;
import com.springsecurity.springsecurity.model.Customer;
import com.springsecurity.springsecurity.repo.AccountTransactionRepository;
import com.springsecurity.springsecurity.repo.CustomerRepository;
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

    @Autowired
    private CustomerRepository customerRepository;

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/myBalance")
    public List<AccountTransaction> getBalanceDetails(@RequestParam String email) {
        List<Customer> customers = customerRepository.findByEmail(email);

        if (customers != null && customers.size() > 0) {

            List<AccountTransaction> accountTransaction = accountTransactionRepository.
                    findByCustomerCustomerIdOrderByTransactionDtDesc(customers.get(0).getCustomerId());
            if (accountTransaction != null) {
                return accountTransaction;
            } else {
                return null;
            }
        }
        return null;
    }
}
