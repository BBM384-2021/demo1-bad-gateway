package com.bbm384.badgateway.service;


import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.repository.ClubRepository;
import com.bbm384.badgateway.repository.SubClubRepository;
import com.bbm384.badgateway.repository.UserRepository;
import com.bbm384.badgateway.util.AppConstants;
import com.bbm384.badgateway.util.ModelMapper;
import com.querydsl.core.types.dsl.BooleanExpression;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SearchService {

    @Autowired
    ClubRepository clubRepository;

    @Autowired
    SubClubRepository subClubRepository;

    @Autowired
    UserRepository userRepository;

    public SearchResponse getSearchResult(int page, Optional<String> name) {

        Page<Club> clubs;
        Page<SubClub> subClubs;

        Pageable pageable = PageRequest.of(page, AppConstants.DEFAULT_PAGE_SIZE, Sort.Direction.DESC, "id");

        QClub clubRoot = QClub.club;
        BooleanExpression clubQuery = clubRoot.id.isNotNull();

        QSubClub subClubRoot = QSubClub.subClub;
        BooleanExpression subClubQuery = subClubRoot.id.isNotNull();


        if (name.isPresent()) {
            clubQuery = clubQuery.and(clubRoot.name.startsWith(name.get()));
            subClubQuery = subClubQuery.and(subClubRoot.name.startsWith(name.get()));

        }

        clubs = clubRepository.findAll(clubQuery, pageable);
        subClubs = subClubRepository.findAll(subClubQuery, pageable);

        List<ClubInfoResponse> clubList = clubs.map(
                club -> ModelMapper.mapToClubInfoResponse(club)
        ).getContent();

        List<SubClubPayload> subClubList = subClubs.map(
                subClub -> ModelMapper.mapToSubClubInfoResponse(subClub)
        ).getContent();


        SearchResponse searchResponse = new SearchResponse();
        searchResponse.setClubs(clubList);
        searchResponse.setSubClubs(subClubList);

        return searchResponse;
    }

    /*
    private List<UserInfo> getMembers(UserPrincipal currentUser, Optional<String> name, Pageable pageable) {

        List<SubClub> enrolledSubClubs = subClubRepository.findAllByMembers(currentUser.getUser());
        List<UserInfo> memberList = new ArrayList<>();

        Page<User> members;

        QUser userRoot = QUser.user;
        BooleanExpression memberQuery = userRoot.id.isNotNull();

        if (name.isPresent()) {
            memberQuery = memberQuery.and(userRoot.name.startsWith(name.get()));
        }

        members = userRepository.findAll(memberQuery, pageable);

        for (User member : members) {
            for (SubClub subClub : enrolledSubClubs) {
                if (subClub.getMembers().contains(member)) {
                    memberList.add(ModelMapper.mapToUserInfoResponse(member));
                    break;
                }
            }
        }

        return memberList;
    }

     */


}
