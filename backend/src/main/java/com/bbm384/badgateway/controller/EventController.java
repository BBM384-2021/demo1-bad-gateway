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
    public PagedResponse<EventPayload> getEventsList(@RequestParam(value = "page",
                                                          defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                     @RequestParam(value = "name") Optional<String> name,
                                                     @RequestParam(value = "eventType") Optional<EventType> eventType,
                                                     @RequestParam(value = "beforeEventDate") Optional<Instant> beforeEventDate,
                                                     @RequestParam(value = "afterEventDate") Optional<Instant> afterEventDate) {

        return eventService.getEventsList(page, name, eventType, beforeEventDate, afterEventDate);
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
}
