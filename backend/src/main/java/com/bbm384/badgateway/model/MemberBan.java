package com.bbm384.badgateway.model;

import com.bbm384.badgateway.model.audit.CreatedAudit;
import com.bbm384.badgateway.model.constants.BannedMemberStatus;
import com.bbm384.badgateway.model.constants.UserType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.querydsl.core.annotations.QueryEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.*;
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
        if(this.member.getUserType() == UserType.SUB_CLUB_ADMIN){
            this.member.setUserType(UserType.MEMBER);
        }

        this.totalBanCounter += 1;
        if(this.totalBanCounter <= 3){
            this.status = BannedMemberStatus.BANNED;
        }else{
            this.status = BannedMemberStatus.DISMISSED;
        }
    }

    public boolean checkActivateMember(){
        Instant expiryDate = this.bannedDate.plus(Period.ofDays(3));
        if( Instant.now().compareTo(expiryDate) > 0 && this.status == BannedMemberStatus.DISMISSED){
            this.setStatus(BannedMemberStatus.ACTIVE);
            return true;
        }
        return false;
    }
}
