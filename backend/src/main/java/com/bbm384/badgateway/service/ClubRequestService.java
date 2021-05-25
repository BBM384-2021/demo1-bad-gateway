package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.ClubRequest;
import com.bbm384.badgateway.model.QClubRequest;
import com.bbm384.badgateway.model.QSubClub;
import com.bbm384.badgateway.model.SubClub;
import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.repository.ClubRequestRepository;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.util.AppConstants;
import com.bbm384.badgateway.util.ModelMapper;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    public PagedResponse<ClubRequestPayload> getAllClubRequest(int page){
        Pageable pageable = PageRequest.of(page, AppConstants.DEFAULT_PAGE_SIZE, Sort.Direction.DESC, "id");
        Page<ClubRequest> clubRequests;

        QClubRequest root = QClubRequest.clubRequest;
        BooleanExpression query = root.id.isNotNull();

        clubRequests = clubRequestRepository.findAll(query,pageable);

        List<ClubRequestPayload> ClubRequestInfoResponse = clubRequests.map(clubRequest
                -> ModelMapper.mapToClubRequestPayload(clubRequest)).getContent();


        return new PagedResponse<ClubRequestPayload>(ClubRequestInfoResponse,
                clubRequests.getNumber(),
                clubRequests.getSize(),
                clubRequests.getTotalElements(),
                clubRequests.getTotalPages(),
                clubRequests.isLast()
        );
    }

    public ApiResponse createClubRequest(UserPrincipal currentUser, ClubRequestPayload clubRequestPayload) {
        ApiResponse response = new ApiResponse();
        if(clubRequestRepository.existsClubRequestByClubName(clubRequestPayload.getClubName())){

            ClubRequest clubRequest = clubRequestRepository.findByClubName(clubRequestPayload.getClubName()).orElseThrow(
                    () -> new ResourceNotFoundException("ClubRequest", "clubName", String.valueOf(clubRequestPayload.getClubName()))
            );

            if(clubRequest.getUser().contains(currentUser.getName())){
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
        if(clubRequestPayload.getClubType().equals("Club")){
            clubRequest.setClubType("CLUB");
        }
        else{
            clubRequest.setParentName(clubRequestPayload.getParentName());
            clubRequest.setClubType("SUB-CLUB");
        }
        clubRequestRepository.save(clubRequest);
        response.setSuccess(true);
        response.setMessage("Club Request created with success");

        return response;
    }

    public void deleteClubRequest(String name) {
        QClubRequest root = QClubRequest.clubRequest;
        BooleanExpression query = root.id.isNotNull();

        query = query.and(root.clubName.eq(name));
        Iterable<ClubRequest> clubRequests= clubRequestRepository.findAll(query);
        for (ClubRequest request: clubRequests){
            clubRequestRepository.delete(request);
        }
    }
}
