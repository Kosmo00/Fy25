
const ACCESS_TOKEN_STORAGE_KEY = "access_token"
const REFRESH_TOKEN_STORAGE_KEY = "refresh_token"

export default class LocalService {

    setTokens = ({
		access_token,
		refresh_token,
	}: {
		access_token: string;
		refresh_token: string;
	}) => {
		localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, access_token);
		localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh_token);
	};

	getAccessToken = async () => {
		const accessToken = await localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
		return accessToken;
	};

	setAccessToken = (accessToken: string) => {
		localStorage.setItem("ACCESS_TOKEN_STORAGE_KEY", accessToken);
	};

	removeAccessToken = () => {
		localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
	};

	getRefreshToken = () => {
		return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);
	};

	setRefreshToken = (token: string) => {
		localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);
	};

	removeRefreshToken = () => {
		localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
	};

	removeAllTokens = () => {
		localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
		localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
	};
}
