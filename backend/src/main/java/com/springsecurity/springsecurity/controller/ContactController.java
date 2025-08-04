package com.springsecurity.springsecurity.controller;

import com.springsecurity.springsecurity.model.ContactMessage;
import com.springsecurity.springsecurity.repo.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Random;

@RestController
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @PostMapping("/contacts")
    public ContactMessage saveContactInquiryDetails(@RequestBody ContactMessage contactMessage) {
        contactMessage.setContactId(getServiceReqNumber());
//        contactMessage.setCreateDt(new Date(System.currentTimeMillis()));
        return contactRepository.save(contactMessage);
    }

    public String getServiceReqNumber() {
        Random random = new Random();
        int ranNum = random.nextInt(999999999 - 9999) + 9999;
        return "SR"+ranNum;
    }
}
