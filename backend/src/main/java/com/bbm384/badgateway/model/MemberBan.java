package com.bbm384.badgateway.model;

import com.bbm384.badgateway.model.audit.CreatedAudit;
import com.bbm384.badgateway.model.constants.BannedMemberStatus;
import com.querydsl.core.annotations.QueryEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.Duration;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@QueryEntity
@Table(name = "MEMBER_BAN")
public class MemberBan extends CreatedAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User member;

    @ManyToOne
    @NotNull
    private SubClub subClub;

    private int slangCounter = 0;

    private Instant bannedDate;

    private int totalBanCounter = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS")
    private BannedMemberStatus status = BannedMemberStatus.ACTIVE;

    public void updateStatus(){
        this.setBannedDate(Instant.now());
        this.totalBanCounter += 1;
        if(this.totalBanCounter <= 3){
            this.status = BannedMemberStatus.BANNED;
/*
            ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Europe/Istanbul"));
            ZonedDateTime nextRun = now.withHour(0).withMinute(0).withSecond(30);
            if(now.compareTo(nextRun) > 0)
                nextRun = nextRun.plusDays(1);

            Duration duration = Duration.between(now, nextRun);
            long initalDelay = duration.getSeconds();

            ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);
            scheduler.scheduleAtFixedRate(this.activateMember(),
                    initalDelay,
                    TimeUnit.DAYS.toSeconds(1),
                    TimeUnit.SECONDS);*/

        }else{
            this.status = BannedMemberStatus.DISMISSED;
        }
    }

    public Runnable activateMember(){
        System.out.println("------------------------IM HERE -----------------------------");
        this.setStatus(BannedMemberStatus.ACTIVE);
        return null;
    }
}
