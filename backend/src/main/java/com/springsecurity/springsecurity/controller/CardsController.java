package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.model.Card;
import com.springsecurity.springsecurity.model.Customer;
import com.springsecurity.springsecurity.repo.CardRepository;
import com.springsecurity.springsecurity.repo.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CardsController {

    @Autowired
    private CardRepository cardRepository;

    @Autowired
    private CustomerRepository customerRepository;
    @PreAuthorize("hasRole('USER')")
    @GetMapping("/myCards")
    public List<Card> getCardDetails(@RequestParam String email) {
        List<Customer> customers = customerRepository.findByEmail(email);

        if (customers.isEmpty()) {
            List<Card> card = cardRepository.findByCustomerCustomerId(customers.get(0).getCustomerId());
            if (card != null) {
                return card;
            } else {
                return null;
            }
        }
        return null;
    }

}
