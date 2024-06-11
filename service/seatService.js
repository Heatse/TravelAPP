import { ServiceBase } from "../config/service-base";

export class SeatService extends ServiceBase {
    getSeat = async (id) => {
        return this.get(`api/seat/empty/${id}`);
    };
}
