package com.bbm384.badgateway.payload;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchResponse {

    private List<SubClubPayload> subClubs;
    private List<ClubInfoResponse> clubs;

}
