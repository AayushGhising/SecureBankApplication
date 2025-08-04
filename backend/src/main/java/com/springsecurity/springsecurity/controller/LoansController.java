package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.model.Loan;
import com.springsecurity.springsecurity.repo.LoanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class LoansController {

    @Autowired
    private LoanRepository loanRepository;

    @GetMapping("/myLoans")
    public List<Loan> getLoanDetails(@RequestParam int id) {
        List<Loan> loan = loanRepository.findByCustomerCustomerIdOrderByStartDtDesc(id);
        if (loan != null ) {
            return loan;
        }else {
            return null;
        }
    }

}
