package com.bbm384.badgateway.model;

import com.querydsl.core.annotations.QueryEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@QueryEntity
@Table(name = "CLUB_REQUEST")
public class ClubRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "CLUB_NAME")
    @NotNull
    private String clubName;

    @Column(name = "USERS")
    @ElementCollection
    private List<String> user;

    @Column(name = "REQUEST_COUNT")
    private int requestCount;

}
