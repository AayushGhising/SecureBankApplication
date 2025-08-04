package com.springsecurity.springsecurity.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "notice_details")
public class NoticeDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer noticeId;

    @Column(name = "notice_summary")
    private String noticeSummary;

    @Column(name = "notice_details")
    private String noticeDetails;

    @CreationTimestamp
    @Column(name = "notic_beg_dt")
    private LocalDateTime noticBegDt;

    @Column(name = "notic_end_dt")
    private LocalDateTime noticEndDt;

    @CreationTimestamp
    @Column(name = "create_dt")
    private LocalDateTime createDt;

    @Column(name = "update_dt")
    private LocalDateTime updateDt;

    public Integer getNoticeId() {
        return noticeId;
    }

    public void setNoticeId(Integer noticeId) {
        this.noticeId = noticeId;
    }

    public String getNoticeSummary() {
        return noticeSummary;
    }

    public void setNoticeSummary(String noticeSummary) {
        this.noticeSummary = noticeSummary;
    }

    public String getNoticeDetails() {
        return noticeDetails;
    }

    public void setNoticeDetails(String noticeDetails) {
        this.noticeDetails = noticeDetails;
    }

    public LocalDateTime getNoticBegDt() {
        return noticBegDt;
    }

    public void setNoticBegDt(LocalDateTime noticBegDt) {
        this.noticBegDt = noticBegDt;
    }

    public LocalDateTime getNoticEndDt() {
        return noticEndDt;
    }

    public void setNoticEndDt(LocalDateTime noticEndDt) {
        this.noticEndDt = noticEndDt;
    }

    public LocalDateTime getCreateDt() {
        return createDt;
    }

    public void setCreateDt(LocalDateTime createDt) {
        this.createDt = createDt;
    }

    public LocalDateTime getUpdateDt() {
        return updateDt;
    }

    public void setUpdateDt(LocalDateTime updateDt) {
        this.updateDt = updateDt;
    }
}
