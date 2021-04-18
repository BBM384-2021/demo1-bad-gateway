
const getToken = () => {
    let token = localStorage.getItem("token");
    if(token && token.trim())
        return token;
    return "";
};

export const getRoles = () => {
    let roles = localStorage.getItem("roles");
    if(roles && roles.trim()){
        roles = JSON.parse(roles);
        return roles;
    }
    return [];
};

export const setLoginInfo = (tokenType, token, roles) => {
    localStorage.setItem('token', `${tokenType} ${token}`);
    localStorage.setItem('roles', JSON.stringify(roles));
};

export const resetLoginInfo = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
};

export const getHeaderWithToken = () => {
    return {
        headers: {
            'Authorization': getToken()

        }
    };
};

export const getHeaderWithTokenForDownload = () => {
    return {
        headers: {
            Authorization: getToken(),
        },
        responseType: 'arraybuffer'
    };
};

export const checkPassword = (password) => {
    let regex = password.match(/(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$?_%!]).{8,20}/);
    return regex !== null;
};