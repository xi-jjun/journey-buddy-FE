<script setup>
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";
import validate from "~/service/validate";
import axios from "axios";

// 나중에 화면에 보여주기 위해 사용될 메세지 문구
let notSamePassword = ref(null);
let signUpError = ref(null);

onMounted(() => {
	const token = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY);
	if (token) {
		navigateTo('/');
	}
});

const signUpSubmitBtnClick = async () => {
	const nickname = document.getElementById("sign-up-input-nickname").value;
	const email = document.getElementById("sign-up-input-id").value;
	const password = document.getElementById("sign-up-input-password").value;
	const passwordCheck = document.getElementById("sign-up-input-password-check").value;
	const name = document.getElementById("sign-up-input-name").value;
	const profileImage = document.getElementById("sign-up-input-profile-img");

	if (!validate.isSamePassword(password, passwordCheck)) {
		notSamePassword = '비밀번호가 일치하지 않습니다.';
		return;
	}

	let formData = new FormData();
	formData.append('nickname', nickname);
	formData.append('email', email);
	formData.append('password', password);
	formData.append('name', name);
	if (profileImage.files.length > 0) {
		// 프로필 사진이 존재한다면, 제출데이터에 포함
		formData.append('profile_image_url', profileImage.files[0]);
	}

	const result = await submitSignUp(formData);
	if (result.code === 200) {
		nuxtStorage.localStorage.setData(constant.LOCAL_STORAGE_USER_TOKEN_KEY, result.token, 24, 'h');
		navigateTo('/login');
	}
	signUpError = '회원가입에 실패하셨습니다. 닉네임이 겹치지 않는지 확인해주세요';
};

const submitSignUp = async (formData) => {
	const config = useRuntimeConfig();

	try {
		const { data } = await axios.post(`${config.public.API_BASE_URL}/api/v1/users`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				'Access-Control-Allow-Origin': '*'
			}
		});

		return data;
	} catch (error) {
		const response = error.response;
		return response.data;
	}
};
</script>

<template>
	<header class="find-password-page-back-btn">
		<img src="/images/login/back_icon_navbar.svg" @click="$router.go(-1)">

		<span>회원가입</span>
	</header>

	<section class="sign-up-page-inputs">
		<div class="input-form">
			<label>닉네임</label>
			<input id="sign-up-input-nickname" placeholder="닉네임을 입력하세요"/>
		</div>

		<div class="input-form">
			<label>아이디 (이메일)</label>
			<input id="sign-up-input-id" placeholder="아이디를 입력하세요"/>
		</div>

		<div class="input-form">
			<label>비밀번호</label>
			<input id="sign-up-input-password" placeholder="비밀번호를 입력하세요" type="password"/>
			<input id="sign-up-input-password-check" placeholder="비밀번호를 재확인해주세요" type="password"/>
		</div>

		<div class="input-form">
			<label>이름</label>
			<input id="sign-up-input-name" placeholder="이름을 입력하세요"/>
		</div>

		<div class="input-form">
			<label>프로필 이미지</label>
			<div class="profile-image-icons">
				<img src="/images/sign-up/profile_default_img_icon_sign_up_page.svg" class="profile-image-icon"/>
				<img src="/images/sign-up/modify_icon_sign_up_page.svg" class="profile-image-modify-icon" @click="$refs.uploadProfileImage.click()"/>
			</div>
			<input type="file" id="sign-up-input-profile-img" ref="uploadProfileImage" accept="image/*" style="display: none"/>
		</div>

		<button class="sign-up-page-submit-btn" @click="signUpSubmitBtnClick">회원가입</button>
	</section>

</template>

<style scoped lang="css">
.find-password-page-back-btn {
  width: 100%;
  height: 56px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 16px;
  color: black;

  position: relative;
}

.find-password-page-back-btn img {
  width: 24px;
  height: 24px;

  position: absolute;
  top: 16px;
  left: 12px;
}

.sign-up-page-inputs {
	display: flex;
	flex-direction: column;

  //margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
}

.input-form {
	margin-top: 30px;
  display: flex;
  flex-direction: column;
}

.input-form > label {
  font-size: 13px;
  font-weight: 600;
  color: #778088;
}

.input-form > input {
  margin-top: 8px;
  height: 48px;
  border-radius: 4px;
  border-style: solid;
  border-color: #E6E8EB;

  padding-left: 20px;
}

.input-form > input::placeholder {
  font-size: 15px;
  font-weight: 500;
  color: #CCD1D7;
}

.profile-image-icons {
  position: relative;
  width: 70px;
}

.profile-image-icon {
	margin-top: 12px;
  width: 64px;
  height: 64px;
}

.profile-image-modify-icon {
  position: absolute;
  right: 0;
  bottom: 4px;
  width: 22px;
  height: 22px;
}

.profile-image-modify-icon:active {
	background-color: #778088;
	width: 26px;
	height: 26px;
	border-radius: 50%;
}

.sign-up-page-submit-btn {
	margin-top: 30px;
  height: 48px;

  background-color: #76A4FF;
  border-style: none;
  border-radius: 4px;

  font-weight: 600;
  font-size: 16px;
  color: white;
}

.sign-up-page-submit-btn:active {
	background-color: #528dff;
}
</style>
