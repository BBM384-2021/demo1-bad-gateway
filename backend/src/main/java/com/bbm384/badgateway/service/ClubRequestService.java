package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.ClubRequest;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.ClubRequestPayload;
import com.bbm384.badgateway.repository.ClubRequestRepository;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.util.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClubRequestService {

    @Autowired
    ClubRequestRepository clubRequestRepository;

    public ClubRequestPayload getClubRequest(long id){
        ClubRequest clubRequest= clubRequestRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("clubRequest", "id", String.valueOf(id))
        );
        if (clubRequest == null){
            return null;
        }
        return ModelMapper.mapToClubRequestPayload(clubRequest);
    }

    public List<ClubRequestPayload> getAllClubRequest() {
        return clubRequestRepository.findAll().stream().map(
                clubRequest -> ModelMapper.mapToClubRequestPayload(clubRequest)
        ).collect(Collectors.toList());
    }

    public ApiResponse createClubRequest(UserPrincipal currentUser, ClubRequestPayload clubRequestPayload) {
        ApiResponse response = new ApiResponse();
        if(clubRequestRepository.existsClubRequestByClubName(clubRequestPayload.getClubName())){

            ClubRequest clubRequest = clubRequestRepository.findByClubName(clubRequestPayload.getClubName()).orElseThrow(
                    () -> new ResourceNotFoundException("ClubRequest", "clubName", String.valueOf(clubRequestPayload.getClubName()))
            );

            if(clubRequest.getUser().contains(currentUser.getName())){
                System.out.println("+++++++++++");
                response.setSuccess(false);
                response.setMessage("You have already made the same request.");
                return response;
            }
            clubRequest.setRequestCount(clubRequest.getRequestCount() + 1);
            clubRequest.getUser().add(currentUser.getName());
            clubRequestRepository.save(clubRequest);
            response.setSuccess(true);
            response.setMessage("Club Request created with success");
            return response;

        }

        ClubRequest clubRequest = new ClubRequest();
        clubRequest.setUser(new ArrayList<>());
        String userName = currentUser.getName();
        clubRequest.setClubName(clubRequestPayload.getClubName());
        clubRequest.getUser().add(userName);
        clubRequest.setRequestCount(1);

        clubRequestRepository.save(clubRequest);
        response.setSuccess(true);
        response.setMessage("Club Request created with success");

        return response;
    }
}
