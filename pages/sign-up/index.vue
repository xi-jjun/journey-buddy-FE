<template>
	<header class="find-password-page-back-btn">
		<img src="/images/login/back_icon_navbar.svg">

		<span>회원가입</span>
	</header>

	<section class="sign-up-page-inputs">
		<div class="input-form">
			<label>닉네임</label>
			<input placeholder="닉네임을 입력하세요"/>
		</div>

		<div class="input-form">
			<label>아이디 (이메일)</label>
			<input placeholder="아이디를 입력하세요"/>
		</div>

		<div class="input-form">
			<label>비밀번호</label>
			<input placeholder="비밀번호를 입력하세요" type="password"/>
			<input placeholder="비밀번호를 재확인해주세요" type="password"/>
		</div>

		<div class="input-form">
			<label>이름</label>
			<input placeholder="이름을 입력하세요"/>
		</div>

		<div class="input-form">
			<label>프로필 이미지</label>
			<div class="profile-image-icons">
				<img src="/images/sign-up/profile_default_img_icon_sign_up_page.svg" class="profile-image-icon" @click="$refs.uploadFile.click()"/>
				<img src="/images/sign-up/modify_icon_sign_up_page.svg" class="profile-image-modify-icon"/>
			</div>
			<input type="file" id="uploadFile" ref="uploadFile" accept="image/*" style="display: none" onclick="fileUploadBtn"/>
		</div>

		<button class="sign-up-page-submit-btn">회원가입</button>
	</section>

</template>

<script>

export default {
	data() {
		return {}
	},
	methods: {
		fileUploadBtn() {

		},
	}
}
</script>

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
</style>
