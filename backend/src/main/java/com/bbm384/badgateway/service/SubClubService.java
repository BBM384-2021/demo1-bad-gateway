package com.bbm384.badgateway.service;

import com.bbm384.badgateway.exception.FileStorageException;
import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.model.constants.ClubStatus;
import com.bbm384.badgateway.model.constants.UserType;
import com.bbm384.badgateway.payload.EnrollSubClubRequest;
import com.bbm384.badgateway.payload.FileUploadResponse;
import com.bbm384.badgateway.payload.PagedResponse;
import com.bbm384.badgateway.payload.SubClubPayload;
import com.bbm384.badgateway.properties.StorageProperties;
import com.bbm384.badgateway.repository.*;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.Random;
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

    @Autowired
    private ClubRequestRepository clubRequestRepository;

    @Autowired
    private StorageProperties storageProperties;

    @Autowired
    ClubRequestService clubRequestService;

    public SubClubPayload createSubClub(@CurrentUser UserPrincipal currentUser, SubClubPayload subClubPayload){
        Club club = clubRepository.findByName(subClubPayload.getParentClub()).orElseThrow(
                () -> new ResourceNotFoundException("Club", "name", String.valueOf(subClubPayload.getParentClub()))
        );

        Category category = categoryRepository.findByName(subClubPayload.getCategory()).orElseThrow(
                () -> new ResourceNotFoundException("Category", "name", String.valueOf(subClubPayload.getCategory()))
        );
        SubClub subClub = new SubClub(subClubPayload.getName(),
                                      club,
                                      subClubPayload.getDescription(),
                                      category,
                                      subClubPayload.getMembers());
        if(clubRequestRepository.existsClubRequestByClubName(subClub.getName())){
            ClubRequest clubRequest = clubRequestRepository.findByClubName(subClub.getName()).orElseThrow(
                    () -> new ResourceNotFoundException("ClubRequest", "name", String.valueOf(subClub.getName()))
            );
            List<String> adminSelection = clubRequest.getUser();
            Random rand = new Random();
            String adminName = adminSelection.get(rand.nextInt(adminSelection.size()));
            User adminUser = userRepository.findByUsername(adminName).orElseThrow(
                    () -> new ResourceNotFoundException("User", "name", String.valueOf(adminName))
            );
            subClub.setAdmin(adminUser);
        }

        subClub.setCreatedBy(currentUser.getId());
        subClub.setCreatedAt(Instant.now());
        subClubRepository.save(subClub);
        clubRequestService.deleteClubRequest(subClub.getName());
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

    public SubClub enrollUser(UserPrincipal currentUser, EnrollSubClubRequest enrollSubClubRequest){
        SubClub subClub = subClubRepository.findById(enrollSubClubRequest.getSubClubId()).orElseThrow(
                () -> new ResourceNotFoundException("SubClub", "id", String.valueOf(enrollSubClubRequest.getSubClubId()))
        );
        User user = userRepository.findById(currentUser.getId()).orElseThrow(
                () -> new ResourceNotFoundException("User", "id", String.valueOf(currentUser.getId()))
        );
        Set<User> users = subClub.getMembers();
        for(User tempUser : users) {
            if(tempUser.getId() == currentUser.getId()) {
                return subClub;
            }
        }

        users.add(user);
        subClubRepository.save(subClub);
        return subClub;
    }
    public FileUploadResponse uploadPhoto(UserPrincipal currentUser, Optional<MultipartFile> photo, String name){
        Optional<SubClub> subClub = subClubRepository.findByName(name);
        FileUploadResponse fileUploadResponse = new FileUploadResponse();
        fileUploadResponse.setSuccess(false);

        if(subClub.isPresent()){
            savePhoto(photo.get(), subClub.get(), fileUploadResponse);
        }

        return fileUploadResponse;
    }

    private void savePhoto(MultipartFile file, SubClub subClub,  FileUploadResponse fileUploadResponse){
        if (!file.getContentType().equals(AppConstants.FILE_PNG) &&
                !file.getContentType().equals(AppConstants.FILE_JPEG)){
            throw new FileStorageException("Wrong file format");
        }

        // file.getSize() returns size in bytes so convert it to mb.
        if(file.getSize() / 1000000 > AppConstants.MAX_FILE_SIZE){
            throw new FileStorageException("Photo size must be less than 10MB");
        }

        Path relativePath = storageProperties.getUploadPath();

        try {
            Files.createDirectories(relativePath);
        }
        catch (Exception ex) {
            fileUploadResponse.setSuccess(false);
            throw new FileStorageException("Could not create the directory");
        }

        String fileExtension = "";

        if(file.getContentType().equals(AppConstants.FILE_JPEG)){
            fileExtension = "jpeg";
        }
        else if(file.getContentType().equals(AppConstants.FILE_PNG)){
            fileExtension = "png";
        }

        Path filePath = relativePath.resolve(file.getOriginalFilename());

        try {
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            fileUploadResponse.setSuccess(false);
            e.printStackTrace();
        }

        subClub.setPhotoFileExtension(fileExtension);
        subClub.setPhotoFileName(file.getOriginalFilename());
        subClub.setPhotoFilePath(filePath.toString());
        subClubRepository.save(subClub);
        fileUploadResponse.setSuccess(true);
    }

    public Boolean checkEnrolledSubClub(UserPrincipal currentUser, long subClubId) {
        System.out.println("******");
        if (currentUser.getUser().getUserType().equals(UserType.ADMIN)){
            return true;
        }

        return subClubRepository.existsSubClubByMembersContains(currentUser.getUser());

    }
}
