package com.springsecurity.springsecurity.repo;

import com.springsecurity.springsecurity.model.NoticeDetail;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends CrudRepository<NoticeDetail, Long> {

    @Query(value = "from NoticeDetail n where CURRENT_DATE BETWEEN n.noticBegDt AND n.noticEndDt")
    List<NoticeDetail> findAllActiveNotices();

}