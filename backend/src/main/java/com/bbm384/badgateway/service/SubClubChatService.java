package com.bbm384.badgateway.service;


import com.bbm384.badgateway.Application;
import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.MemberBan;
import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.model.SubClubChat;
import com.bbm384.badgateway.model.User;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.SendMessageRequest;
import com.bbm384.badgateway.payload.SubClubChatList;
import com.bbm384.badgateway.repository.MemberBanRepository;
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
import java.util.*;


@Service
public class SubClubChatService {
    @Autowired
    SubClubMessageRepository subClubMessageRepository;

    @Autowired
    SubClubRepository subClubRepository;

    @Autowired
    MemberBanRepository memberBanRepository;

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
            return new ApiResponse(false, "Message content cannot be empty.");
        }

        SubClubChat message = new SubClubChat();
        message.setSubClub(subclub);
        message.setMessage(sendMessageRequest.getMessage());
        message.setSender(currentUser.getUser());
        message.setSenderName(currentUser.getUser().getName());
        message.setSentAt(Instant.now());

        String result = badWordsFound(sendMessageRequest.getMessage());
        if(result.contains("*")){
            Optional<MemberBan> memberBan = memberBanRepository.findMemberBanByMember(currentUser.getUser());
            if(memberBan.isPresent()){
                MemberBan memberBanned = memberBan.get();
                memberBanned.setSlangCounter(memberBan.get().getSlangCounter() + 1);
                memberBanned.updateStatus();
            }else{
                MemberBan memberBanNew = new MemberBan();
                memberBanNew.setMember(currentUser.getUser());
                memberBanNew.setSubClub(subClubRepository.findById(subClubId).get());
                memberBanNew.setSlangCounter(1);
                memberBanNew.setCreatedAt(Instant.now());
                memberBanNew.updateStatus();
                memberBanRepository.save(memberBanNew);
            }
            message.setMessage(result);
        }

        subClubMessageRepository.save(message);

        if(result.contains("*")){
            return new ApiResponse(true, filterText(sendMessageRequest.getMessage(), currentUser.getUsername()));
        }

        return new ApiResponse(true, "Message sent successfully");
    }


    public String badWordsFound(String input) {
        if(input == null) {
            return "";
        }

        input = input.replaceAll("1","i");
        input = input.replaceAll("!","i");
        input = input.replaceAll("3","e");
        input = input.replaceAll("4","a");
        input = input.replaceAll("@","a");
        input = input.replaceAll("5","s");
        input = input.replaceAll("7","t");
        input = input.replaceAll("0","o");
        input = input.replaceAll("9","g");

        ArrayList<String> badWords = new ArrayList<>();
        String result = input;
        input = input.toLowerCase().replaceAll("[^a-zA-Z]", "");

        // iterate over each letter in the word
        for(int start = 0; start < input.length(); start++) {
            // from each letter, keep going to find bad words until either the end of the sentence is reached, or the max word length is reached.
            int largestWordLength = Application.getLargestWordLength();
            Map<String, String[]> words = Application.getWords();

            for(int offset = 1; offset < (input.length()+1 - start) && offset < largestWordLength; offset++)  {
                String wordToCheck = input.substring(start, start + offset);
                if(words.containsKey(wordToCheck)) {
                    // for example, if you want to say the word bass, that should be possible.
                    String[] ignoreCheck = words.get(wordToCheck);
                    boolean ignore = false;
                    for(int s = 0; s < ignoreCheck.length; s++ ) {
                        if(input.contains(ignoreCheck[s])) {
                            ignore = true;
                            break;
                        }
                    }
                    if(!ignore) {
                        badWords.add(wordToCheck);

                        String str = "";
                        for (int i = 0; i < wordToCheck.length(); i++) {
                            str += "*";
                        }

                        result = result.replaceAll(wordToCheck, str);
                    }
                }
            }
        }


        return result;

    }

    public String filterText(String input, String username) {
        String badWords = badWordsFound(input);
        if(badWords.contains("*")) {
            return "This message was blocked because a bad word was found. If you believe this word should not be blocked, please message support.";
        }
        return input;
    }
}