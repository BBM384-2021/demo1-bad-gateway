import axios from "axios";
import {API_SEND_FRIENDSHIP_URL,API_GET_FRIENDSHIPS_URL,API_GET_FRIENDSHIPS_WAITING_URL,API_ACCEPT_FRIENDSHIP_REQUEST_URL,API_REJECT_FRIENDSHIP_REQUEST_URL} from "../../constants/urls";
import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";


export const sendFriendRequest = (userId) => {
	return new Promise(((resolve, reject) => {
		axios.post(encodeURI(API_SEND_FRIENDSHIP_URL),{userId},
			getHeaderWithToken())
			.then(function (response) {
				console.log("response")
				console.log(response)
				resolve(response);
			})
			.catch(function (error) {
				console.log(error)
				apiError(error, reject);
			});
	}));
};

export const getFriendships = () => {
	return new Promise(((resolve, reject) => {
		axios.get(encodeURI(API_GET_FRIENDSHIPS_URL),
			getHeaderWithToken())
			.then(function (response) {
				console.log("response")
				console.log(response)
				resolve(response);
			})
			.catch(function (error) {
				console.log(error)
				apiError(error, reject);
			});
	}));
};

export const getFriendshipsWaiting = () => {
	return new Promise(((resolve, reject) => {
		axios.get(encodeURI(API_GET_FRIENDSHIPS_WAITING_URL),
			getHeaderWithToken())
			.then(function (response) {
				console.log("response")
				console.log(response)
				resolve(response);
			})
			.catch(function (error) {
				console.log(error)
				apiError(error, reject);
			});
	}));
};

export const acceptFriendshipRequest = (id) => {
	return new Promise(((resolve, reject) => {
		axios.post(encodeURI(API_ACCEPT_FRIENDSHIP_REQUEST_URL),{userId:id},
			getHeaderWithToken())
			.then(function (response) {
				console.log("response")
				console.log(response)
				resolve(response);
			})
			.catch(function (error) {
				console.log(error)
				apiError(error, reject);
			});
	}));
};
export const rejectFriendshipRequest = (id) => {
	return new Promise(((resolve, reject) => {
		axios.post(encodeURI(API_REJECT_FRIENDSHIP_REQUEST_URL),{userId:id},
			getHeaderWithToken())
			.then(function (response) {
				console.log("response")
				console.log(response)
				resolve(response);
			})
			.catch(function (error) {
				console.log(error)
				apiError(error, reject);
			});
	}));
};