package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.ClubRequestPayload;
import com.bbm384.badgateway.payload.PagedResponse;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.ClubRequestService;
import com.bbm384.badgateway.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${app.api_path}/club_request")
public class ClubRequestController {
    @Autowired
    ClubRequestService clubRequestService;

    @GetMapping("/info")
    public ClubRequestPayload getClubRequest(@RequestParam(value = "id") long id){
        return clubRequestService.getClubRequest(id);
    }

    @GetMapping("/list")
    public PagedResponse<ClubRequestPayload> getAllClubRequest(@RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page){
        return clubRequestService.getAllClubRequest(page);
    }

    @PostMapping("/create")
    public ApiResponse createClubRequest(@CurrentUser UserPrincipal currentUser, @RequestBody ClubRequestPayload clubRequestPayload){
        return clubRequestService.createClubRequest(currentUser, clubRequestPayload);
    }
}
