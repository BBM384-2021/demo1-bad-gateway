package com.bbm384.badgateway.service;


import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.SubClubChat;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.SendMessageRequest;
import com.bbm384.badgateway.payload.SubClubChatList;
import com.bbm384.badgateway.repository.SubClubMessageRepository;
import com.bbm384.badgateway.repository.SubClubRepository;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.util.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class MessageService {
    @Autowired
    SubClubMessageRepository subClubMessageRepository;

    @Autowired
    SubClubRepository subClubRepository;


    public List<SubClubChatList> getMessageList(UserPrincipal currentUser, Long subClubId,
                                                Optional<Instant> before, Optional<Instant> after){
        Pageable top10 = PageRequest.of(0, 10);

        ArrayList<SubClubChatList> chat = new ArrayList<>();
        Page<SubClubChat> messageList;

        SubClub subclub = subClubRepository.findById(subClubId).orElseThrow(
                () -> new ResourceNotFoundException("SubClub", "id", String.valueOf(subClubId))
        );

        if(before.isPresent()){
            messageList = subClubMessageRepository.findBySubClubAndSentAtBeforeOrderBySentAtDesc(subclub, before.get(), top10);
        }
        else if(after.isPresent()){
            messageList = subClubMessageRepository.findBySubClubAndSentAtAfterOrderBySentAtDesc(subclub, after.get(), top10);
        }
        else {
            messageList = subClubMessageRepository.findBySubClubOrderBySentAtDesc(subclub, top10);
        }

        for(SubClubChat message: messageList){
            chat.add(ModelMapper.mapToMessageList(message));
        }
        return chat;
    }

    public ApiResponse sendNewMessage(UserPrincipal currentUser, long subClubId, SendMessageRequest sendMessageRequest) {
        SubClub subclub = subClubRepository.findById(subClubId).orElseThrow(
                () -> new ResourceNotFoundException("SubClub", "id", String.valueOf(subClubId))
        );

        if(sendMessageRequest.getMessage().equals("") || sendMessageRequest.getMessage() == null) {
            return new ApiResponse(false, "Mesaj içeriği boş olamaz.");
        }

        SubClubChat message = new SubClubChat();
        message.setSubClub(subclub);
        message.setMessage(sendMessageRequest.getMessage());
        message.setSender(currentUser.getUser());
        message.setSenderName(currentUser.getUser().getName());
        message.setSentAt(Instant.now());
        subClubMessageRepository.save(message);

        return new ApiResponse(true, "Mesaj başarıyla gönderildi");
    }
}