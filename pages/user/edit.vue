<script setup>
const nicknameInput = { title: '닉네임', placeholder: '유저명을 입력해주세요', readonly: false }
const emailInput = { title: '아이디 (이메일)', placeholder: '이메일을 입력해주세요', readonly: false }
const passwordInput = { title: '비밀번호', placeholder: '비밀번호를 입력해주세요', readonly: false, type: 'password' }
const nameInput = { title: '이름', placeholder: '이름을 입력해주세요', readonly: false }
const phoneNumberInput = { title: '휴대전화 (선택)', placeholder: '번호를 입력해주세요 (\'-\'포함)', readonly: false }

const userId = useRoute().query.id;
const user = {
	id: 1,
	username: '행복한 닉네임',
	age: 24,
	journey: {
		id: 1,
		title: '행복한 제주도 올레길 여행'
	},
	buddy: {
		name: '슬탄 AI',
	}
}

</script>

<template>
	<section class="user-info-edit-page">
		<BackNavbarView :navbar-title="`프로필 편집`">

		</BackNavbarView>

		<div class="user-infos">
			<div class="user-profile-image-for-edit">
				<img src="/images/user/default_user_profile_image.svg" class="user-profile-image" alt="user profile image">
					<img src="/images/user/user_profile_img_edit_btn_icon.svg" class="user-profile-image-edit-btn"
							 alt="user image edit btn">
			</div>
			<span class="user-username">{{ user.username }} 님</span>
		</div>

		<section class="user-info-edit-page-inputs">
			<InputView :component="nicknameInput">
			</InputView>
			<InputView :component="emailInput">
			</InputView>
			<InputView :component="passwordInput">
			</InputView>
			<InputView :component="nameInput">
			</InputView>
			<InputView :component="phoneNumberInput">
			</InputView>
		</section>

			<button class="edit-submit-btn">
				수정하기
			</button>
<!--		<div class="user-info-edit-submit-btn">-->
<!--		</div>-->
	</section>
</template>

<style scoped lang="css">
.user-info-edit-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-infos {
  margin-top: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-profile-image-for-edit {
  width: 74px;
  height: 74px;
  position: relative;
}

.user-profile-image-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;

  width: 16px;
  height: 16px;
  background-color: #262C31;
	padding: 3px;
  border-radius: 50%;
}

.user-username {
	margin-top: 15px;
	font-weight: 600;
	color: #616B74;
	font-size: 16px;
}

.user-info-edit-page-inputs {
  display: flex;
  flex-direction: column;
  width: 88%;
}

.edit-submit-btn {
	width: 88%;
	height: 48px;
	margin-top: 30px;
	margin-bottom: 30px;
	background-color: #76A4FF;
	border-radius: 4px;
	border: none;

	font-size: 16px;
	font-weight: 600;
	color: white;
}
</style>
