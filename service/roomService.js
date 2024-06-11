import { ServiceBase } from "../config/service-base";

export class RoomService extends ServiceBase {
    getTopRoom = async () => {
        return this.get(`api/toprooms`);
    };
    getRandomRoom = async () => {
        return this.get(`api/rooms/random`);
    };

    getRoomById = async (id) => {
        return this.get(`api/rooms/${id}`);
    };

    getCommentRoom = async (id) => {
        return this.get(`api/room/${id}/comment/findAll`);
    };
    getListBookingRoom = async () => {
        return this.get(`api/bookingroom/findAll`);
    };

    getBookingRoomById = async (id) => {
        return this.get(`api/bookingroom/findById/${id}`);
    };

    filterRoom = async (data) => {
        return this.post(`api/rooms/search`, data);
    };

    bookingRoom = async (data) => {
        return this.post(`api/bookingroom/create`, data);
    };

    commentRoom = async (id, data) => {
        return this.post(`api/room/${id}/comment/create`, data);
    };

    deleteComment = async (id) => {
        return this.delete(`api/room/comment/delete/${id}`);
    };

    getRoomByProvinId = async (id) => {
        return this.get(`api/room/findByProvinId/${id}`);
    };
    getStarByRoomId = async (id) => {
        return this.get(`api/room/${id}/averageStars`);
    };

    cancelBooking = async (id) => {
        return this.delete(`api/bookingroom/deleteById/${id}`);
    };
    findByAccName = async (name) => {
        return this.post(`api/bookingroom/findByAccName`, name);
    };

    findByKeyAccName = async (name) => {
        return this.post(`api/room/findByKeyAccName`, name);
    };
}
