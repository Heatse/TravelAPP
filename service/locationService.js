import { ServiceBase } from "../config/service-base";

export class LocationService extends ServiceBase {
    getRandomLocation = async () => {
        return this.get(`api/locations/random`);
    };

    getTopLocation = async () => {
        return this.get(`api/toplocations`);
    };

    getPopularLocation = async () => {
        return this.get(`api/locations/random`);
    };
    getLocationById = async (id) => {
        return this.get(`api/location/findById/${id}`);
    };

    getCommentLocation = async (id) => {
        return this.get(`api/location/${id}/comment/findAll`);
    };

    commentLocation = async (id, data) => {
        return this.post(`api/location/${id}/comment/create`, data);
    };

    deleteComment = async (id) => {
        return this.delete(`api/location/comment/delete/${id}`);
    };

    getRatingLocation = async (id) => {
        return this.get(`api/location/${id}/averageStars`);
    };

    getTotalCommentByLocationId = async (id) => {
        return this.get(`api/location/${id}/totalComments`);
    };
    findByKeyName = async (name) => {
        return this.post(`api/location/findByKeyName`, name);
    };
}
