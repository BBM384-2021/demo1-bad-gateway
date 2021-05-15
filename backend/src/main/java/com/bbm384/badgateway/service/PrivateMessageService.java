package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.PrivateMessage;
import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.SubClubChat;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.PrivateMessageList;
import com.bbm384.badgateway.payload.SendMessageRequest;
import com.bbm384.badgateway.payload.SubClubChatList;
import com.bbm384.badgateway.repository.PrivateMessageRepository;
import com.bbm384.badgateway.repository.UserRepository;
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
public class PrivateMessageService {
    @Autowired
    PrivateMessageRepository privateMessageRepository;

    @Autowired
    UserRepository userRepository;

    /* TODO friendship check */

    public List<PrivateMessageList> getMessageList(UserPrincipal currentUser, long receiverId, Optional<Instant> date){
        Pageable top10 = PageRequest.of(0, 10);

        ArrayList<PrivateMessageList> chat = new ArrayList<>();
        Page<PrivateMessage> messageList;

        User receiver = userRepository.findById(receiverId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", String.valueOf(receiverId))
        );

        User sender = currentUser.getUser();

        if(date.isPresent()){
            messageList = privateMessageRepository.findBySenderAndReceiverAndSentAtBeforeOrderBySentAtDesc(sender, receiver, date.get(), top10);
        }
        else {
            messageList = privateMessageRepository.findBySenderAndReceiverOrderBySentAtDesc(sender, receiver, top10);
        }

        for(PrivateMessage message: messageList){
            chat.add(ModelMapper.mapToPrivateMessageList(message));
        }
        return chat;
    }

    public List<PrivateMessageList> getNewMessages(UserPrincipal currentUser, long receiverId, Instant date){
        ArrayList<PrivateMessageList> messageResponses = new ArrayList<>();
        List<PrivateMessage> messageList;
        User sender = currentUser.getUser();

        User receiver = userRepository.findById(receiverId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", String.valueOf(receiverId))
        );

        messageList = privateMessageRepository.findBySenderAndReceiverAndSentAtAfterOrderBySentAtDesc(sender, receiver, date);

        for(PrivateMessage message: messageList){
            messageResponses.add(ModelMapper.mapToPrivateMessageList(message));
        }

        return messageResponses;
    }

    public ApiResponse sendNewMessage(UserPrincipal currentUser, long receiverId, SendMessageRequest sendMessageRequest) {
        if(receiverId == currentUser.getUser().getId()){
            return null;
        }

        User receiver = userRepository.findById(receiverId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", String.valueOf(receiverId))
        );

        if(sendMessageRequest.getMessage().equals("") || sendMessageRequest.getMessage() == null) {
            return new ApiResponse(false, "Mesaj içeriği boş olamaz.");
        }

        PrivateMessage message = new PrivateMessage();
        message.setMessage(sendMessageRequest.getMessage());
        message.setSender(currentUser.getUser());
        message.setSentAt(Instant.now());
        message.setReceiver(receiver);
        privateMessageRepository.save(message);

        return new ApiResponse(true, "Mesaj başarıyla gönderildi");
    }
}
