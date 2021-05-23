package com.bbm384.badgateway.payload;


import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.model.audit.CreatedAudit;

import java.util.Set;

public class SubClubPayload extends CreatedAudit {
    private Long id;
    private String name;
    private String parentClub;
    private String description;
    private String category;
    private Set<User> members;
    private String admin;
    private String photoFileName;
    private String photoFileExtension;
    private String photoFilePath;

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

    public String getParentClub() {
        return parentClub;
    }

    public void setParentClub(String parentClub) {
        this.parentClub = parentClub;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public Set<User> getMembers() {
        return members;
    }

    public void setMembers(Set<User> members) {
        this.members = members;
    }

    public String getAdmin() {
        return admin;
    }

    public void setAdmin(String admin) {
        this.admin = admin;
    }

    public String getPhotoFileName() {
        return photoFileName;
    }

    public void setPhotoFileName(String photoFileName) {
        this.photoFileName = photoFileName;
    }

    public String getPhotoFileExtension() {
        return photoFileExtension;
    }

    public void setPhotoFileExtension(String photoFileExtension) {
        this.photoFileExtension = photoFileExtension;
    }

    public String getPhotoFilePath() {
        return photoFilePath;
    }

    public void setPhotoFilePath(String photoFilePath) {
        this.photoFilePath = photoFilePath;
    }
}
