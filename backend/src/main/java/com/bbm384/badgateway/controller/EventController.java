package com.bbm384.badgateway.controller;


import com.bbm384.badgateway.model.constants.EventType;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.EventInfoResponse;
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
    public PagedResponse<EventInfoResponse> getEventsList(@RequestParam(value = "page",
                                                          defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                                          @RequestParam(value = "name") Optional<String> name,
                                                          @RequestParam(value = "eventType") Optional<EventType> eventType,
                                                          @RequestParam(value = "beforeEventDate") Optional<Instant> beforeEventDate,
                                                          @RequestParam(value = "afterEventDate") Optional<Instant> afterEventDate) {

        return eventService.getEventsList(page, name, eventType, beforeEventDate, afterEventDate);
    }

    @PostMapping("/create")
    public ApiResponse createEvent(@CurrentUser UserPrincipal currentUser, @RequestBody EventInfoResponse eventInfoResponse){
        return eventService.createEvent(currentUser, eventInfoResponse);
    }


}
