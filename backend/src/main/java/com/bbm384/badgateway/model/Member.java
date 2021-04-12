package com.bbm384.badgateway.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;


@Entity
@Table(name = "MEMBERS")
public class Member extends User{

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "CLUBS")
    @NotNull
    private Set<Club> clubs;

}
