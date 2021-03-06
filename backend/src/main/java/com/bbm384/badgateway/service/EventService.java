package com.bbm384.badgateway.service;


import com.bbm384.badgateway.exception.EventOperationFlowException;
import com.bbm384.badgateway.exception.ResourceNotFoundException;
import com.bbm384.badgateway.model.*;
import com.bbm384.badgateway.model.constants.EventType;
import com.bbm384.badgateway.model.constants.UserType;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.EventPayload;
import com.bbm384.badgateway.payload.PagedResponse;
import com.bbm384.badgateway.repository.ClubRepository;
import com.bbm384.badgateway.repository.EventRepository;
import com.bbm384.badgateway.repository.SubClubRepository;
import com.bbm384.badgateway.security.UserPrincipal;
import com.bbm384.badgateway.util.AppConstants;
import com.bbm384.badgateway.util.ModelMapper;
import com.querydsl.core.types.dsl.BooleanExpression;
//import com.sun.org.apache.xpath.internal.operations.Mod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.PreRemove;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    ClubRepository clubRepository;

    @Autowired
    SubClubRepository subClubRepository;


    public PagedResponse<EventPayload> getEventsList(UserPrincipal currentUser, int page, Optional<String> name, Optional<EventType> eventType,
                                                     Optional<Instant> beforeEventDate, Optional<Instant> afterEventDate,
                                                     Optional<Long> clubId, Optional<Long> subClubId) {

        Pageable pageable = PageRequest.of(page, AppConstants.DEFAULT_PAGE_SIZE, Sort.Direction.DESC, "id");
        Page<Event> events;

        QEvent root = QEvent.event;
        BooleanExpression query = root.id.isNotNull();

        if(!currentUser.getUser().getUserType().equals(UserType.ADMIN)){
            List<Club> clubsThatUserIsMember = clubRepository.findAllByMembers(currentUser.getUser());
            List<SubClub> subClubsThatUserIsMember = subClubRepository.findAllByMembers(currentUser.getUser());

            BooleanExpression query3 = null;
            BooleanExpression query2 = null;


            if(clubsThatUserIsMember.size() > 0){
                query3 = root.club.id.eq(clubsThatUserIsMember.get(0).getId());
                for (Club club : clubsThatUserIsMember){
                    query3 = query3.or(root.club.id.eq(club.getId()));
                }
            }


            if(subClubsThatUserIsMember.size() > 0){
                query2 = root.subClub.id.eq(subClubsThatUserIsMember.get(0).getId());

                for (SubClub subClub : subClubsThatUserIsMember){
                    query2 = query2.or(root.subClub.id.eq(subClub.getId()));
                }
            }

            if(query2 != null && query3 != null){
                query2 = query2.or(query3);
                query = query.and(query2);
            }
            else if(query2 == null){
                query = query.and(query3);
            }
            else if(query3 == null){
                query = query.and(query2);
            }
        }


        if(name.isPresent()) {
            query = query.and(root.name.startsWith(name.get()));
        }
        if(eventType.isPresent()){
            query = query.and(root.eventType.eq(eventType.get()));
        }
        if (beforeEventDate.isPresent()){
            query = query.and(root.eventDate.before(beforeEventDate.get()));
        }
        if (afterEventDate.isPresent()){
            query = query.and(root.eventDate.after(afterEventDate.get()));
        }
        if (clubId.isPresent()){
            query = query.and(root.club.id.eq(clubId.get()));
        }
        if (subClubId.isPresent()){
            query = query.and(root.subClub.id.eq(subClubId.get()));
        }
        System.out.println(query.toString());
        events = eventRepository.findAll(query, pageable);

        List<EventPayload> eventInfoResponse = events.map(
                event -> ModelMapper.mapToEventPayload(event)).getContent();


        return new PagedResponse<EventPayload>(eventInfoResponse,
                events.getNumber(),
                events.getSize(),
                events.getTotalElements(),
                events.getTotalPages(),
                events.isLast()
        );
    }

    public EventPayload getEvent(long id){
        Event event = eventRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Event", "id", String.valueOf(id))
        );
        if (event == null){
            return null;
        }

        return ModelMapper.mapToEventPayload(event);
    }

    public ApiResponse createEvent(UserPrincipal currentUser, EventPayload eventPayload){
        ApiResponse response = new ApiResponse();

        Optional<Event> eventExist = eventRepository.findByAddressAndEventDate(eventPayload.getAddress(), eventPayload.getEventDate());

        if (eventExist.isPresent()){
            response.setSuccess(false);
            response.setMessage("There is already an event at this address and time.");
            return response;
        }

        if(eventPayload.getClubId() == null){
            response.setSuccess(false);
            response.setMessage("Club must be selected.");
            return response;
        }

        Club club = clubRepository.findById(eventPayload.getClubId()).orElseThrow(
                () -> new ResourceNotFoundException("Club", "id", String.valueOf(eventPayload.getClubId()))
        );

        SubClub subClub = null;

        if (eventPayload.getSubClubId() != null){
            subClub = subClubRepository.findById(eventPayload.getSubClubId()).orElseThrow(
                    () -> new ResourceNotFoundException("Sub Club", "id", String.valueOf(eventPayload.getSubClubId()))
            );
            subClub.setActivity(Instant.now());
            subClubRepository.save(subClub);
        }


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

        String timestamp = eventPayload.getEventDateCreate();
        TemporalAccessor temporalAccessor = formatter.parse(timestamp);
        LocalDateTime localDateTime = LocalDateTime.from(temporalAccessor);
        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.systemDefault());
        Instant eventDate = Instant.from(zonedDateTime);


        Event event = new Event();
        event.setName(eventPayload.getName());
        event.setAddress(eventPayload.getAddress());
        event.setDescription(eventPayload.getDescription());
        event.setEventType(eventPayload.getEventType());
        event.setAttendees(eventPayload.getAttendees());
        event.setClub(club);
        event.setSubClub(subClub);

        event.setEventDate(eventDate);
        event.setUpdatedBy(currentUser.getId());
        event.setUpdatedAt(Instant.now());
        eventRepository.save(event);


        response.setSuccess(true);
        response.setMessage("Event created with success");

        return response;
    }

    public EventPayload updateEvent(UserPrincipal currentUser, EventPayload eventPayload){

        Optional<Event> eventExist = eventRepository.findByAddressAndEventDate(eventPayload.getAddress(), eventPayload.getEventDate());

        if (eventExist.isPresent()){
            if (!eventExist.get().getId().equals(eventPayload.getId())) return null;
        }

        Event event = eventRepository.findById(eventPayload.getId()).orElseThrow(
                () -> new ResourceNotFoundException("Event", "id", String.valueOf(eventPayload.getId()))
        );

        if(eventPayload.getClubId() == null){
            throw new EventOperationFlowException("Club must be selected");
        }

        Club club = clubRepository.findById(eventPayload.getClubId()).orElseThrow(
                () -> new ResourceNotFoundException("Club", "id", String.valueOf(eventPayload.getClubId()))
        );

        SubClub subClub = null;

        if (eventPayload.getSubClubId() != null){
            subClub = subClubRepository.findById(eventPayload.getSubClubId()).orElseThrow(
                    () -> new ResourceNotFoundException("Sub Club", "id", String.valueOf(eventPayload.getSubClubId()))
            );
        }


        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");

        String timestamp = eventPayload.getEventDateCreate();
        TemporalAccessor temporalAccessor = formatter.parse(timestamp);
        LocalDateTime localDateTime = LocalDateTime.from(temporalAccessor);
        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, ZoneId.systemDefault());
        Instant eventDate = Instant.from(zonedDateTime);

        System.out.println(eventDate);

        event.setName(eventPayload.getName());
        event.setAddress(eventPayload.getAddress());
        event.setDescription(eventPayload.getDescription());
        event.setEventType(eventPayload.getEventType());
        event.setAttendees(eventPayload.getAttendees());
        event.setClub(club);
        event.setSubClub(subClub);
        event.setEventDate(eventDate);
        event.setUpdatedBy(currentUser.getId());
        event.setUpdatedAt(Instant.now());

        eventRepository.save(event);

        return ModelMapper.mapToEventPayload(event);
    }

    public ApiResponse deleteEvent(long id) {
        ApiResponse response = new ApiResponse();

        Event event = eventRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Event", "id", String.valueOf(id))
        );
        if (event == null){
            response.setSuccess(false);
            response.setMessage("Event does not exist.");
            return response;
        }

        eventRepository.delete(event);

        response.setSuccess(true);
        response.setMessage("Event deleted with success");
        return response;
    }


    public EventPayload attendEvent(UserPrincipal currentUser, long eventId){

        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResourceNotFoundException("Event", "id", String.valueOf(eventId))
        );

        event.getAttendees().add(currentUser.getUser());
        eventRepository.save(event);

        return ModelMapper.mapToEventPayload(event);
    }


    public EventPayload deleteAttendee(UserPrincipal currentUser, long eventId){

        Event event = eventRepository.findById(eventId).orElseThrow(
                () -> new ResourceNotFoundException("Event", "id", String.valueOf(eventId))
        );
        
        Set<User> attendees = event.getAttendees();
        attendees.removeIf(user -> user.getId().equals(currentUser.getUser().getId()));
        event.setAttendees(attendees);
        eventRepository.save(event);

        return ModelMapper.mapToEventPayload(event);
    }


    public List<EventPayload> getSubClubEvents(long subClubId) {

        Optional<SubClub> subClub = subClubRepository.findById(subClubId);

        if(subClub.isPresent()){
            List<Event> eventList = eventRepository.findAllBySubClub(subClub.get());
            return eventList.stream().map(event -> ModelMapper.mapToEventPayload(event)).collect(Collectors.toList());
        }


        return null;
    }

}
