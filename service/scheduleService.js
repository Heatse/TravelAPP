import { ServiceBase } from "../config/service-base";

export class ScheduleService extends ServiceBase {
    getListSchedule = async () => {
        return this.get(`api/schedule/findAll`);
    };

    getScheduleByLocationId = async (id) => {
        return this.get(`api/schedule/findByLocationId/${id}`);
    };
    getListScheduleById = async (id) => {
        return this.get(`api/scheduleDetail/findAll/${id}`);
    };
    createSchedule = async (id) => {
        return this.post(`api/schedule/createOrGet/${id}`);
    };
    createScheduleDetail = async (id, data) => {
        return this.post(`api/scheduleDetail/create/${id}`, data);
    };
    deleteScheduleDetail = async (id) => {
        return this.delete(`api/scheduleDetail/delete/${id}`);
    };
    editScheduleDetail = async (id, data) => {
        return this.put(`api/scheduleDetail/update/${id}`, data);
    };
    deleteSchedule = async (id) => {
        return this.delete(`api/schedule/delete/${id}`);
    };
    findByLocation = async (text) => {
        return this.post(`api/schedule/findByLocation`, text);
    };
}
