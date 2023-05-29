import jwt_decode from "jwt-decode";

export function decodeToken() {
    const localStorageToken = JSON.parse(localStorage.getItem("userToken"));
    const sessionStorageToken = JSON.parse(sessionStorage.getItem("userToken"));
    return localStorageToken?.token || sessionStorageToken?.token ? jwt_decode(localStorageToken?.token
        || sessionStorageToken?.token) : null;
}




