const validate = {
	validateIdAndPassword(id, password) {
		if (!id || !password || password.length <= 8) return false;

		if (password.length <= 8) {
			return false;
		}
	},
	isSamePassword(password, passwordChecker) {
		// 비밀번호가 재확인 비밀번호와 다르면 return false
		return !(!password || !passwordChecker || password !== passwordChecker);
	},
}

export default validate;
