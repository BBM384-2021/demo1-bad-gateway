package com.bbm384.badgateway.service;


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
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
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

    static Map<String, String[]> words = new HashMap<>();

    static int largestWordLength = 0;

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

        /*TODO DO NOT LOAD WORD LIST EVERY TIME, MAKE IT CONSTANT */

        loadConfigs();
        ArrayList<String> result = badWordsFound(sendMessageRequest.getMessage());
        if(result.size() > 0){
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
            return new ApiResponse(false, filterText(sendMessageRequest.getMessage(), currentUser.getUsername()));
        }

        SubClubChat message = new SubClubChat();
        message.setSubClub(subclub);
        message.setMessage(sendMessageRequest.getMessage());
        message.setSender(currentUser.getUser());
        message.setSenderName(currentUser.getUser().getName());
        message.setSentAt(Instant.now());
        subClubMessageRepository.save(message);

        return new ApiResponse(true, "Message sent succesfully");
    }

    public void loadConfigs() {
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(new URL("https://docs.google.com/spreadsheets/d/1hIEi2YG3ydav1E06Bzf2mQbGZ12kh2fe4ISgLg_UBuM/export?format=csv").openConnection().getInputStream()));
            String line = "";
            int counter = 0;
            while((line = reader.readLine()) != null) {
                counter++;
                String[] content = null;
                try {
                    content = line.split(",");
                    if(content.length == 0) {
                        continue;
                    }
                    String word = content[0];
                    String[] ignore_in_combination_with_words = new String[]{};
                    if(content.length > 1) {
                        ignore_in_combination_with_words = content[1].split("_");
                    }

                    if(word.length() > largestWordLength) {
                        largestWordLength = word.length();
                    }
                    words.put(word.replaceAll(" ", ""), ignore_in_combination_with_words);

                } catch(Exception e) {
                    e.printStackTrace();
                }

            }
            System.out.println("Loaded " + counter + " words to filter out");
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public ArrayList<String> badWordsFound(String input) {
        if(input == null) {
            return new ArrayList<>();
        }

        // don't forget to remove leetspeak, probably want to move this to its own function and use regex if you want to use this

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
        input = input.toLowerCase().replaceAll("[^a-zA-Z]", "");

        // iterate over each letter in the word
        for(int start = 0; start < input.length(); start++) {
            // from each letter, keep going to find bad words until either the end of the sentence is reached, or the max word length is reached.
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
                    }
                }
            }
        }

        for(String s: badWords) {
            System.out.println(s + " qualified as a bad word in a username");
        }
        return badWords;

    }

    public String filterText(String input, String username) {
        ArrayList<String> badWords = badWordsFound(input);
        if(badWords.size() > 0) {
            return "This message was blocked because a bad word was found. If you believe this word should not be blocked, please message support.";
        }
        return input;
    }
}