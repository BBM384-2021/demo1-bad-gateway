package com.bbm384.badgateway.payload;


import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.model.audit.CreatedAudit;

import java.util.Set;

public class SubClubPayload extends CreatedAudit {
    private Long id;
    private String name;
    private Club parentClub;
    private String description;
    private Category category;
    private Set<User> members;
    private User admin;

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

    public Club getParentClub() {
        return parentClub;
    }

    public void setParentClub(Club parentClub) {
        this.parentClub = parentClub;
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

    public User getAdmin() {
        return admin;
    }

    public void setAdmin(User admin) {
        this.admin = admin;
    }
}
