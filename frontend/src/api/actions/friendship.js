import * as friendshipService from "../services/friendship";


export const sendFriendRequest = (userId,callback) => {
	return (dispatch, getState) => {
		return friendshipService.sendFriendRequest(userId).then(
			(result) => {
				callback(result.data);
			},
			(error) =>{
				// callback(messageError);
			});
	}
};

export const getFriendships = (callback) => {
	return (dispatch, getState) => {
		return friendshipService.getFriendships().then(
			(result) => {
				callback(result.data);
			},
			(error) =>{
				// callback(messageError);
			});
	}
};

export const getFriendshipsWaiting = (callback) => {
	return (dispatch, getState) => {
		return friendshipService.getFriendshipsWaiting().then(
			(result) => {
				callback(result.data);
			},
			(error) =>{
				// callback(messageError);
			});
	}
};

export const acceptFriendshipRequest = (id,callback) => {
	return (dispatch, getState) => {
		return friendshipService.acceptFriendshipRequest(id).then(
			(result) => {
				callback(result.data);
			},
			(error) =>{
				// callback(messageError);
			});
	}
};

export const rejectFriendshipRequest = (id,callback) => {
	return (dispatch, getState) => {
		return friendshipService.rejectFriendshipRequest(id).then(
			(result) => {
				callback(result.data);
			},
			(error) =>{
				// callback(messageError);
			});
	}
};