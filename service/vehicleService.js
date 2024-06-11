import { ServiceBase } from "../config/service-base";

export class VehicleService extends ServiceBase {
    getListBookingVehicles = async (id) => {
        return this.get(`api/bookingvehicle/findAll`);
    };
    getRandomListVehicle = async () => {
        return this.get(`api/vehicles/random`);
    };
    getVehicleById = async (id) => {
        return this.get(`api/vehicle/findById/${id}`);
    };
    bookVehicle = async (data) => {
        return this.post(`api/bookingvehicle/create`, data);
    };

    getListBookingVehicle = async () => {
        return this.get(`api/bookingroom/findAll`);
    };

    getBookingVehicleById = async (id) => {
        return this.get(`api/bookingvehicle/findById/${id}`);
    };
    filterVehicle = async (data) => {
        return this.post(`api/vehicles/search`, data);
    };
    findByDestination = async (name) => {
        return this.post(`api/bookingVehicle/findByDestination`, name);
    };
    deleteBookingVehicle = async (id) => {
        return this.delete(`api/bookingvehicle/deleteById/${id}`);
    };
}
