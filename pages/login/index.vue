<script setup>
import nuxtStorage from 'nuxt-storage';
import constant from '~/service/constant'

onMounted(() => {
	const token = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY);
	// 이미 로그인된 사용자가 로그인 페이지에 접근하려고 했을 때에는 메인 페이지로 리다이렉트 시킨다.
	if (token) {
		navigateTo('/');
	}
});

const loginBtnClick = async () => {
	const inputId = document.getElementById("jb-id").value;
	const inputPassword = document.getElementById("jb-password").value;

	const config = useRuntimeConfig();
	const response = await $fetch('/api/v1/users/login', {
		headers: { 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' },
		baseURL: config.public.API_BASE_URL,
		method: 'POST',
		body: { email: inputId, password: inputPassword }
	});
	const { code, token } = response;
	if (code === 200) {
		nuxtStorage.localStorage.setData(constant.LOCAL_STORAGE_USER_TOKEN_KEY, token, 24, 'h');
		navigateTo('/');
	}
};
</script>

<template>
	<section class="login-page-jb-logo">
		<img src="/images/login/jb_logo_login_page.svg" alt="jb-login-logo" @click="navigateTo('/')">
	</section>

	<section class="login-page-first-journey-buddy">
		<span class="question-first">져니버디가 처음이신가요?</span>
		<NuxtLink to="/sign-up" class="go-sign-up">회원가입하기</NuxtLink>
	</section>

	<section class="login-page-form">
		<div class="form-id">
			<label>아이디</label>
			<input id="jb-id" class="form-id-input" placeholder="아이디를 입력하세요"/>
		</div>
		<div class="form-password">
			<label>비밀번호</label>
			<input id="jb-password" class="form-password-input" type="password" placeholder="비밀번호를 입력하세요"/>
		</div>

		<button class="form-login-submit" @click="loginBtnClick">로그인</button>
	</section>

	<section class="login-page-additional">
		<div class="additional-find-id-pw">
			<a href="#">아이디 찾기</a>
			<span>|</span>
			<a href="#">비밀번호 찾기</a>
		</div>

		<div class="additional-simple-sign-up">
			<span>SNS계정으로 간편하게 로그인 하기</span>
		</div>

		<div class="additional-simple-sign-up-icons">
			<div class="sign-up-icons">
				<img src="/images/login/naver_logo_login_page.svg"/>
				<img src="/images/login/kakao_logo_login_page.svg"/>
			</div>
		</div>
	</section>
</template>

<style scoped lang="css">
.login-page-jb-logo {
  margin-top: 50px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.login-page-first-journey-buddy {
  margin-top: 30px;

  display: flex;
  align-items: center;
  justify-content: start;
  margin-left: 20px;
  margin-right: 20px;
}

.question-first {
  color: #636C73;
}

.go-sign-up {
  margin-left: 8px;
  font-weight: bold;
  color: #76A4FF;
	text-decoration: none;
}

.login-page-form {
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-id, .form-password {
  display: flex;
  flex-direction: column;
}

.form-id > label, .form-password > label {
  font-size: 13px;
  color: #778088;
}

.form-id-input, .form-password-input {
  margin-top: 8px;
  height: 48px;
  border-radius: 4px;
  border-style: solid;
  border-color: #E6E8EB;

  padding-left: 20px;
}

.form-id-input::placeholder, .form-password-input::placeholder {
  font-size: 15px;
  font-weight: 500;
  color: #CCD1D7;
}

.form-password {
  margin-top: 15px;
}

.form-login-submit, .form-login-submit:active {
  margin-top: 15px;
  height: 48px;
  border-style: none;
  border-radius: 4px;
  background-color: #76A4FF;

  color: white;
  font-size: 16px;
  font-weight: 600;
}

.form-login-submit:active {
	background-color: #528dff;
}

.login-page-additional {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.additional-find-id-pw {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.additional-find-id-pw a, .additional-find-id-pw span {
  font-size: 12px;
  color: #B8BFC4;
  text-decoration: none;
  font-weight: 500;
}

.additional-find-id-pw > span {
  margin-left: 5px;
  margin-right: 5px;
}

.additional-simple-sign-up {
  margin-top: 40px;
  color: #636C73;
  font-size: 13px;
  font-weight: 600;
}

.additional-simple-sign-up-icons {
  margin-top: 60px;
}

.sign-up-icons {
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.sign-up-icons img {
  width: 48px;
  height: 48px;
}
</style>
