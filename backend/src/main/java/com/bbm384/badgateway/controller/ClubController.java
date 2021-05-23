package com.bbm384.badgateway.controller;
import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.ClubService;
import com.bbm384.badgateway.util.AppConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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
                                         @RequestParam(value = "name") Optional<String> name,
                                         @RequestParam(value = "category") Optional<String> category){
        return clubService.getClubList(page, name, category);
    }

    @PostMapping("/create")
    @ResponseBody
    public ClubInfoResponse createClub(@CurrentUser UserPrincipal currentUser,
                                       @RequestBody ClubPayload clubPayload){
        return clubService.createClub(currentUser, clubPayload);
    }

    @PostMapping("/photo")
    @ResponseBody
    public FileUploadResponse uploadPhoto(@CurrentUser UserPrincipal currentUser,
                                          @RequestParam(value = "photo", required = false)  Optional<MultipartFile> photo,
                                          @RequestParam(value = "name") String name){
        return clubService.uploadPhoto(currentUser, photo, name);
    }

    @PutMapping("/update")
    public ClubInfoResponse updateClub(@CurrentUser UserPrincipal currentUser, @RequestBody ClubPayload clubPayload){
        return clubService.updateClub(currentUser, clubPayload);
    }

    @GetMapping("/delete")
    public ClubInfoResponse deleteClub(@CurrentUser UserPrincipal currentUser, @RequestParam(value = "id") Long id){
        return clubService.deleteClub(currentUser, id);
    }


    @GetMapping("/enrolled")
    public List<ClubInfoResponse> getEnrolledClubs(@CurrentUser UserPrincipal currentUser){
        return clubService.getEnrolledClubs(currentUser);
    }


    @GetMapping("/subClub/list")
    public List<SubClubPayload> getSubClubList(@RequestParam(value = "clubId") long clubId){
        return clubService.getAllSubClubs(clubId);
    }


    @GetMapping("/all")
    public List<ClubInfoResponse> getAllClubs(){
        return clubService.getAllClubs();
    }

    @GetMapping("/all_name")
    public List<String> getAllClubNames(){
        return clubService.getAllClubNames();
    }

}
