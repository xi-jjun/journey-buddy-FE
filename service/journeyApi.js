import axios from "axios";

const contentType = {
	TEXT: 1, IMAGE: 2, VOICE: 3
}
const writerType = {
	ASSISTANT: 1, USER: 2, SYSTEM: 3
}

const journeyApi = {
	async startJourney(gender, token) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.post(`${config.public.API_BASE_URL}/api/v1/journeys`, { gender: gender }, {
				headers: { Authorization: token, 'Access-Control-Allow-Origin': '*' }
			});
			return data;
		} catch (error) {
			console.log("fail startJourney by ", error);
			return error.response.data;
		}
	},
	async namingJourneyTitle(journeyId, title, token) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.patch(`${config.public.API_BASE_URL}/api/v1/journeys/${journeyId}`, { title: title }, {
				headers: { Authorization: token, 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' }
			});
			return data;
		} catch (error) {
			console.log("fail namingJourneyTitle by ", error);
			return error.response.data;
		}
	},
	async getBuddyDetailByJourneyId(journeyId, token) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.get(`${config.public.API_BASE_URL}/api/v1/journeys/${journeyId}/buddy`, {
				headers: { Authorization: token, 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' }
			});
			return data;
		} catch (error) {
			console.log("fail getBuddyDetailByJourneyId by ", error);
			return error.response.data;
		}
	},
	async setJourneyBuddyInitSettings(journeyId, token) {
		const config = useRuntimeConfig();
		try {
			const requestData = {};
			const { data } = await axios.post(`${config.public.API_BASE_URL}/api/v1/journeys/${journeyId}/init-buddy`, requestData, {
				headers: { Authorization: token, 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' }
			});
			return data;
		} catch (error) {
			console.log("fail setJourneyBuddyInitSettings by ", error);
			return error.response.data;
		}
	},
	async getCurrentUserJourney(token) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.get(`${config.public.API_BASE_URL}/api/v1/journeys/current`, {
				headers: { Authorization: token, 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' }
			});
			return data;
		} catch (error) {
			console.log("fail getCurrentUserJourney by ", error);
			return error.response.data;
		}
	},
	async getTotalJourneyCount() {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.get(`${config.public.API_BASE_URL}/api/v1/journeys/count`, {
				headers: { 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' }
			});
			return data;
		} catch (error) {
			console.log("fail getTotalJourneyCount by ", error);
			return error.response.data;
		}
	},
	async getTotalUserJourneyCount(userId) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.get(`${config.public.API_BASE_URL}/api/v1/journeys/${userId}/count`, {
				headers: { 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' },
			});
			return data;
		} catch (error) {
			console.log("fail getTotalUserJourneyCount by ", error);
			return error.response.data;
		}
	},
}

export default journeyApi;
