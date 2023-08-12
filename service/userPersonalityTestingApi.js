import axios from "axios";

const userPersonalityTestingApi = {
	async getUserPersonalityTestResult(userId, token) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.get(`${config.public.API_BASE_URL}/api/v1/users/${userId}/personalities`, {
				headers: { Authorization: token, }
			});
			return data;
		} catch (error) {
			console.log("fail getUserPersonalityTestResult by ", error);
			return error.response.data;
		}
	},
	async createUserPersonality(userId, personalities, token) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.post(`${config.public.API_BASE_URL}/api/v1/users/${userId}/personalities`, { personalities: personalities }, {
				headers: { Authorization: token, }
			});
			return data;
		} catch (error) {
			console.log("fail createUserPersonality by ", error);
			return error.response.data;
		}
	},
}

export default userPersonalityTestingApi;
