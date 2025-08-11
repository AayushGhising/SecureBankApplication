package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.model.Card;
import com.springsecurity.springsecurity.repo.CardRepository;
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

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/myCards")
    public List<Card> getCardDetails(@RequestParam int id) {
        List<Card> card = cardRepository.findByCustomerCustomerId(id);
        if (card != null ) {
            return card;
        }else {
            return null;
        }
    }

}
