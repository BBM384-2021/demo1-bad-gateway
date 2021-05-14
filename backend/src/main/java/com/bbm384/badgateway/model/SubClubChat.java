package com.bbm384.badgateway.model;

import com.querydsl.core.annotations.QueryEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.Instant;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@QueryEntity
@Table(name = "SUB_CLUB_CHAT")
public class SubClubChat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @NotNull
    private SubClub subClub;

    @ManyToOne
    @NotNull
    private User sender;

    @Size(max = 40)
    private String senderName;

    @NotNull @NotBlank
    @Size(max = 512)
    private String message;

    @CreatedDate
    @NotNull
    private Instant sentAt;

    @LastModifiedDate
    private Instant readAt;
}
