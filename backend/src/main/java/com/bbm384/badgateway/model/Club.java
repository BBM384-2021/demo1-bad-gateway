package com.bbm384.badgateway.model;


import com.bbm384.badgateway.model.audit.UpdatedAudit;
import com.bbm384.badgateway.model.constants.ClubStatus;
import com.querydsl.core.annotations.QueryEntity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@QueryEntity
@Entity
@Table(name = "CLUBS", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "NAME"
        })
})
public class Club extends UpdatedAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 255)
    @Column(name = "NAME")
    private String name;

    @Size(max = 512)
    @Column(name = "DESCRIPTION")
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CATEGORY_ID")
    @NotNull
    private Category category;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "MEMBERS")
    private Set<User> members;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private ClubStatus status = ClubStatus.ACTIVE;

    public Club() {
    }

    public Club(@NotNull @Size(max = 255) String name, @NotNull Category category) {
        this.name = name;
        this.category = category;
    }

    public Club(Long id) {
        super();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Set<User> getMembers() {
        return members;
    }

    public void setMembers(Set<User> members) {
        this.members = members;
    }

    public ClubStatus getStatus() {
        return status;
    }

    public void setStatus(ClubStatus status) {
        this.status = status;
    }


}
