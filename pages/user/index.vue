<script setup>
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";
import userApi from "~/service/userApi";
import parseJwt from "~/service/jwtParser";
import journeyApi from "~/service/journeyApi";
import userPersonalityTestingApi from "~/service/userPersonalityTestingApi";

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

const logout = () => {
	nuxtStorage.localStorage.removeItem(constant.LOCAL_STORAGE_USER_TOKEN_KEY);
	userTokenFromLocalStorage.token = undefined;
	window.location.reload();
};

const resetUserPersonalityTest = async () => {
	const userToken = userTokenFromLocalStorage.token;
	const payload = parseJwt(userToken);
	const userId = payload['user_id'];

	const resetResult = await userApi.resetUserPersonalities(userId, userToken);
	if (resetResult.code === 200) {
		// case 1) 초기화 성공 : 이미 테스트했던 유저는 재테스트 진행
		navigateTo('/define-yourself?from=reTest');
		return;
	} else if (resetResult.code === 1) {
		// case 2) 초기화 없음 : 테스트가 처음인 유저
		navigateTo('/define-yourself?from=myPage');
		return;
	}

	alert("성향 테스트 초기화에 실패했습니다.");
};

// 주의) pages/index.vue 에 같은 내용의 코드가 존재. 따라서 수정 시 둘 다 수정해줘야 함
const startNewJourneyBtnClick = async () => {
	// 토큰이 없으면 --> 로그인 화면으로 이동
	if (!userTokenFromLocalStorage.token) {
		navigateTo('/login');
		return;
	}
	// 토큰이 존재할 때,
	const userToken = userTokenFromLocalStorage.token;
	const userTokenPayload = parseJwt(userToken); // user_id, email, expired_at
	const userId = userTokenPayload['user_id'];
	const result = await userPersonalityTestingApi.getUserPersonalityTestResult(userId, userToken);
	if (result.code !== 200) {
		console.log("error response from startNewJourneyBtnClick");
		return;
	}

	const userPersonalities = result['user_personalities'];
	// 	유저 성향 정보가 존재하지 않을 때, 유저 성향 테스트 페이지로 이동
	if (userPersonalities.length === 0) {
		navigateTo('/define-yourself');
		return;
	}

	const userOngoingJourneyResult = await journeyApi.getCurrentUserJourney(userToken);
	if (userOngoingJourneyResult.code !== 200) {
		console.log("error response from startNewJourneyBtnClick - userOngoingJourneyResult");
		return;
	}

	const userOngoingJourney = userOngoingJourneyResult['journey'];
	// 준비중인 여행이 이미 존재하면, 성별은 이미 골랐다는 뜻이기에 여행 타이틀 입력 페이지로 이동
	if (userOngoingJourney['status'] === 1) {
		navigateTo(`/journey/ready?journeyId=${userOngoingJourney['id']}`);
		return;
	}

	// 여행중인 여행이 이미 존재하면, 초기 세팅 끝나고 현재 채팅 중이라는 뜻이기에 채팅방으로 이동
	if (userOngoingJourney['status'] === 2) {
		navigateTo(`/chat?journeyId=${userOngoingJourney['id']}`);
		return;
	}

	// 아무것도 존재하지 않을 때, 새로운 여행을 생성하기 위해서 AI 성별 고르는 페이지로 이동
	navigateTo("/define-yourself/complete?from=main_page");
};

</script>

