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
            @RequestParam(value = "id") long id,
            @RequestParam(value = "sentAt") Optional<Instant> date
    ){
        System.out.println(id);
        System.out.println(date);
        return messageService.getMessageList(currentUser, id, date);
    }

    @GetMapping("/listNew")
    public List<SubClubChatList> getNewMessages(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(value = "id", defaultValue = "0") long id,
            @RequestParam(value = "sentAt") Instant date
    ){
        return messageService.getNewMessages(currentUser, id, date);
    }

    @PostMapping("/send")
    public ApiResponse sendNewMessage(@CurrentUser UserPrincipal currentUser,
                                      @RequestParam(value = "id") long id,
                                      @RequestBody SendMessageRequest sendMessageRequest) {
        return messageService.sendNewMessage(currentUser, id, sendMessageRequest);
    }


}