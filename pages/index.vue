<script setup>
import TourCardView from "~/components/TourCardView.vue";
import tourApi from "~/service/tourApi";
import nuxtStorage from 'nuxt-storage';
import constant from '~/service/constant';
import userApi from '~/service/userApi';
import parseJwt from "~/service/jwtParser";
import userPersonalityTestingApi from "~/service/userPersonalityTestingApi";
import journeyApi from "~/service/journeyApi";
import MenuView from "~/components/MenuView.vue";

let userCurrentJourney = '현재 진행중인 여행 타이틀';
let totalJourneyCount = 0;
const totalJourneyCntResult = await journeyApi.getTotalJourneyCount();
const totalJourneyCountFromAllUsers = totalJourneyCntResult['journey_count'];

let userDetailInfo = ref(null); // 사용자 정보 객체
const tourListByLocation = ref(null); // tour api 를 통한 관광지 객체 리스트
let userTokenFromLocalStorage;
if (nuxtStorage.localStorage) {
	userTokenFromLocalStorage = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY); // user token
	const payload = parseJwt(userTokenFromLocalStorage);
	const userTotalJourneyCntResult = await journeyApi.getTotalUserJourneyCount(payload['user_id']);
	totalJourneyCount = userTotalJourneyCntResult['journey_count'];

	// 메인 페이지에 현재 진행중인 여행 타이틀 노출 위해 추가
	const userTravelingJourneyResult = await journeyApi.getCurrentUserJourney(userTokenFromLocalStorage);
	if (userTravelingJourneyResult.code === 200) {
		userCurrentJourney = userTravelingJourneyResult['journey']['title'];
	}
}

onMounted(async () => {
	const coords = await tourApi.getCurrentLocation();
	const searchParams = {
		lat: coords.lat,
		lng: coords.lng,
		radius: 2000,
		tour_content_type_id: 12, // 관광타입(12:관광지, 14:문화시설, 15:축제공연행사, 25:여행코스, 28:레포츠, 32:숙박, 38:쇼핑, 39:음식점) ID
	};

	tourListByLocation.value = await tourApi.getTourListByLocation(searchParams);
});

if (userTokenFromLocalStorage) {
	const userTokenPayload = parseJwt(userTokenFromLocalStorage); // user_id, email, expired_at
	const userId = userTokenPayload['user_id'];
	const expiredAt = userTokenPayload['expired_at'];
	const now = new Date();
	if (now > expiredAt) {
		nuxtStorage.localStorage.removeItem(constant.LOCAL_STORAGE_USER_TOKEN_KEY);
		// 토큰이 만료됐다면, 로그인 화면으로 이동
		navigateTo('/login');
	}

	const result = await userApi.getUserDetail(userId, userTokenFromLocalStorage);

	if (result.code !== 200) {
		// 서버에서 값을 못 받아 왔다면, 로그인 화면으로 이동 (어차피 로그인된 상태라면, 메인 화면으로 다시 리다이렉트 됨)
		navigateTo('/login');
	}
	userDetailInfo = result.user;
}

const tabClickEvent = async (event) => {
	const defaultTabClass = ['travel-tab'];
	const tourTabIds = ['travel-tab-location', 'travel-tab-hot-place', 'travel-tab-restaurant'];
	tourTabIds.forEach(tourTabId => {
		const tourTab = document.getElementById(tourTabId);
		tourTab.classList = defaultTabClass;
	});

	const clickedTab = document.getElementById(event.target.id);
	clickedTab.classList = 'travel-tab selected-travel-tab'; // for css

	let tourContentTypeId;
	if (event.target.id === 'travel-tab-location') {
		tourContentTypeId = 12;
	} else if (event.target.id === 'travel-tab-hot-place') {
		tourContentTypeId = 15;
	} else if (event.target.id === 'travel-tab-restaurant') {
		tourContentTypeId = 39;
	}

	const coords = await tourApi.getCurrentLocation();
	const searchParams = {
		lat: coords.lat,
		lng: coords.lng,
		radius: 2000,
		tour_content_type_id: tourContentTypeId,
	};
	tourListByLocation.value = await tourApi.getTourListByLocation(searchParams);
};

