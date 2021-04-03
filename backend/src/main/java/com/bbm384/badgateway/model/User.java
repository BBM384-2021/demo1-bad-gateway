package com.bbm384.badgateway.model;

import com.bbm384.badgateway.model.audit.DateAudit;
import com.bbm384.badgateway.model.constants.UserStatus;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "KULLANICI", uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "KULLANICI"
        })
})
public class User extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(max = 40)
    @Column(name = "AD")
    private String name;

    @NotBlank
    @Column(name = "KULLANICI")
    private String username;

    @Column(name = "TELEFON")
    private String phone;

    @Size(max = 40)
    @Email
    @Column(name = "EPOSTA")
    private String email;

    @NotBlank
    @Size(max = 100)
    @Column(name = "SIFRE")
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "KULLANICI_ROLLERI",
            joinColumns = @JoinColumn(name = "KULLANICI_ID"),
            inverseJoinColumns = @JoinColumn(name = "ROL_ID"))
    private Set<Role> roles = new HashSet<>();

    @NotNull
    @Column(name = "SIFRE_SIFIRLANSIN_MI")
    private boolean isPasswordReset;

    @Enumerated(EnumType.STRING)
    @Column(name = "DURUM")
    private UserStatus status;

    public User() {

    }

    public static String getUserDefaultPassword(){
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

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
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
}