<template>
	<section class="user-my-page">
		<BackNavbarView :navbar-title="`마이페이지`">

		</BackNavbarView>

		<div class="user-my-page-edit-btn">
			<div class="edit-btn-wrapper">
				<img src="/images/user/edit_icon.svg" alt="edit icon" class="user-my-page-edit-icon">
				<NuxtLink class="user-my-page-edit-title" :to="{ path: '/user/edit', query: { id: userDetail.info['id'] } }">편집</NuxtLink>
			</div>
		</div>

		<div class="user-infos">
			<img v-if="userDetail.info['profile_image_url']" :src="userDetail.info['profile_image_url']" class="user-profile-image" alt="user profile image">
			<img v-else src="/images/user/default_user_profile_image.svg" class="user-profile-image" alt="user profile image">

			<span class="user-username">{{ userDetail.info['nickname'] }} 님</span>
			<div v-if="userDetail.currentJourney['buddy_name']" class="ongoing-journey-buddy">
				<span class="ai-buddy-name">{{ userDetail.currentJourney['buddy_name'] }}</span>
				<span class="ai-buddy-name-postfix">과 여행 중</span>
			</div>
			<div v-else class="ongoing-journey-buddy">
				<span class="ai-buddy-name">AI 친구</span>
				<span class="ai-buddy-name-postfix">와 여행은 어떠세요?</span>
				<span class="ai-buddy-name" style="margin-left: 4px" @click="startNewJourneyBtnClick">&rarr; 여행 떠나기 &larr;</span>
			</div>
		</div>

		<div class="line"></div>

		<section class="user-page-menu-list">
			<button class="user-page-menu-list-btn user-personality-test">
				<img src="/images/user/user_personality_test.svg" alt="user personality test icon">
				<span class="menu-title" @click="resetUserPersonalityTest">여행 성향 다시 검사하기</span>
			</button>
			<button class="user-page-menu-list-btn wish-list">
				<img src="/images/user/heart_icon.svg" alt="heart icon">
				<span class="menu-title">위시리스트</span>
			</button>
			<button class="user-page-menu-list-btn help-request">
				<img src="/images/user/help_request_icon.svg" alt="help request icon">
				<span class="menu-title">1:1 문의</span>
			</button>
			<button class="user-page-menu-list-btn faq">
				<img src="/images/user/FAQ_icon.svg" alt="FAQ icon">
				<span class="menu-title">FAQ</span>
			</button>
		</section>

		<div class="logout-btn-wrapper">
			<button v-if="userTokenFromLocalStorage.token" class="logout-btn" @click="logout">로그아웃</button>
		</div>
	</section>
</template>

<style scoped lang="css">
.user-my-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-my-page-edit-btn {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: end;
  margin-right: 20px;
}

.edit-btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #F2F4F5;
  border-radius: 16px;
  width: 45px;
  height: 18px;
  padding-left: 2px;
  padding-right: 4px;
}

.user-my-page-edit-icon {
  width: 10px;
  height: 10px;
}

.user-my-page-edit-title {
  font-weight: bold;
  font-size: 12px;
  color: #808991;
  text-decoration: none;
}

.user-infos {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-profile-image {
  width: 74px;
  height: 74px;
	border-radius: 50%;
}

.user-username {
  margin-top: 15px;
  font-weight: 600;
  color: #616B74;
  font-size: 16px;
}

.ongoing-journey-buddy {
  margin-top: 4px;
  display: flex;
  align-items: center;
}

.ai-buddy-name {
  background-color: #76A4FF;
  border-radius: 39px;
  text-align: center;
  color: white;
  font-weight: 600;
  font-size: 12px;
  padding: 3px 6px;
}

.ai-buddy-name-postfix {
  color: #616B74;
  font-size: 12px;
  margin-left: 4px;
}

.line {
  margin-top: 25px;
  margin-bottom: 20px;
  width: 100%;
  border-bottom: 5px solid #E9ECED;
}

.user-page-menu-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-page-menu-list img {
  padding-right: 12px;
}

.user-page-menu-list-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.menu-title {
  font-size: 18px;
  font-weight: 500;
  color: #636C73;
}

.logout-btn-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logout-btn {
  background-color: #F85D87;
  width: 86%;
  height: 48px;

  border: none;
  border-radius: 4px;
  text-align: center;
  color: white;
  font-weight: 600;
  font-size: 16px;
}

.logout-btn:active {
	background-color: #ff3167;
}
</style>
