import AuthService from "../User/User-service";

const geocodingServices = {
    /**
     * Gets the location of the solicitated user
     * 
     * @param address
     * @param idUser
     *
     * @returns {Promise<any>}
     */
    async getLocation(address, idUser) {
        const response = await fetch(`http://api.positionstack.com/v1/forward?access_key=4ca2f5c2857819de377374e0dc7e48a8&query=${address}`);
        const responseData = await response.json();

        const houser = await AuthService.getUserData(idUser);

        if (houser) {
            const location = responseData.data.find( ad => ad.country_code === "ARG" && ad.region_code === houser.region && ad.locality === houser.locality);
            return location;
        }
    }
}

export default geocodingServices;