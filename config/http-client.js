import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

export class HttpClient {
    axiosInstance;

    constructor() {
        let configs = {
            baseURL: "http://10.0.2.2:8080/",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Test: "Test",
                // Authorization: "Bearer " + tokenAccess,
            },
            withCredentials: true,
            timeout: 5000,
            transformRequest: [
                (data, headers) => {
                    if (data instanceof FormData) {
                        if (headers) {
                            headers["Content-Type"] = "multipart/form-data";
                        }
                        return data;
                    }
                    return JSON.stringify(data);
                },
            ],
        };
        this.axiosInstance = axios.create(configs);
        this.axiosInstance.interceptors.request.use(
            // function (config) {
            //     return config;
            // },
            async function (config) {
                const cookie = await AsyncStorage.getItem("cookies");
                if (cookie !== null) {
                    config.headers["daudau"] = `${cookie}`;
                } else {
                    console.log("No cookie found.");
                }

                return config;
            },
            function (error) {
                return Promise.reject(error);
            }
        );
        this.axiosInstance.interceptors.response.use(
            function (response) {
                return response.data;
            },
            // function (error) {
            //     return Promise.reject(error);
            // },
            function (error) {
                // const router = useRouter();
                // if (error.response.status === 401) {
                //     router.push("/auth/login");
                // } else if (error.response.status === 403) {
                //     Alert.alert(
                //         "Error",
                //         "You do not have permission to access this resource."
                //     );
                // }
                return Promise.reject(error);
            }
        );
    }
}
