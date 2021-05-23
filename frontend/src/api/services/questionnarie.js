import axios from 'axios';
import {
	API_QUESTIONNARIE_CREATE_URL,
	API_GET_QUESTIONS_URL,
	API_ANSWER_QUESTIONS_URL
} from "../../constants/urls";
import {getHeaderWithToken} from "../../utils/auth";
import {apiError} from "../apiError";


export const createQuestionnarieService = (data) => {
	console.log("before request")
	console.log(data)
	return new Promise(((resolve, reject) => {
		axios.post(encodeURI(API_QUESTIONNARIE_CREATE_URL),data,
			getHeaderWithToken())
			.then(function (response) {
				console.log("response");
				console.log(response);
				resolve(response);
			})
			.catch(function (error) {
				apiError(error, reject);
			});
	}));
};

export const getQuestionsService = () => {
	return new Promise(((resolve, reject) => {
		axios.get(encodeURI(API_GET_QUESTIONS_URL),
			getHeaderWithToken())
			.then(function (response) {
				console.log("response");
				console.log(response);
				resolve(response);
			})
			.catch(function (error) {
				apiError(error, reject);
			});
	}));
};

export const answerQuestions = (data) => {
	return new Promise(((resolve, reject) => {
		axios.post(encodeURI(API_ANSWER_QUESTIONS_URL),data,
			getHeaderWithToken())
			.then(function (response) {
				console.log("response");
				console.log(response);
				resolve(response);
			})
			.catch(function (error) {
				apiError(error, reject);
			});
	}));
};

