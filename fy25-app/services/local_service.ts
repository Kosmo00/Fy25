import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	ACCESS_TOKEN_STORAGE_KEY,
	REFRESH_TOKEN_STORAGE_KEY,
} from "@/utils/constants";

export default class LocalService {
	// constructor() {}

	setTokens = ({
		access_token,
		refresh_token,
	}: {
		access_token: string;
		refresh_token: string;
	}) => {
		AsyncStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, access_token);
		AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh_token);
	};

	getAccessToken = async () => {
		const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
		return accessToken;
	};

	setAccessToken = (accessToken: string) => {
		AsyncStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
	};

	removeAccessToken = () => {
		AsyncStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
	};

	getRefreshToken = () => {
		return AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
	};

	setRefreshToken = (token: string) => {
		AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
	};

	removeRefreshToken = () => {
		AsyncStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
	};

	removeAllTokens = () => {
		AsyncStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
		AsyncStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
	};
}
