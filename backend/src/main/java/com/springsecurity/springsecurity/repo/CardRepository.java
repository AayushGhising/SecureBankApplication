package com.springsecurity.springsecurity.repo;

import com.springsecurity.springsecurity.model.Card;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CardRepository extends CrudRepository<Card, Long> {

    List<Card> findByCustomerCustomerId(int customerId);

}
