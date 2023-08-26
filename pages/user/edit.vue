<script setup>
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";
import parseJwt from "~/service/jwtParser";
import userApi from "~/service/userApi";
import journeyApi from "~/service/journeyApi";
import axios from "axios";

/* ============================================
 * UI 컴포넌트용 데이터
 **/
const nicknameInput = { id: 'nickname', title: '닉네임 (필수)', placeholder: '유저명을 입력해주세요', readonly: false }
const emailInput = { id: 'email', title: '이메일 (필수)', placeholder: '이메일을 입력해주세요', readonly: false }
const passwordInput = { id: 'password', title: '비밀번호', placeholder: '비밀번호를 입력해주세요', readonly: false, type: 'password' }
const nameInput = { id: 'name', title: '이름 (필수)', placeholder: '이름을 입력해주세요', readonly: false }
const phoneNumberInput = { id: 'phoneNumber', title: '휴대전화 (선택)', placeholder: '번호를 입력해주세요 (\'-\'포함)', readonly: false }
/* ============================================ */


const userDetail = reactive({ info: {}, currentJourney: {} });
let userTokenFromLocalStorage = reactive({ token: '' });
onMounted(async () => {
	userTokenFromLocalStorage.token = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY); // user token

	if (userTokenFromLocalStorage.token) {
		const userToken = userTokenFromLocalStorage.token;
		const payload = parseJwt(userToken);
		const userId = payload['user_id'];

		// 유저 상세정보
		const userDetailResult = await userApi.getUserDetail(userId, userToken);
		userDetail.info = userDetailResult.user;

		// 유저의 현재 진행중인 여행 정보
		const currentJourneyResult = await journeyApi.getCurrentUserJourney(userToken);
		userDetail.currentJourney = currentJourneyResult['journey'];
	} else {
		console.log("not login user");
		navigateTo('/login');
	}
});

const userInfoModifySubmitBtnClick = async () => {
	const uploadProfileImage = document.getElementById("uploadProfileImage");
	const nickname = document.getElementById("nickname").value;
	const email = document.getElementById("email").value;
	const name = document.getElementById("name").value;
	const phoneNumber = document.getElementById("phoneNumber").value;

	let formData = new FormData();
	if (uploadProfileImage.files.length) {
		formData.append('profile_image_url', uploadProfileImage.files[0]);
	}
	formData.append('nickname', nickname);
	formData.append('email', email);
	formData.append('name', name);
	formData.append('phoneNumber', phoneNumber);

	const userToken = userTokenFromLocalStorage.token;
	const payload = parseJwt(userToken);
	const userId = payload['user_id'];
	const modificationResult = await submitModificationInfo(userId, formData);
	if (modificationResult.code === 200) {
		navigateTo('/');
		return;
	}

	alert("유저 정보 변경에 실패했습니다.");
};

const submitModificationInfo = async (userId, formData) => {
	const config = useRuntimeConfig();

	try {
		const { data } = await axios.patch(`${config.public.API_BASE_URL}/api/v1/users/${userId}`, formData, {
			headers: {
				Authorization: userTokenFromLocalStorage.token,
				'Content-Type': 'multipart/form-data',
				'Access-Control-Allow-Origin': '*',
				'ngrok-skip-browser-warning': '123',
			}
		});

		return data;
	} catch (error) {
		const response = error.response;
		return response.data;
	}
};

const showProfileImageWhenSelectPicture = async () => {
	const profileImage = document.getElementById("uploadProfileImage");
	const imgShowArea = document.getElementById("profileImageUrl");
	const image = profileImage.files[0]

	const fileReader = new FileReader();
	fileReader.onload = (img) => {
		imgShowArea.src = img.target.result;
	}

	fileReader.readAsDataURL(image);
};

</script>

<template>
	<section class="user-info-edit-page">
		<BackNavbarView :navbar-title="`프로필 편집`">

		</BackNavbarView>

		<div class="user-infos">
			<div class="user-profile-image-for-edit">
				<img v-if="userDetail.info['profile_image_url']" id="profileImageUrl" :src="userDetail.info['profile_image_url']" class="user-profile-image" alt="user profile image">
				<img v-else src="/images/user/default_user_profile_image.svg" id="profileImageUrl" class="user-profile-image" alt="user default profile image">
					<img src="/images/user/user_profile_img_edit_btn_icon.svg" class="user-profile-image-edit-btn"
							 alt="user image edit btn" @click="$refs.uploadProfileImage.click()">
				<input type="file" id="uploadProfileImage" ref="uploadProfileImage" accept="image/*" style="display: none;" @change="showProfileImageWhenSelectPicture">
			</div>
			<span class="user-username">{{ userDetail.info['nickname'] }} 님</span>
		</div>

		<section class="user-info-edit-page-inputs">
			<InputView :component="nicknameInput" :input-value="userDetail.info['nickname']">
			</InputView>
			<InputView :component="emailInput" :input-value="userDetail.info['email']">
			</InputView>
			<InputView :component="passwordInput" :input-value="`**********`" :input-disable="true">
			</InputView>
			<InputView :component="nameInput" :input-value="userDetail.info['name']">
			</InputView>
			<InputView :component="phoneNumberInput" :input-value="userDetail.info['phone_number']">
			</InputView>
		</section>

		<button class="edit-submit-btn" @click="userInfoModifySubmitBtnClick">
			수정하기
		</button>
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

.user-profile-image {
	width: 74px;
	height: 74px;
	border-radius: 50%;
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

.user-profile-image-edit-btn:active {
	width: 20px;
	height: 20px;
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

.edit-submit-btn:active {
	background-color: #528dff;
}
</style>
