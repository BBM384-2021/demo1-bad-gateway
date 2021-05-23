package com.bbm384.badgateway.controller;


import com.bbm384.badgateway.model.constants.EventType;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.EventPayload;
import com.bbm384.badgateway.payload.PagedResponse;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.EventService;
import com.bbm384.badgateway.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Optional;

@RestController
@RequestMapping("${app.api_path}/event")
public class EventController {

    @Autowired
    EventService eventService;

    @GetMapping("/list")
    public PagedResponse<EventPayload> getEventsList(@CurrentUser UserPrincipal currentUser,
                                                     @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                     @RequestParam(value = "name") Optional<String> name,
                                                     @RequestParam(value = "eventType") Optional<EventType> eventType,
                                                     @RequestParam(value = "beforeEventDate") Optional<Instant> beforeEventDate,
                                                     @RequestParam(value = "afterEventDate") Optional<Instant> afterEventDate,
                                                     @RequestParam(value = "clubId") Optional<Long> clubId,
                                                     @RequestParam(value = "subClubId") Optional<Long> subClubId){


        return eventService.getEventsList(currentUser, page, name, eventType, beforeEventDate, afterEventDate, clubId, subClubId);
    }

    @GetMapping("/info")
    public EventPayload getEvent(@RequestParam(value = "id") long id){
        return eventService.getEvent(id);
    }

    @PostMapping("/create")
    public ApiResponse createEvent(@CurrentUser UserPrincipal currentUser, @RequestBody EventPayload eventPayload){
        return eventService.createEvent(currentUser, eventPayload);
    }

    @PutMapping("/update")
    public EventPayload updateEvent(@CurrentUser UserPrincipal currentUser, @RequestBody EventPayload eventPayload){
        return eventService.updateEvent(currentUser, eventPayload);
    }

    @DeleteMapping("/delete")
    public ApiResponse deleteEvent(@RequestParam(value = "id") long id){
        return eventService.deleteEvent(id);
    }

    @GetMapping("/attend")
    public EventPayload attendEvent(@CurrentUser UserPrincipal currentUser, @RequestParam(value = "eventId") long eventId) {
        return eventService.attendEvent(currentUser, eventId);
    }

    @GetMapping("/delete_attendee")
    public EventPayload deleteAttendee(@CurrentUser UserPrincipal currentUser, @RequestParam(value = "eventId") long eventId) {
        return eventService.deleteAttendee(currentUser, eventId);
    }
}
