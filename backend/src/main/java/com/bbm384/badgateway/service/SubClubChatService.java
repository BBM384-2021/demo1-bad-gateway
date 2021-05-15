package com.bbm384.badgateway.service;


import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.SubClubChat;
import com.bbm384.badgateway.model.User;
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
public class SubClubChatService {
    @Autowired
    SubClubMessageRepository subClubMessageRepository;

    @Autowired
    SubClubRepository subClubRepository;


    public List<SubClubChatList> getMessageList(UserPrincipal currentUser, Long subClubId, Optional<Instant> date){
        Pageable top10 = PageRequest.of(0, 10);

        ArrayList<SubClubChatList> chat = new ArrayList<>();
        Page<SubClubChat> messageList;
        Boolean isMember = false;

        SubClub subclub = subClubRepository.findById(subClubId).orElseThrow(
                () -> new ResourceNotFoundException("SubClub", "id", String.valueOf(subClubId))
        );

        for(User member: subclub.getMembers()){
            if(member.getId() == currentUser.getUser().getId()){
                isMember = true;
            }
        }

        if(!isMember){
            throw new ResourceNotFoundException("Member", "id", String.valueOf(currentUser.getUser().getId()));
        }

        if(date.isPresent()){
            messageList = subClubMessageRepository.findBySubClubAndSentAtBeforeOrderBySentAtDesc(subclub, date.get(), top10);
        }
        else {
            messageList = subClubMessageRepository.findBySubClubOrderBySentAtDesc(subclub, top10);
        }

        System.out.println(messageList);

        for(SubClubChat message: messageList){
            chat.add(ModelMapper.mapToMessageList(message));
        }
        return chat;
    }

    public List<SubClubChatList> getNewMessages(UserPrincipal currentUser, Long subClubId, Instant date){
        ArrayList<SubClubChatList> messageResponses = new ArrayList<>();
        List<SubClubChat> messageList;

        SubClub subclub = subClubRepository.findById(subClubId).orElseThrow(
                () -> new ResourceNotFoundException("SubClub", "id", String.valueOf(subClubId))
        );

        messageList = subClubMessageRepository.findBySubClubAndSentAtAfterOrderBySentAtDesc(subclub, date);

        for(SubClubChat message: messageList){
            messageResponses.add(ModelMapper.mapToMessageList(message));
        }

        return messageResponses;
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