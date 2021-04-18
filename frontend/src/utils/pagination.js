export const initialPaginationData = {
    "page": 0,
    "size": 10,
    "totalElements": 0,
    "totalPages": 1,
    "last": true
};

export const getPaginationResponse = (data) => {
    if(data){
        return  {
            pagination: {
                ...initialPaginationData,
                page: data.page,
                size: data.size,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                last: data.last,
            }
        };
    } else {
        return initialPaginationData;
    }
};
