package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.SendMessageRequest;
import com.bbm384.badgateway.payload.SubClubChatList;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.SubClubChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("${app.api_path}/sub_club_chat")
public class SubClubChatController {

    @Autowired
    private SubClubChatService messageService;

    @GetMapping("/list")
    public List<SubClubChatList> getMessages(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(value = "subClubId") long subClubId,
            @RequestParam(value = "before") Optional<Instant> before,
            @RequestParam(value = "after") Optional<Instant> after
    ){
        return messageService.getMessageList(currentUser, subClubId, before, after);
    }

    @PostMapping("/send")
    public ApiResponse sendNewMessage(@CurrentUser UserPrincipal currentUser,
                                      @RequestParam(value = "subClubId") long subClubId,
                                      @RequestBody SendMessageRequest sendMessageRequest) {
        return messageService.sendNewMessage(currentUser, subClubId, sendMessageRequest);
    }
}