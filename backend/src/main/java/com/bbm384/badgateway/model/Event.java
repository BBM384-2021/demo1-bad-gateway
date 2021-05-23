package com.bbm384.badgateway.model;

import com.bbm384.badgateway.model.audit.UpdatedAudit;
import com.bbm384.badgateway.model.constants.EventType;
import com.querydsl.core.annotations.QueryEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@QueryEntity
@Table(name = "EVENT")
public class Event extends UpdatedAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "NAME")
    @NotNull
    @Size(max = 150)
    private String name;

    @Column(name = "ADDRESS")
    @NotNull
    @Size(max = 250)
    private String address;

    @Column(name = "EVENT_TYPE")
    @NotNull
    @Enumerated(EnumType.STRING)
    private EventType eventType;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "ATTENDEES")
    private Set<User> attendees;

    @ManyToOne(fetch = FetchType.EAGER,cascade=CascadeType.ALL)
    @JoinColumn(name = "CLUB_ID")
    private Club club;

    @ManyToOne(fetch = FetchType.EAGER,cascade=CascadeType.ALL)
    @JoinColumn(name = "SUB_CLUB_ID")
    private SubClub subClub;

    @NotNull
    private Instant eventDate;
}
