package com.bbm384.badgateway.payload;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClubRequestPayload {
    private Long id;
    private String clubName;
    private List<String> user;
    private int requestCount;

}
