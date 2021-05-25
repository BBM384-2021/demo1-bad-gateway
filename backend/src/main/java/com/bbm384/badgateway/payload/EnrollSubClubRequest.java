package com.bbm384.badgateway.payload;

public class EnrollSubClubRequest {
    private Long subClubId;

    public EnrollSubClubRequest(Long subClubId) {
        this.subClubId = subClubId;
    }

    public EnrollSubClubRequest() {
    }

    public Long getSubClubId() {
        return subClubId;
    }

    public void setSubClubId(Long subClubId) {
        this.subClubId = subClubId;
    }
}
