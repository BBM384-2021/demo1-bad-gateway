package com.bbm384.badgateway.model;

import com.bbm384.badgateway.model.audit.CreatedAudit;
import com.bbm384.badgateway.model.constants.BannedMemberStatus;
import com.bbm384.badgateway.model.constants.ClubStatus;
import com.querydsl.core.annotations.QueryEntity;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.time.Period;
import java.util.Set;

@Entity
@QueryEntity
@Table(name = "SUBCLUB")
public class SubClub extends CreatedAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    @Size(max = 255)
    @NotNull
    private String name;

    @ManyToOne(fetch = FetchType.EAGER,cascade=CascadeType.MERGE)
    @JoinColumn(name = "PARENT_CLUB")
    @NotNull
    private Club parentClub;

    @Column(name = "DESCRIPTION")
    @Size(max = 255)
    private String description;

    @ManyToOne(fetch = FetchType.EAGER,cascade=CascadeType.MERGE)
    @JoinColumn(name = "CATEGORY")
    private Category category;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "MEMBERS")
    private Set<User> members;

    @ManyToOne(fetch = FetchType.EAGER ,cascade=CascadeType.MERGE)
    @JoinColumn(name = "ADMIN")
    private User admin;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private ClubStatus status = ClubStatus.ACTIVE;

    private Instant activity;

    private String photoFileName;

    private String photoFileExtension;

    private String photoFilePath;

    public boolean checkActivity(){
        if(this.activity != null){
            Instant expiryDate = this.activity.plus(Period.ofDays(90));
            if( Instant.now().compareTo(expiryDate) > 0 && this.status == ClubStatus.ACTIVE){
                this.setStatus(ClubStatus.PASSIVE);
                return true;
            }
        }

        return false;
    }

    public SubClub(String name, Club parentClub, String description, Category category, Set<User> members) {
        this.name = name;
        this.parentClub = parentClub;
        this.description = description;
        this.category = category;
        this.members = members;
    }

    public SubClub(){

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

    public ClubStatus getStatus() {
        return status;
    }

    public void setStatus(ClubStatus status) {
        this.status = status;
    }

    public Instant getActivity() {
        return activity;
    }

    public void setActivity(Instant activity) {
        this.activity = activity;
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
