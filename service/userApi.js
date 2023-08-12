const userApi = {
	async getUserDetail(userId, token) {
		const config = useRuntimeConfig();
		const { code, user } = await $fetch(`/api/v1/users/${userId}`, {
			baseURL: config.public.API_BASE_URL,
			headers: { Authorization: token, 'Access-Control-Allow-Origin': '*' },
		});

		if (code === 200) {
			return user;
		}

		return {};
	},
}

export default userApi;
