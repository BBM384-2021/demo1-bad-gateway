package com.bbm384.badgateway.controller;


import com.bbm384.badgateway.model.Category;
import com.bbm384.badgateway.payload.ClubInfoResponse;
import com.bbm384.badgateway.payload.ClubPayload;
import com.bbm384.badgateway.payload.PagedResponse;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.ClubService;
import com.bbm384.badgateway.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("${app.api_path}/club")
public class ClubController {
    @Autowired
    private ClubService clubService;

    @GetMapping("/info")
    public ClubInfoResponse getClubInfoById(@RequestParam(value = "id") long id){
        return clubService.getClubInfoById(id);
    }

    @GetMapping("/info_2")
    public ClubInfoResponse getClubInfoByName(@RequestParam(value = "name") String name){
        return clubService.getClubInfoByName(name);
    }

    @GetMapping("/list")
    public PagedResponse<ClubInfoResponse> listClubs(@RequestParam(value = "page",
                                        defaultValue = AppConstants.DEFAULT_PAGE_NUMBER) int page,
                                         @RequestParam(value = "leaveReason") Optional<String> name,
                                         @RequestParam(value = "transferStatus") Optional<Category> category){
        return clubService.getClubList(page, name, category);
    }

    @PostMapping("/create")
    public ClubInfoResponse createClub(@CurrentUser UserPrincipal currentUser, @RequestBody ClubPayload clubPayload){
        return clubService.createClub(currentUser, clubPayload);
    }

    @PutMapping("/update")
    public ClubInfoResponse updateClub(@CurrentUser UserPrincipal currentUser, @RequestBody ClubPayload clubPayload){
        return clubService.updateClub(currentUser, clubPayload);
    }

    @GetMapping("/delete")
    public ClubInfoResponse deleteClub(@CurrentUser UserPrincipal currentUser, @RequestParam(value = "id") Long id){
        return clubService.deleteClub(currentUser, id);
    }

}