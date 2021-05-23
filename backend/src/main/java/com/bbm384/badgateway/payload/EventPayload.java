package com.bbm384.badgateway.payload;

import com.bbm384.badgateway.model.Club;
import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.model.audit.UpdatedAudit;
import com.bbm384.badgateway.model.constants.EventType;
import lombok.*;

import java.time.Instant;
import java.util.Set;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EventPayload extends UpdatedAudit {

    private Long id;
    private String name;
    private String address;
    private EventType eventType;
    private Set<User> attendees;
    private Instant eventDate;
    private Club club;
    private SubClub subClub;

}
