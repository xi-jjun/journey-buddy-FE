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
		});

		return toRaw(_tourList.value)['tour_list'];
	},
}

// const getTourListByLocation = async (searchParams) => {
// 	const config = useRuntimeConfig();
// 	const { data: _tourList } = await useFetch(`/api/v1/tour/list-by-geolocation`, {
// 		baseURL: config.public.API_BASE_URL,
// 		query: searchParams,
// 	});
//
// 	return toRaw(_tourList.value)['tour_list'];
// };
//
// const getCurrentLocation = async () => {
// 	const pos = await new Promise((resolve, reject) => {
// 		navigator.geolocation.getCurrentPosition(resolve, reject);
// 	});
//
// 	return {
// 		long: pos.coords.longitude,
// 		lat: pos.coords.latitude,
// 	};
// };

export default tourApi;
// export default getTourListByLocation;
