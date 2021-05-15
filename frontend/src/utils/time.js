

export const dateParser = (data) => {
    if(data){
        return data.split("T")[0];
    } else {
        return "";
    }
};

export const timeParser = (data) => {
    if(data){
        let time = data.split("T")[1].split("Z")[0].split(":")
        let local_time = parseInt(time[0]) + 3
        return local_time + ":" + time[1]
    } else {
        return "";
    }
}