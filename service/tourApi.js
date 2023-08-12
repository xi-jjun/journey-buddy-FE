const tourApi = {
	async getCurrentLocation() {
		const pos = await new Promise((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});

		return { lng: pos.coords.longitude, lat: pos.coords.latitude, };
	},
	async getTourListByLocation(searchParams) {
		const config = useRuntimeConfig();
		const { data: _tourList } = await useFetch(`/api/v1/tour/list-by-geolocation`, {
			baseURL: config.public.API_BASE_URL,
			query: searchParams,
			headers: { 'Access-Control-Allow-Origin': '*' }
		});

		return toRaw(_tourList.value)['tour_list'];
	},
}

export default tourApi;