// 주의) user/index.vue 에 같은 내용의 코드가 존재. 따라서 수정 시 둘 다 수정해줘야 함
const startNewJourneyBtnClick = async () => {
	// 토큰이 없으면 --> 로그인 화면으로 이동
	if (!userTokenFromLocalStorage) {
		navigateTo('/login');
		return;
	}
	// 토큰이 존재할 때,
	const userTokenPayload = parseJwt(userTokenFromLocalStorage); // user_id, email, expired_at
	const userId = userTokenPayload['user_id'];
	const result = await userPersonalityTestingApi.getUserPersonalityTestResult(userId, userTokenFromLocalStorage);
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

	const userOngoingJourneyResult = await journeyApi.getCurrentUserJourney(userTokenFromLocalStorage);
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

let showMenu = false;
const showMenuView = async () => {
	const sideBar = document.getElementById("side-bar-fixed-view");

	if (sideBar.style.right === "0px") {
		sideBar.animate([
			{ right: '0' },
			{ right: '-30vw' },
			{ right: '-60vw' },
			{ right: '-100vw' },
		], {
			duration: 300,
		});
	} else {
		sideBar.animate([
			{ right: '-100vw' },
			{ right: '-60vw' },
			{ right: '-30vw' },
			{ right: '0' },
		], {
			duration: 300,
		});
	}
	sideBar.style.right = sideBar.style.right === "0px" ? "-100vw" : "0";
};
</script>

<template>
	<div id="MainLayout" class="main-layout">
		<MenuView id="side-bar-fixed-view" @closeBtnClick="showMenuView">

		</MenuView>

		<div id="nav-bar" class="main-layout-upside">
			<img src="/images/jb_logo_main_layout.svg" class="upside-logo"/>
			<img src="/images/menu_btn_main_layout_upside.png" class="upside-menu-btn" @click="showMenuView"/>
		</div>

		<div v-if="!userTokenFromLocalStorage" class="main-layout-anonymous-welcome">
			환영합니다,<br/>
			져니버디와 함께 새로운 여행을 시작해요!
		</div>
		<div v-if="userTokenFromLocalStorage" class="main-layout-user-welcome">
			<img :src="userDetailInfo.profile_image_url" class="user-profile-image" alt="user-profile-image">
			환영해요, <strong> {{ userDetailInfo.nickname }}</strong>님!
		</div>

		<div v-if="!userTokenFromLocalStorage" class="main-layout-user-login-section">
			<NuxtLink to="/login" class="user-login-section-login">로그인</NuxtLink>
			<NuxtLink to="/sign-up" class="user-login-section-sign-up">회원가입</NuxtLink>
		</div>
		<div v-if="userTokenFromLocalStorage" class="main-layout-current-journey">
			<span>진행중인 여행</span>
			<div class="current-journey-title">{{ userCurrentJourney }}</div>
		</div>

		<div class="main-layout-travel-with-journey-buddy">
			<span v-if="!userTokenFromLocalStorage" class="travel-with-journey-buddy-title">져니버디와 함께한 여행</span> <!-- 로그인안된 유저들이 보는 문구 -->
			<span v-if="userTokenFromLocalStorage" class="travel-with-journey-buddy-title">AI와 함께한 여행기록</span> <!-- 로그인된 유저들이 보는 문구 -->
			<span v-if="userTokenFromLocalStorage && totalJourneyCount === 0" class="travel-with-journey-buddy-total-count">여행을 떠나요!</span> <!-- 로그인 된 상태 AND 여행 0회 : 여행을 떠나요 문구 출력 -->
			<span v-if="userTokenFromLocalStorage && totalJourneyCount !== 0" class="travel-with-journey-buddy-total-count">{{ totalJourneyCount }}</span> <!-- 로그인 된 상태 : 해당 유저의 여행 총 횟수 -->
			<span v-if="!userTokenFromLocalStorage" class="travel-with-journey-buddy-total-count">{{ totalJourneyCountFromAllUsers }}</span> <!-- 로그인 안된 상태 : 모든 유저의 여행 총 횟수 -->
			<img v-if="userTokenFromLocalStorage" src="/images/go_to_icon_main_layout.svg" alt="goto_journey" @click="navigateTo('/journey-history')"/>
		</div>

		<div class="main-layout-travel-start-btns">
			<div class="travel-start-btns-chat-with-ai">
				<button @click="startNewJourneyBtnClick">AI와 대화하기</button>
				<img src="/images/ai_default_profile_main_layout.svg"/>
			</div>
			<button class="travel-start-btns-new-journey" @click="startNewJourneyBtnClick">새로운 여행 시작하기</button>
		</div>

		<div class="main-layout-banner">
			<img src="/images/welcome_banner_main_layout.png">
		</div>

		<div class="main-layout-recommend-by-bigdata">
			<img src="/images/tourApi_logo_main_layout.svg"/>
			<span>빅데이터 기반 AI추천 여행지</span>

			<div class="travel-tabs">
				<span id="travel-tab-location" class="selected-travel-tab travel-tab" @click="tabClickEvent">내 근처 여행</span>
				<span id="travel-tab-hot-place" class="travel-tab" @click="tabClickEvent">핫플 여행</span>
				<span id="travel-tab-restaurant" class="travel-tab" @click="tabClickEvent">맛집 여행</span>
			</div>

			<div id="travel-list-by-location" class="travel-list-container">
				<TourCardView :tour-component="tourData" v-for="tourData in tourListByLocation">

				</TourCardView>
			</div>
		</div>
	</div>
</template>

<style lang="css" scoped>
.main-layout {
	position: relative;
}

.main-layout-upside {
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-layout-upside .upside-menu-btn {
  position: absolute;
  top: 28px;
  right: 15px;
  width: 24px;
  height: 24px;
}

.upside-logo {
	margin-top: 20px;
}

.upside-menu-btn:active {
	width: 28px;
	height: 28px;
	background-color: #778088;
	border-radius: 8px;
}

.main-layout-anonymous-welcome, .main-layout-user-welcome {
  margin-top: 25px;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
}

.main-layout-user-welcome {
  display: flex;
  align-items: center;
}

.main-layout-user-welcome img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: solid;
  margin-right: 10px;
}

.main-layout-user-login-section {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-login-section-login, .user-login-section-sign-up {
	font-size: 28px;
	font-weight: bold;
	text-decoration: none;
	color: #262C31;
}

.main-layout-current-journey {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
//justify-content: space-between; margin-top: 20px; margin-left: 20px; margin-right: 20px;
}

.main-layout-current-journey span {
  font-size: 14px;
  font-weight: 600;
  color: #636C73;
}

.current-journey-title {
  margin-top: 6px;
  font-size: 28px;
  font-weight: bold;
}

.main-layout-travel-with-journey-buddy {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  padding-left: 30px;
  padding-right: 30px;
  height: 80px;
  background-color: #B4D6FF;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.main-layout-travel-with-journey-buddy img {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
}

.travel-with-journey-buddy-title {
  font-size: 16px;
  color: white;
  font-weight: 600;
}

.travel-with-journey-buddy-total-count {
  font-size: 16px;
  color: #747474;
  font-weight: 600;
}

.main-layout-travel-start-btns {
  margin-top: 12px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.travel-start-btns-chat-with-ai {
  height: 54px;
  width: 10.5rem;
  background-color: #4B5BE8;
  border-radius: 40px;
  border: none;
  font-size: 15px;
  color: white;
  font-weight: 600;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.travel-start-btns-chat-with-ai button {
  background: none;
  border: none;
  font-size: 15px;
  color: white;
  font-weight: 600;
  margin-left: 23px;
}

.travel-start-btns-chat-with-ai img {
  position: absolute;
  top: 10px;
  right: 10px;
}

.travel-start-btns-new-journey {
  height: 54px;
  width: 10.5rem;
  padding: 20px;
  background-color: #76A4FF;
  border-radius: 40px;
  border: none;
  font-size: 15px;
  color: white;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
}

.travel-start-btns-new-journey:active {
	background-color: #528dff;
}

.main-layout-banner {
  width: 100%;
  margin-top: 30px;
  padding: 0px;
}

.main-layout-banner img {
  object-fit: fill;
  height: 114px;
  width: 100%;
}

.main-layout-recommend-by-bigdata {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.main-layout-recommend-by-bigdata > span {
  margin-top: 10px;
  font-size: 24px;
  font-weight: 900;
}

.travel-tabs {
  width: 20rem;
  height: 48px;
  border-radius: 38px;
  margin-top: 10px;
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #F2F4F5;
}

.travel-tab {
  font-size: 14px;
  font-weight: 600;
  color: #808991;
  padding-right: 8px;
  padding-left: 8px;
}

.selected-travel-tab {
  font-size: 14px;
  font-weight: 600;
  color: #76A4FF;
  background-color: white;
  height: 38px;
  border-radius: 25px;
  padding-right: 8px;
  padding-left: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.travel-list-container {
  margin-top: 12px;
  text-align: center;
  display: grid;
  justify-items: stretch;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 14px;
  grid-row-gap: 28px;
  padding-left: 15px;
  padding-right: 15px;
}

#side-bar-fixed-view {
	position: fixed;
	right: -100vw;
	top: 0;
	height: 100%;
	z-index: 1;
}

#side-bar-fixed-view:active {
	transform: translateX(0);
}
</style>
