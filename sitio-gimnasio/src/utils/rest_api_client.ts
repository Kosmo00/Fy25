import axios, { InternalAxiosRequestConfig } from "axios";
import LocalService from "../services/local_services";

const localServices = new LocalService();
const apiUrl = window.location.origin + '/api';

const RestApiClient = axios.create({
	baseURL: `${apiUrl}`,
	headers: {
		"Content-Type": "application/json",
	},
});

RestApiClient.interceptors.request.use(
	async function (req: InternalAxiosRequestConfig<unknown>) {
		const token = await localServices.getAccessToken();
		if (token) {
			req.headers.Authorization = `Bearer ${token}`;
			// throw new Error("Access token is empty");
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
		console.log("Error: ", error);
		const status = error.response?.status;
		if (status === 401) {
			localServices.setAccessToken("");
			return false;
		}
		return Promise.reject(error);
	}
);

export default RestApiClient;
