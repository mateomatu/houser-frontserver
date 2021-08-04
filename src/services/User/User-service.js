import React from "react";
import { API_HOST } from "../../constants/api";


let userData = {
    id_usuario: null,
    email: null,
    name: null,
    lastname: null,
    address: null,
    avatar: null,
    alt: null,
    portrait: null,
    desc: null,
    birthday: null,
    telephone: null
};

let token = null;

if(localStorage.getItem('token') !== null) {
    token = localStorage.getItem('token');
    userData = JSON.parse(localStorage.getItem('userData'));
}

const AuthContext = React.createContext({
    user: userData,
    updateAuthState(data) {},
});

AuthContext.displayName = 'AuthContext';

const AuthService = {

    /**
     *
     * @param {Object<{email: String, password: String}>} cred
     * @returns {Promise<void>}
     */
     async login(cred) {
         const res = await fetch(`${API_HOST}/api/auth/login`, {
             method: 'POST',
             credentials: 'include',
             body: JSON.stringify({
                 email: cred.email,
                 password: cred.password
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                }
            });
        const responseData = await res.json();
        if(responseData.success) {
            userData = {
                id_user: responseData.data.id_user,
                email: responseData.data.email,
                name: responseData.data.name,
                lastname: responseData.data.lastname,
                address: responseData.data.address,
                avatar: responseData.data.avatar,
                alt: responseData.data.alt,
                portrait: responseData.data.portrait,
                desc: responseData.data.desc,
                birthday: responseData.data.birthday,
                telephone: responseData.data.telephone
            };
            token = responseData.data.token;

            localStorage.setItem('token', token);
            localStorage.setItem('userData', JSON.stringify(userData));
            return {
                ...userData
            };
        }
        return false;
    },

    async editAvatar(userData) {
        const response = await fetch(`${API_HOST}/api/users/${userData.id_user}/profile`, {
            method: 'POST',
            body: JSON.stringify({
                avatar: userData.avatar
            }),
            headers: {
                'Content-Type': 'application/json',
                ...this.authorizationHeader()
            }
        })
        const responseData = await response.json();
        return responseData;
    },

    async editTelephone(userData) {
        const response = await fetch(`${API_HOST}/api/users/${userData.id_user}/profile`, {
            method: 'POST',
            body: JSON.stringify({
                telephone: userData.telephone
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...this.authorizationHeader()
            }
        })
        const responseData = await response.json();
        return responseData;
    },
    async editAddress(userData) {
        const response = await fetch(`${API_HOST}/api/users/${userData.id_user}/profile`, {
            method: 'POST',
            body: JSON.stringify({
                address: userData.address
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...this.authorizationHeader()
            }
        })
        const responseData = await response.json();
        return responseData;
    },

    async editPassword(userData) {
        const response = await fetch(`${API_HOST}/api/users/${userData.id_user}/profile`, {
            method: 'POST',
            body: JSON.stringify({
                password: userData.password
            }),
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...this.authorizationHeader()
            }
        })
        const responseData = await response.json();
        return responseData;
    },

    /**
     * 
     *
     * @returns {Promise<any>}
     */
    getLoggedUser() {
        return {...userData};
    },
    
    async getUserData(id) {
        const response = await fetch(`${API_HOST}/api/users/${id}`, {
            headers: {
                ...AuthService.authorizationHeader()
            }
        });
        const responseData = await response.json();
        return responseData.data;
    },
    
    isLogged() {
        let isLogged = false;
        if(localStorage.getItem('token') !== null) {
            isLogged = true;
        }
        return isLogged;
    },

    /**
     *
     * @returns {boolean}
     */
    isAuthenticated() {
        return token !== null;
    },

    async logout() {
        await fetch(`${API_HOST}/api/auth/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
                ...this.authorizationHeader()
            }
        });

        userData = {
            id_usuario: null,
            email: null,
            name: null,
            lastname: null,
            address: null,
            avatar: null,
            alt: null,
            portrait: null,
            desc: null,
            birthday: null,
            telephone: null
        };
        token = null;
        if(localStorage.getItem('token') !== null) {
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
        }
        return true;
    },

    /**
     *
     * @returns {null|string}
     */
    getToken() {
        return token;
    },


    async signUp (userData) {
        const res = await fetch(`${API_HOST}/api/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                name: userData.name,
                lastname: userData.lastname,
                telephone: userData.telephone,
                address: userData.address,
                fklevel: 2
               }),
               headers: {
                   'Content-Type': 'application/json',
                   'X-Requested-With': 'XMLHttpRequest',
               }
           });
       const responseData = await res.json();
       return responseData;
    },

        /**
     * Retorna un objeto con el Authorization header configurado si el usuario está autenticado.
     * null de lo contrario.
     *
     * @returns {{Authorization: string}|null}
     */
    authorizationHeader() {
        if(!this.isAuthenticated()) return null;
        return {'Authorization': 'Bearer ' + AuthService.getToken()};
    }
}

export default AuthService;
export {AuthContext};