import * as eventService from "../services/questionnarie";


export const createQuestionnarieAction = (data,callback) => {
	return (dispatch, getState) => {
		return eventService.createQuestionnarieService(data).then(
			(result) => {
				callback(result.data);
			},
			(error) => {
				// callback(messageError);
			});
	}
};

export const getQuestions = (callback) => {
	return (dispatch, getState) => {
		return eventService.getQuestionsService().then(
			(result) => {
				callback(result.data);
			},
			(error) => {
				// callback(messageError);
			});
	}
};

export const answerQuestions = (data,callback) => {
	return (dispatch, getState) => {
		return eventService.answerQuestions(data).then(
			(result) => {
				callback(result.data);
			},
			(error) => {
				// callback(messageError);
			});
	}
};



