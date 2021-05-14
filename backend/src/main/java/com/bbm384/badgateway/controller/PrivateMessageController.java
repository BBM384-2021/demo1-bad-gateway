package com.bbm384.badgateway.controller;

import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.PrivateMessageList;
import com.bbm384.badgateway.payload.SendMessageRequest;
import com.bbm384.badgateway.payload.SubClubChatList;
import com.bbm384.badgateway.security.CurrentUser;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.service.PrivateMessageService;
import com.bbm384.badgateway.service.SubClubChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("${app.api_path}/private_message")
public class PrivateMessageController {
    @Autowired
    private PrivateMessageService privateMessageService;

    @GetMapping("/list")
    public List<PrivateMessageList> getMessages(
            @CurrentUser UserPrincipal currentUser,
            @RequestParam(value = "receiverId") long receiverId,
            @RequestParam(value = "before") Optional<Instant> before,
            @RequestParam(value = "after") Optional<Instant> after
    ){
        return privateMessageService.getMessageList(currentUser, receiverId, before, after);
    }

    @PostMapping("/send")
    public ApiResponse sendNewMessage(@CurrentUser UserPrincipal currentUser,
                                      @RequestParam(value = "receiverId") long receiverId,
                                      @RequestBody SendMessageRequest sendMessageRequest) {
        return privateMessageService.sendNewMessage(currentUser, receiverId, sendMessageRequest);
    }
}
