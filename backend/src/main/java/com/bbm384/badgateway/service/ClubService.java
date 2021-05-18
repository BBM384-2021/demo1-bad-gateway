package com.bbm384.badgateway.service;


import com.bbm384.badgateway.exception.ClubOperationFlowException;
import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.model.constants.ClubStatus;
import com.bbm384.badgateway.payload.ClubInfoResponse;
import com.bbm384.badgateway.payload.ClubPayload;
import com.bbm384.badgateway.payload.PagedResponse;
import com.bbm384.badgateway.payload.SubClubPayload;
import com.bbm384.badgateway.repository.CategoryRepository;
import com.bbm384.badgateway.repository.ClubRepository;
import com.bbm384.badgateway.repository.SubClubRepository;
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
import org.springframework.validation.annotation.Validated;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Validated
public class ClubService {

    @Autowired
    ClubRepository clubRepository;

    @Autowired
    SubClubRepository subClubRepository;

    @Autowired
    CategoryRepository categoryRepository;

    public ClubInfoResponse getClubInfoById(long id){
        Club club = clubRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Club", "id", String.valueOf(id))
        );
        return ModelMapper.mapToClubInfoResponse(club);
    }

    public ClubInfoResponse getClubInfoByName(String name){
        Club club = clubRepository.findByName(name).orElseThrow(
              () -> new ResourceNotFoundException("Club", "name", String.valueOf(name))
        );

        return ModelMapper.mapToClubInfoResponse(club);

    }

    public PagedResponse<ClubInfoResponse> getClubList(int page, Optional<String> name, Optional<String> categoryName){
        Pageable pageable = PageRequest.of(page, AppConstants.DEFAULT_PAGE_SIZE, Sort.Direction.DESC, "id");
        Page<Club> clubs;

        QClub root = QClub.club;
        BooleanExpression query = root.id.isNotNull();

        if(name.isPresent()) {
            query = query.and(root.name.startsWith(name.get()));
        }
        if(categoryName.isPresent()) {
            query = query.and(root.category.name.eq(categoryName.get()));
        }

        query = query.and(root.status.eq(ClubStatus.ACTIVE));

        clubs = clubRepository.findAll(query, pageable);

        List<ClubInfoResponse> clubResponse = clubs.map(club
                -> ModelMapper.mapToClubInfoResponse(club)).getContent();

        return new PagedResponse<ClubInfoResponse>(clubResponse,
                clubs.getNumber(),
                clubs.getSize(),
                clubs.getTotalElements(),
                clubs.getTotalPages(),
                clubs.isLast()
        );
    }

    public ClubInfoResponse createClub(UserPrincipal currentUser, ClubPayload clubPayload) {
        Optional<Club> club_check = clubRepository.findByName(clubPayload.getName());
        Club club;

        if(club_check.isPresent()){
            throw new ClubOperationFlowException("Club already exists!");
        }else{
            club = new Club();
        }

        club.setName(clubPayload.getName());
        club.setDescription(clubPayload.getDescription());
        club.setCategory(categoryRepository.findByName(clubPayload.getCategory()).get());
        club.setUpdatedBy(currentUser.getUser().getId());
        club.setUpdatedAt(Instant.now());
        club.setStatus(club.getStatus());
        club.setMembers(club.getMembers());
        clubRepository.save(club);

        return ModelMapper.mapToClubInfoResponse(club);
    }

    public ClubInfoResponse updateClub(UserPrincipal currentUser, ClubPayload clubPayload){
        Club club = clubRepository.findById(clubPayload.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Club", "id", String.valueOf(clubPayload.getId()))
        );

        club.setName(clubPayload.getName());
        club.setDescription(clubPayload.getDescription());
        club.setCategory(categoryRepository.findByName(clubPayload.getCategory()).get());
        club.setUpdatedBy(currentUser.getUser().getId());
        club.setUpdatedAt(Instant.now());
        club.setStatus(clubPayload.getStatus());
        club.setMembers(club.getMembers());
        clubRepository.save(club);

        return ModelMapper.mapToClubInfoResponse(club);
    }

    public ClubInfoResponse deleteClub(UserPrincipal currentUser, Long id){
        Club club = clubRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Club", "id", String.valueOf(id))
        );

        club.setStatus(ClubStatus.PASSIVE);
        club.setUpdatedAt(Instant.now());
        club.setUpdatedBy(currentUser.getId());
        clubRepository.save(club);

        return ModelMapper.mapToClubInfoResponse(club);
    }


    public List<SubClubPayload> getAllSubClubs( long clubId){
        Club club = clubRepository.findById(clubId).orElseThrow(
                () -> new ResourceNotFoundException("Club", "id", String.valueOf(clubId))
        );
        QSubClub root = QSubClub.subClub;
        BooleanExpression query = root.id.isNotNull();
        query = query.and(root.parentClub.eq(club));
        List<SubClub> subClubList = (List<SubClub>) subClubRepository.findAll(query);
        List<SubClubPayload> subClubPayloadResponse = new ArrayList<>();
        for(SubClub subClub : subClubList){
            subClubPayloadResponse.add(ModelMapper.mapToSubClubInfoResponse(subClub));
        }
        return subClubPayloadResponse;
    }
}
