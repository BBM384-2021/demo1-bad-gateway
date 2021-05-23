package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.*;
import com.bbm384.badgateway.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${app.api_path}/sub_club")
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
    public SubClubPayload createSubClub(@CurrentUser UserPrincipal currentUser, @RequestBody SubClubPayload subClubPayload){
        return subClubService.createSubClub(currentUser, subClubPayload);
    }

    @PutMapping("/update")
    public SubClubPayload updateClub(@RequestBody SubClubPayload subClubPayload){
        return subClubService.updateSubClub(subClubPayload);
    }

    @GetMapping("/enrolled")
    public List<SubClubPayload> getEnrolledSubClubs(@CurrentUser UserPrincipal currentUser,
                                                    @RequestParam(value = "clubId") long clubId){
        return subClubService.getEnrolledSubClubs(currentUser, clubId);
    }

    @GetMapping("/delete")
    public SubClubPayload deleteSubClub(@CurrentUser UserPrincipal currentUser, @RequestParam(value = "id") Long id){
        return subClubService.deleteSubClub(currentUser, id);
    }

    @GetMapping("/all")
    public List<String> getAllSubClubs(){
        return subClubService.getAllSubClubs();
    }

}
