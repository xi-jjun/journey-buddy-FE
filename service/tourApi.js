import axios from "axios";

const tourApi = {
	async getCurrentLocation() {
		const pos = await new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});

		return { lng: pos.coords.longitude, lat: pos.coords.latitude, };
	},
	async getTourListByLocation(searchParams) {
		const config = useRuntimeConfig();

		try {
			const { data } = await axios.get(`${config.public.API_BASE_URL}/api/v1/tour/list-by-geolocation`, {
				// baseURL: config.public.API_BASE_URL,
				params: searchParams,
				headers: { 'Access-Control-Allow-Origin': '*' }
			});

			return data.tour_list;
		} catch (error) {
			console.log("fail getTourListByLocation by ", error);
			return error.response.data;
		}
	},
}

export default tourApi;
