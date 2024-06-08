import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import LocalService from "@/services/local_service";

const localServices = new LocalService();
const apiUrl = process.env.EXPO_PUBLIC_API_URL

const RestApiClient = axios.create({
	baseURL: `${apiUrl}`,
	headers: {
		"Content-Type": "application/json",
	},
});

RestApiClient.interceptors.request.use(
	async function (req: InternalAxiosRequestConfig<unknown>) {
		// const token = await localServices.getAccessToken();
		
		const token = process.env.EXPO_PUBLIC_ACCESS_TOKEN;
		console.log('token seteado: ', token)
		if (token) {
			req.headers.Authorization = `Bearer ${token}`;
		}
		return req;
	},
	async function (error) {
		console.log("Interceptor request error", error);

		return Promise.reject(error);
	}
);

RestApiClient.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		console.log("error: ", error);
		const status = error.response?.status;
		if (status === 401) {
			localServices.setAccessToken("");

			return false;
		}
		return Promise.reject(error);
	}
);

export default RestApiClient;
