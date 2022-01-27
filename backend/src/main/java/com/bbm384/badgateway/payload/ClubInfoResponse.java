package com.bbm384.badgateway.payload;

import com.bbm384.badgateway.model.Category;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.model.audit.UpdatedAudit;
import com.bbm384.badgateway.model.constants.ClubStatus;

import java.util.Set;

public class ClubInfoResponse extends UpdatedAudit {
    private Long id;
    private String name;
    private String description;
    private Category category;
    private Set<User> members;
    private ClubStatus status;
    private String photoFileName;
    private String photoFileExtension;
    private String photoFilePath;


    public ClubInfoResponse(String name, String description, Category category, Set<User> members, ClubStatus status,
                            String photoFileName, String photoFileExtension, String photoFilePath) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.members = members;
        this.status = status;
        this.photoFileName = photoFileName;
        this.photoFileExtension = photoFileExtension;
        this.photoFilePath = photoFilePath;
    }

    public ClubInfoResponse() {
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
