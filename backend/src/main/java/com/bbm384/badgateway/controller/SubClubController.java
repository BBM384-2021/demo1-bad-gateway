package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.payload.PagedResponse;
import com.bbm384.badgateway.payload.SubClubPayload;
import com.bbm384.badgateway.repository.*;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.service.SubClubService;
import com.bbm384.badgateway.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.Optional;

@RestController
@RequestMapping("${app.api_path}/subClub")
public class SubClubController {
    @Autowired
    private SubClubService subClubService;

    @GetMapping("/info")
    public SubClubPayload getSubClubInfo(@RequestParam(value = "id") long id) {
        return subClubService.getSubClubInfo(id);
    }

    @GetMapping("/list")
    public PagedResponse<SubClubPayload> getSubClubList(
            @RequestParam(value = "page", defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
            @RequestParam(value = "name") Optional<String> name,
            @RequestParam(value = "parentClub") Optional<Long> parentClub,
            @RequestParam(value = "category") Optional<Long> category
    ) {
        return subClubService.getSubClubList(page, name, parentClub, category);
    }

    @PostMapping("/create")
    public SubClubPayload createSubClub(@RequestBody SubClubPayload subClubPayload){
        return subClubService.createSubClub(subClubPayload);
    }

    @PutMapping("/update")
    public SubClubPayload updateClub(@RequestBody SubClubPayload subClubPayload){
        return subClubService.updateSubClub(subClubPayload);
    }
}
