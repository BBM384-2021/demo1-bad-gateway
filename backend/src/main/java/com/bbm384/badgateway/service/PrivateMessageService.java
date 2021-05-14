package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.PrivateMessage;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.PrivateMessageList;
import com.bbm384.badgateway.payload.SendMessageRequest;
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

    public List<PrivateMessageList> getMessageList(UserPrincipal currentUser, long receiverId, Optional<Instant> before,
                                                   Optional<Instant> after){
        Pageable top10 = PageRequest.of(0, 10);

        ArrayList<PrivateMessageList> chat = new ArrayList<>();
        Page<PrivateMessage> messageList;

        User receiver = userRepository.findById(receiverId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", String.valueOf(receiverId))
        );

        User sender = currentUser.getUser();

        if(before.isPresent()){
            messageList = privateMessageRepository.findBySenderAndReceiverAndSentAtBeforeOrderBySentAtDesc(sender, receiver, before.get(), top10);
        }
        else if(after.isPresent()){
            messageList = privateMessageRepository.findBySenderAndReceiverAndSentAtAfterOrderBySentAtDesc(sender, receiver, after.get(), top10);
        }
        else {
            messageList = privateMessageRepository.findBySenderAndReceiverOrderBySentAtDesc(sender, receiver, top10);
        }

        for(PrivateMessage message: messageList){
            chat.add(ModelMapper.mapToPrivateMessageList(message));
        }
        return chat;
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
