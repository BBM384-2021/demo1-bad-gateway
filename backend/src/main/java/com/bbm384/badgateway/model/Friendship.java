package com.bbm384.badgateway.model;


import com.bbm384.badgateway.model.constants.FriendshipStatus;

import javax.persistence.*;

@Entity
@Table(name = "FRIENDSHIP")
public class Friendship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Member requester;

    @ManyToOne
    private Member addressee;

    @Column
    @Enumerated(EnumType.STRING)
    private FriendshipStatus friendshipStatus;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Member getRequester() {
        return requester;
    }

    public void setRequester(Member requester) {
        this.requester = requester;
    }

    public Member getAddressee() {
        return addressee;
    }

    public void setAddressee(Member addressee) {
        this.addressee = addressee;
    }

    public FriendshipStatus getFriendshipStatus() {
        return friendshipStatus;
    }

    public void setFriendshipStatus(FriendshipStatus friendshipStatus) {
        this.friendshipStatus = friendshipStatus;
    }
}
