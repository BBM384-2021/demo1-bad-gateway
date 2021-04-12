package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.payload.PagedResponse;
import com.bbm384.badgateway.model.QSubClub;
import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.payload.*;
import com.bbm384.badgateway.repository.*;
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
public class SubClubService {

    @Autowired
    private SubClubRepository subClubRepository;

    @Autowired
    private UserRepository userRepository;

    public SubClubPayload createSubClub(SubClubPayload subClubPayload){
        SubClub subClub = new SubClub(subClubPayload.getName(),
                                      subClubPayload.getParentClub(),
                                      subClubPayload.getDescription(),
                                      subClubPayload.getCategory(),
                                      subClubPayload.getMembers(),
                                      subClubPayload.getAdmin());

        subClubRepository.save(subClub);
        return ModelMapper.mapToSubClubInfoResponse(subClub);
    }

    public SubClubPayload updateSubClub(SubClubPayload subClubPayload){
        SubClub subClub = subClubRepository.findById(subClubPayload.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Unit", "id", String.valueOf(subClubPayload.getId()))
        );
        subClub.setName(subClubPayload.getName());
        subClub.setParentClub(subClubPayload.getParentClub());
        subClub.setDescription(subClubPayload.getDescription());
        subClub.setCategory(subClubPayload.getCategory());
        subClub.setMembers(subClubPayload.getMembers());
        subClub.setAdmin(subClubPayload.getAdmin());

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

        subClubs = subClubRepository.findAll(query,pageable);

        List<SubClubPayload> SubClubInfoResponse = subClubs.map(subClub
                -> ModelMapper.mapToSubClubInfoResponse(subClub)).getContent();


        return new PagedResponse<>(SubClubInfoResponse,
                subClubs.getNumber(),
                subClubs.getSize(),
                subClubs.getTotalElements(),
                subClubs.getTotalPages(),
                subClubs.isLast()
        );
    }
}
