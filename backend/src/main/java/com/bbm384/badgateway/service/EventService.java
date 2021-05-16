package com.bbm384.badgateway.service;


import com.bbm384.badgateway.model.Event;
import com.bbm384.badgateway.model.QEvent;
import com.bbm384.badgateway.model.constants.EventType;
import com.bbm384.badgateway.payload.ApiResponse;
import com.bbm384.badgateway.payload.EventInfoResponse;
import com.bbm384.badgateway.payload.PagedResponse;
import com.bbm384.badgateway.repository.EventRepository;
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

@Service
public class EventService {

    @Autowired
    EventRepository eventRepository;


    public PagedResponse<EventInfoResponse> getEventsList(int page, Optional<String> name, Optional<EventType> eventType,
                                                          Optional<Instant> beforeEventDate, Optional<Instant> afterEventDate) {

        Pageable pageable = PageRequest.of(page, AppConstants.DEFAULT_PAGE_SIZE, Sort.Direction.DESC, "id");
        Page<Event> events;

        QEvent root = QEvent.event;
        BooleanExpression query = root.id.isNotNull();

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

        events = eventRepository.findAll(query, pageable);

        List<EventInfoResponse> eventInfoResponses = events.map(
                event -> ModelMapper.mapToEventInfoResponse(event)).getContent();


        return new PagedResponse<EventInfoResponse>(eventInfoResponses,
                events.getNumber(),
                events.getSize(),
                events.getTotalElements(),
                events.getTotalPages(),
                events.isLast()
        );
    }

    public ApiResponse createEvent(UserPrincipal currentUser, EventInfoResponse eventInfoResponse){
        ApiResponse response = new ApiResponse();

        Optional<Event> eventExist = eventRepository.findByAddressAndEventDate(eventInfoResponse.getAddress(), eventInfoResponse.getEventDate());

        if (eventExist.isPresent()){
            response.setSuccess(false);
            response.setMessage("There is already an event at this address and time.");
            return response;
        }

        Event event = new Event();
        event.setName(eventInfoResponse.getName());
        event.setAddress(eventInfoResponse.getAddress());
        event.setEventType(eventInfoResponse.getEventType());
        event.setAttendees(eventInfoResponse.getAttendees());
        event.setClub(eventInfoResponse.getClub());
        event.setSubClub(eventInfoResponse.getSubClub());
        event.setEventDate(eventInfoResponse.getEventDate());
        event.setUpdatedBy(currentUser.getId());
        event.setUpdatedAt(Instant.now());

        eventRepository.save(event);
        response.setSuccess(true);

        return response;
    }

}
