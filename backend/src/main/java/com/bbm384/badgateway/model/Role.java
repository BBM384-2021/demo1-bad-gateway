package com.bbm384.badgateway.model;

import com.bbm384.badgateway.model.constants.UserRole;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "ROLES")
public class Role {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "USER_ID")
  @NotNull
  private User user;

  @Enumerated(EnumType.STRING)
  @NaturalId
  @Column(length = 60)
  private UserRole userRole;

  public User getUser() {
    return user;
  }

  public Role() {

  }

  public Role(UserRole userRole) {
    this.userRole = userRole;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public void setUser(User user) {
    this.user = user;
  }

  public UserRole getUserRole() {
    return userRole;
  }

  public void setUserRole(UserRole userRole) {
    this.userRole = userRole;
  }
}
