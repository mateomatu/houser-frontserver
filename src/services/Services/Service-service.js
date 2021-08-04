import { API_HOST } from "../../constants/api";

import AuthService from "../User/User-service";

const serviceServices = {
    /**
     * Return all services.
     *
     * @returns {Promise<any>}
     */
    async allServices() {
        const response = await fetch(API_HOST + '/api/services', {
            headers: {
                ...AuthService.authorizationHeader()
            }
        });
        const responseData = await response.json();
        return responseData.data;
    },
    /**
     * Returns a specific service.
     * 
     * @param id
     *
     * @returns {Promise<any>}
     */
    async bringServiceById(id) {
        const response = await fetch(API_HOST + `/api/service/${id}`, {
            headers: {
                ...AuthService.authorizationHeader()
            }
        });
        const responseData = await response.json();
        return responseData.data;
    },
    /**
     * Return an array of Housers by service ID.
     * 
     * @param id
     *
     * @returns {Promise<any>}
     */
    async bringHousersByService(id) {
        const response = await fetch(API_HOST + `/api/services/housers/${id}`, {
            headers: {
                ...AuthService.authorizationHeader()
            }
        });
        const responseData = await response.json();
        return responseData.data;
    }
}

export default serviceServices;