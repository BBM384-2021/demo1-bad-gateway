import * as categoryService from "../services/category";


export const getAllCategoriesAction = (callback) => {
    return (dispatch, getState) => {
        return categoryService.getAllCategoriesService().then(
            (result) => {
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};

export const addCategoryAction = (callback,data) => {
    return (dispatch, getState) => {
        return categoryService.addCategoryService(data).then(
            (result) => {
                console.log(result)
                callback(result.data);
            },
            (error) =>{
                // callback(messageError);
            });
    }
};