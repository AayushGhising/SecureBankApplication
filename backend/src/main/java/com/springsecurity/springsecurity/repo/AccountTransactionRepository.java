package com.springsecurity.springsecurity.repo;

import com.springsecurity.springsecurity.model.AccountTransaction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountTransactionRepository extends CrudRepository<AccountTransaction, Long> {

    List<AccountTransaction> findByCustomerCustomerIdOrderByTransactionDtDesc(int customerId);

}
