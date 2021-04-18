

export const dateParser = (data) => {
    if(data){
        return data.split("T")[0];
    } else {
        return "";
    }
};

export const timeParser = (data) => {
    if(data){
        return data.split("T")[1].split("Z")[0]
    } else {
        return "";
    }
}