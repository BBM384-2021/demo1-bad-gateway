package com.bbm384.badgateway.model.audit;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.time.Instant;

@MappedSuperclass
@JsonIgnoreProperties(
        value = {"updatedBy", "updatedAt"},
        allowGetters = true
)
public abstract class UpdatedAudit {

    @CreatedDate
    @Column(name = "UPDATED_AT")
    private Instant updatedAt;

    @CreatedBy
    @Column(name = "UPDATED_BY")
    private Long updatedBy;

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
    }
}