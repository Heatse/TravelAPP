import { HttpClient } from "./http-client";

export class ServiceBase extends HttpClient {
    constructor() {
        super(); // Gọi constructor của lớp cha để khởi tạo axiosInstance với interceptor mới
    }

    get = async (url, params) => {
        return await this.axiosInstance.get(url, { params });
    };

    put = async (url, data) => {
        return await this.axiosInstance.put(url, data);
    };

    post = async (url, params) => {
        return await this.axiosInstance.post(url, params);
    };

    patch = async (url, params) => {
        return await this.axiosInstance.patch(url, params);
    };

    delete = async (url, params) => {
        return await this.axiosInstance.delete(url, { data: params }); // Chỉnh sửa để sử dụng data thay vì params
    };
}
