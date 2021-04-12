package com.bbm384.badgateway.model;

import com.bbm384.badgateway.model.audit.DateAudit;
import com.bbm384.badgateway.model.constants.UserStatus;
import com.bbm384.badgateway.model.constants.UserType;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "USER", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "USERNAME",
                "EMAIL"
        })
})
public class User extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 40)
    private String name;

    @NotBlank
    @Column(name = "USERNAME")
    private String username;

    @Column(name = "PHONE")
    @Size(min = 10, max = 10)
    private String phone;

    @Size(max = 40)
    @Email
    @Column(name = "EMAIL")
    private String email;

    @NotBlank
    @Size(max = 100)
    private String password;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
    private List<Role> userRoles;

    @Column(name = "USER_TYPE")
    @Enumerated(EnumType.STRING)
    private UserType userType;

    @NotNull
    @Column(name = "IS_PASSWORD_RESET")
    private boolean isPasswordReset;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private UserStatus status;


    public User() {

    }

    public static String getUserDefaultPassword() {
        return ".";
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
        name = name.replace('i', 'İ');
        name = name.toUpperCase();
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public boolean isPasswordReset() {
        return isPasswordReset;
    }

    public void setPasswordReset(boolean passwordReset) {
        isPasswordReset = passwordReset;
    }

    public UserStatus getStatus() {
        return status;
    }

    public void setStatus(UserStatus status) {
        this.status = status;
    }

    public List<Role> getUserRoles() { return userRoles; }

    public void setUserRoles(List<Role> userRoles) { this.userRoles = userRoles; }

    public UserType getUserType() { return userType; }

    public void setUserType(UserType userType) { this.userType = userType; }
}
