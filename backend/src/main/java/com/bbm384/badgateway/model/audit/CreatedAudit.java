package com.bbm384.badgateway.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.time.Instant;

@MappedSuperclass
@JsonIgnoreProperties(
        value = {"createdBy", "createdAt"},
        allowGetters = true
)
public abstract class CreatedAudit {

    @CreatedDate
    @Column(name="CREATED_AT")
    private Instant createdAt;

    @CreatedBy
    @Column(name="CREATED_BY")
    private Long createdBy;

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long createdBy) {
        this.createdBy = createdBy;
    }

}

