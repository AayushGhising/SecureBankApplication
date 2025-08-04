package com.springsecurity.springsecurity.repo;

import com.springsecurity.springsecurity.model.ContactMessage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends CrudRepository<ContactMessage, Long> {


}
