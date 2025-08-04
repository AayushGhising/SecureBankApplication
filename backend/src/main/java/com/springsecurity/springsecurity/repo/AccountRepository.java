package com.springsecurity.springsecurity.repo;
import com.springsecurity.springsecurity.model.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface AccountRepository extends CrudRepository<Account, Long> {

    Account findByCustomerCustomerId(int customerId);

}
