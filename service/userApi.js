import axios from "axios";

const userApi = {
	async getUserDetail(userId, token) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.get(`/api/v1/users/${userId}`, {
				baseURL: config.public.API_BASE_URL,
				headers: { Authorization: token, 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' },
			});

			return data;
		} catch (error) {
			console.log("fail getUserDetail by ", error);
			return error.response.data;
		}
	},
	async getUserJourneys(userId, token) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.get(`${config.public.API_BASE_URL}/api/v1/users/${userId}/journeys`, {
				headers: { Authorization: token, 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' },
			});
			return data;
		} catch (error) {
			console.log("fail getUserJourneys by ", error);
			return error.response.data;
		}
	},
	async getUserJourneyDetailInfo(userId, journeyId, token) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.get(`${config.public.API_BASE_URL}/api/v1/users/${userId}/journeys/${journeyId}`, {
				headers: { Authorization: token, 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' },
			});
			return data;
		} catch (error) {
			console.log("fail getUserJourneyDetailInfo by ", error);
			return error.response.data;
		}
	},
}

export default userApi;
