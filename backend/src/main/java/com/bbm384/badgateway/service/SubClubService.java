package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.model.constants.ClubStatus;
import com.bbm384.badgateway.model.constants.UserType;
import com.bbm384.badgateway.payload.PagedResponse;
import com.bbm384.badgateway.payload.SubClubPayload;
import com.bbm384.badgateway.repository.CategoryRepository;
import com.bbm384.badgateway.repository.ClubRepository;
import com.bbm384.badgateway.repository.SubClubRepository;
import com.bbm384.badgateway.repository.UserRepository;
import com.bbm384.badgateway.security.CurrentUser;
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

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class SubClubService {

    @Autowired
    private SubClubRepository subClubRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public SubClubPayload createSubClub(@CurrentUser UserPrincipal currentUser, SubClubPayload subClubPayload){
        Club club = clubRepository.findByName(subClubPayload.getParentClub()).orElseThrow(
                () -> new ResourceNotFoundException("Club", "name", String.valueOf(subClubPayload.getParentClub()))
        );
        Category category = categoryRepository.findByName(subClubPayload.getCategory()).orElseThrow(
                () -> new ResourceNotFoundException("Category", "name", String.valueOf(subClubPayload.getCategory()))
        );
        User user = userRepository.findByName(subClubPayload.getAdmin()).orElseThrow(
                () -> new ResourceNotFoundException("User", "name", String.valueOf(subClubPayload.getAdmin()))
        );
        SubClub subClub = new SubClub(subClubPayload.getName(),
                                      club,
                                      subClubPayload.getDescription(),
                                      category,
                                      subClubPayload.getMembers(),
                                      user);
        subClub.setCreatedBy(currentUser.getId());
        subClub.setCreatedAt(Instant.now());
        subClubRepository.save(subClub);
        return ModelMapper.mapToSubClubInfoResponse(subClub);
    }

    public SubClubPayload updateSubClub(SubClubPayload subClubPayload){
        SubClub subClub = subClubRepository.findById(subClubPayload.getId()).orElseThrow(
                () -> new ResourceNotFoundException("subClub", "id", String.valueOf(subClubPayload.getId()))
        );
        Club club = clubRepository.findByName(subClubPayload.getParentClub()).orElseThrow(
                () -> new ResourceNotFoundException("Club", "name", String.valueOf(subClubPayload.getParentClub()))
        );
        Category category = categoryRepository.findByName(subClubPayload.getCategory()).orElseThrow(
                () -> new ResourceNotFoundException("Category", "name", String.valueOf(subClubPayload.getCategory()))
        );
        User user = userRepository.findByName(subClubPayload.getAdmin()).orElseThrow(
                () -> new ResourceNotFoundException("User", "name", String.valueOf(subClubPayload.getAdmin()))
        );
        subClub.setName(subClubPayload.getName());
        subClub.setParentClub(club);
        subClub.setDescription(subClubPayload.getDescription());
        subClub.setCategory(category);
        subClub.setMembers(subClubPayload.getMembers());
        subClub.setAdmin(user);

        subClubRepository.save(subClub);
        return ModelMapper.mapToSubClubInfoResponse(subClub);
    }

    public SubClubPayload getSubClubInfo(long id) {
        SubClub subClub = subClubRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("SubClub", "id", String.valueOf(id))
        );
        return ModelMapper.mapToSubClubInfoResponse(subClub);
    }

    public PagedResponse<SubClubPayload> getSubClubList(int page,
                                                        Optional<String> name,
                                                        Optional<Long> parentClub,
                                                        Optional<Long> category) {
        subCLubActivityStatus();

        Pageable pageable = PageRequest.of(page, AppConstants.DEFAULT_PAGE_SIZE, Sort.Direction.DESC, "id");
        Page<SubClub> subClubs;

        QSubClub root = QSubClub.subClub;
        BooleanExpression query = root.id.isNotNull();

        if(name.isPresent()) {
                query = query.and(root.name.startsWith(name.get()));
        }
        if(parentClub.isPresent()) {
            query = query.and(root.parentClub.eq(new Club(parentClub.get())));
        }
        if(category.isPresent()) {
            query = query.and(root.category.eq(new Category(category.get())));
        }

        query = query.and(root.status.eq(ClubStatus.ACTIVE));

        subClubs = subClubRepository.findAll(query,pageable);

        List<SubClubPayload> SubClubInfoResponse = subClubs.map(subClub
                -> ModelMapper.mapToSubClubInfoResponse(subClub)).getContent();


        return new PagedResponse<SubClubPayload>(SubClubInfoResponse,
                subClubs.getNumber(),
                subClubs.getSize(),
                subClubs.getTotalElements(),
                subClubs.getTotalPages(),
                subClubs.isLast()
        );
    }


    public List<SubClubPayload> getEnrolledSubClubs(UserPrincipal currentUser, long clubId){
        Club parentClub = clubRepository.findById(clubId).orElseThrow(
                () -> new ResourceNotFoundException("Club", "id", String.valueOf(clubId))
        );

        if (currentUser.getUser().getUserType().equals(UserType.ADMIN)){
            return subClubRepository.findAllByParentClub(parentClub).stream().map(
                    subClub -> ModelMapper.mapToSubClubInfoResponse(subClub)
            ).collect(Collectors.toList());
        }

        return subClubRepository.findAllByMembersAndParentClub(currentUser.getUser(), parentClub).stream().map(
                subClub -> ModelMapper.mapToSubClubInfoResponse(subClub)
        ).collect(Collectors.toList());
    }

    public SubClubPayload deleteSubClub(UserPrincipal currentUser, Long id) {
        SubClub subClub = subClubRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("SubClub", "id", String.valueOf(id))
        );

        subClub.setStatus(ClubStatus.PASSIVE);
        subClubRepository.save(subClub);

        return ModelMapper.mapToSubClubInfoResponse(subClub);
    }

    public List<String> getAllSubClubs(){
        return  subClubRepository.findAll().stream().map(
                subClub -> subClub.getName()
        ).collect(Collectors.toList());
    }

    public void subCLubActivityStatus(){
        List<SubClub> subClubs = subClubRepository.findAll();

        for(SubClub subClub: subClubs){
            if(subClub.checkActivity()){
                subClubRepository.save(subClub);
            }
        }
    }

    public SubClub enrollUser(Long userId,Long subClubId){
        SubClub subClub = subClubRepository.findById(subClubId).orElseThrow(
                () -> new ResourceNotFoundException("SubClub", "id", String.valueOf(subClubId))
        );
        System.out.println(userId);
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", String.valueOf(userId))
        );
        Set<User> users = subClub.getMembers();
        for(User tempUser : users) {
            if(tempUser.getId() == userId) {
                return subClub;
            }
        }

        users.add(user);
        subClubRepository.save(subClub);
        return subClub;
    }
}
