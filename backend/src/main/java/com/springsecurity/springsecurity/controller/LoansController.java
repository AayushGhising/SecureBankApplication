package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.model.Customer;
import com.springsecurity.springsecurity.model.Loan;
import com.springsecurity.springsecurity.repo.CustomerRepository;
import com.springsecurity.springsecurity.repo.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LoansController {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/myLoans")
    public List<Loan> getLoanDetails(@RequestParam String email) {
        List<Customer> customers=customerRepository.findByEmail(email);

        if (customers!= null && customers.size() > 0) {
            List<Loan> loan = loanRepository.findByCustomerCustomerIdOrderByStartDtDesc(customers.get(0).getCustomerId());
            if (loan != null ) {
                return loan;
            }else {
                return null;
            }
        }
        return null;
    }

}
