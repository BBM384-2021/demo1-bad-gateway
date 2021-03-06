import * as eventService from "../services/event";


export const eventListAction = (page, name, eventType, beforeEventDate, afterEventDate, callback) => {
    return (dispatch, getState) => {

        return eventService.eventListService(page, name, eventType, beforeEventDate, afterEventDate).then(
            (result) => {
                callback(result.data);
            },
            (error) => {
                // callback(messageError);
            });
    }
};


export const eventInfoAction = (id, callback) => {
    return (dispatch, getStatus) => {
        return eventService.eventInfoService(id).then(
            (result) => {
                callback(result.data);
            },
            (error) => {
                // callback(messageError);
            });
    }
}


export const eventCreateAction = (data, callback) => {
    return (dispatch, getStatus) => {
        return eventService.eventCreateService(data).then(
            (result) => {
                callback(result.data);
            },
            (error) => {
                // callback(messageError);
            });
    }
}


export const eventUpdateAction = (data, callback) => {
    return (dispatch, getStatus) => {
        return eventService.eventUpdateService(data).then(
            (result) => {
                callback(result.data);
            },
            (error) => {
                // callback(messageError);
            });
    }
}


export const eventDeleteAction = (id, callback) => {
    return (dispatch, getStatus) => {
        return eventService.eventDeleteService(id).then(
            (result) => {
                callback(result.data);
            },
            (error) => {
                // callback(messageError);
            });
    }
}


export const attendEventAction = (eventId, callback) => {
    return (dispatch, getStatus) => {
        return eventService.attendEventService(eventId).then(
            (result) => {
                callback(result.data);
            },
            (error) => {
                // callback(messageError);
            });
    }
}


export const deleteAttendeeAction = (eventId, callback) => {
    return (dispatch, getStatus) => {
        return eventService.deleteAttendeeService(eventId).then(
            (result) => {
                callback(result.data);
            },
            (error) => {
                // callback(messageError);
            });
    }
}


export const getSubClubEventsAction = (subClubId, callback) => {
    return (dispatch, getStatus) => {
        return eventService.getSubClubEventsService(subClubId).then(
            (result) => {
                callback(result.data);
            },
            (error) => {
                // callback(messageError);
            });
    }
}



