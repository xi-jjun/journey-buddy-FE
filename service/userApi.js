import axios from "axios";

const userApi = {
	async getUserDetail(userId, token) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.get(`/api/v1/users/${userId}`, {
				baseURL: config.public.API_BASE_URL,
				headers: { Authorization: token, 'Access-Control-Allow-Origin': '*' },
			});

			return data;
		} catch (error) {
			console.log("fail getUserDetail by ", error);
			return error.response.data;
		}
	},
}

export default userApi;
