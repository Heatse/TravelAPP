import { ServiceBase } from "../config/service-base";

export class UserService extends ServiceBase {
    register = async (params) => {
        const { firstName, lastName, email, password, role } = params;
        return this.post("api/auth/signup", {
            firstName,
            lastName,
            email,
            password,
            role,
        });
    };
    login = async (params) => {
        const { email, password } = params;
        return this.post("api/auth/signin", {
            email,
            password,
        });
    };
    changePassword = async (params) => {
        const { password, passwordChange } = params;
        return this.post("api/auth/change-password", {
            currentPassword: password,
            newPassword: passwordChange,
        });
    };
    getUserById = async (id) => {
        return this.get(`api/user/${id}`);
    };
    updateUser = async (id, params) => {
        return this.put(`api/user/${id}`, params);
    };
    changeAvatar = async (id, params) => {
        return this.post(`api/user/${id}/uploadAvt`, params);
    };
    resetPassword = async (email) => {
        return this.get("api/forgot-password", { email });
    };
    loginWithGoogle = async () => {
        return this.get("api/signinGoogle");
    };
}
