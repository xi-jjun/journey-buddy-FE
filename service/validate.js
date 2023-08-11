const validate = {
	validateIdAndPassword(id, password) {
		if (!id || !password || password.length <= 8) return false;

		if (password.length <= 8) {
			return false;
		}
	},
}
