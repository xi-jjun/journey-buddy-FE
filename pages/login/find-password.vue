<template>
	<header class="find-password-page-back-btn">
		<img src="/images/login/back_icon_navbar.svg">
	</header>

	<section class="find-password-page-title">
		<span class="title">비밀번호 찾기</span>
		<span class="description">
			가입 당시 입력한 이메일 주소를 통해 <br>
			새로운 비밀번호를 받을 수 있습니다.
		</span>
	</section>

	<section class="find-password-page-input-form">
		<div class="form-id">
			<label>아이디 (이메일)</label>
			<input class="form-id-input" placeholder="아이디를 입력하세요"/>
		</div>

	</section>

	<button class="find-password-page-submit-btn">비밀번호 찾기</button>
</template>

<script>

export default {
	data() {
		return {}
	},
}
</script>

<style scoped lang="css">
.find-password-page-back-btn {
  width: 100%;
  height: 56px;

  position: relative;
}

.find-password-page-back-btn img {
  width: 24px;
  height: 24px;

  position: absolute;
  top: 16px;
  left: 12px;
}

.find-password-page-title {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
  margin-right: 20px;
}

.find-password-page-title > .title {
  color: #262C31;
  font-weight: bold;
  font-size: 28px;
}

.find-password-page-title > .description {
  margin-top: 12px;
  color: #B8BFC4;
  font-weight: 500;
  font-size: 15px;
}

.find-password-page-input-form {
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
}

.form-id {
  display: flex;
  flex-direction: column;
}

.form-id > label {
  font-size: 13px;
  color: #778088;
}

.form-id-input {
  margin-top: 8px;
  height: 48px;
  border-radius: 4px;
  border-style: solid;
  border-color: #E6E8EB;

  padding-left: 20px;
}

.form-id-input::placeholder {
  font-size: 15px;
  font-weight: 500;
  color: #CCD1D7;
}

.find-password-page-submit-btn {
	position: absolute;
	height: 48px;
	bottom: 20px;
	left: 20px;
	right: 20px;

	background-color: #76A4FF;
	border-style: none;
	border-radius: 4px;

	font-weight: 600;
	font-size: 16px;
	color: white;
}
</style>
