import { API_HOST } from "../../constants/api";
import AuthService from "../User/User-service";


const OrderService = {
    /**
     * Returns an array of Orders by user ID.
     * 
     * @param id
     *
     * @returns {Promise<any>}
     */
    async checkForOrders(id){
        const response = await fetch(API_HOST + `/api/orders/users/${id}`, {
            headers: {
                ...AuthService.authorizationHeader()
            }
        });
        const responseData = await response.json();
        return responseData.data;
    },
    /**
     * Updates order status.
     * 
     * @param id_order
     * @param id_status
     *
     * @returns {Promise<any>}
     */
    async updateOrderState(id_order, id_status){
        const response = await fetch(API_HOST + `/api/orders/${id_order}/${id_status}`, {
            method: 'PUT',
            headers: {
                ...AuthService.authorizationHeader()
            }
        })
        const responseData = await response.json();
        return responseData;
    },
        /**
     * Updates notification read status.
     * 
     * @param id_order
     *
     * @returns {Promise<any>}
     */
    async readNotification(id_order){
        const response = await fetch(API_HOST + `/api/notification/read/${id_order}`, {
            method: 'PUT',
            headers: {
                ...AuthService.authorizationHeader()
            }
        })
        const responseData = await response.json();
        return responseData;
    },
    /**
     * Creates a new order for the user.
     * 
     * @param data
     *
     * @returns {Promise<any>}
     */
    async generateOrder(data) {
        const res = await fetch(`${API_HOST}/api/orders/request`, {
            method: 'POST',
            body: JSON.stringify({
                fk_user: data.fk_user,
                fk_houser: data.fk_houser,
                fk_service: data.fk_service,
                user_message: data.user_message
               }),
               headers: {
                   'Content-Type': 'application/json',
                   'X-Requested-With': 'XMLHttpRequest',
                   ...AuthService.authorizationHeader()
               }
           });
       const responseData = await res.json();
       return responseData;
   },
    /**
     * rates a houser from 1 to 5.
     * 
     * @param id_order
     * @param rating
     *
     * @returns {Promise<any>}
     */
   async rateHouser(id_order, rating){
       const response = await fetch(API_HOST + `/api/orders/rate/${id_order}/${rating}`, {
           method: 'PUT',
           headers: {
               ...AuthService.authorizationHeader()
           }
       })
       const responseData = await response.json();
       return responseData;
   }


}

export default OrderService;