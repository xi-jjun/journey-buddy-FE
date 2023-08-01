<template>
	<div id="MainLayout" class="main-layout">
		<div id="nav-bar" class="main-layout-upside">
			<img src="/images/jb_logo_main_layout.svg" class="upside-logo"/>
			<img src="/images/menu_btn_main_layout_upside.png" class="upside-menu-btn"/>
		</div>

		<div v-show="!userLogin" class="main-layout-anonymous-welcome">
			환영합니다,<br/>
			져니버디와 함께 새로운 여행을 시작해요!
		</div>
		<div v-show="userLogin" class="main-layout-user-welcome">
			<img :src="userProfileImage" class="user-profile-image" alt="user-profile-image">
			환영해요, <strong> {{ userNickname }}</strong>님!
		</div>

		<div v-show="!userLogin" class="main-layout-user-login-section">
			<span class="user-login-section-login">로그인</span>
			<span class="user-login-section-sign-up">회원가입</span>
		</div>
		<div v-show="userLogin" class="main-layout-current-journey">
			<span>진행중인 여행</span>
			<div class="current-journey-title">{{ userCurrentJourney }}</div>
		</div>

		<div class="main-layout-travel-with-journey-buddy">
			<span v-show="!userLogin" class="travel-with-journey-buddy-title">{{ buddyName }}와 함께한 여행</span>
			<span v-show="userLogin" class="travel-with-journey-buddy-title">AI와 함께한 여행기록</span>
			<span class="travel-with-journey-buddy-total-count">{{ totalJourneyCount }}</span>
			<img v-show="userLogin" src="/images/go_to_icon_main_layout.svg" alt="goto_journey"/>
		</div>

		<div class="main-layout-travel-start-btns">
			<div class="travel-start-btns-chat-with-ai">
				<button>AI와 대화하기</button>
				<img src="/images/ai_default_profile_main_layout.svg"/>
			</div>
			<button class="travel-start-btns-new-journey">새로운 여행 시작하기</button>
		</div>

		<div class="main-layout-banner">
			<img src="/images/welcome_banner_main_layout.png">
		</div>

		<div class="main-layout-recommend-by-bigdata">
			<img src="/images/tourApi_logo_main_layout.svg"/>
			<span>빅데이터 기반 AI추천 여행지</span>

			<div class="travel-tabs">
				<span class="selected-travel-tab">내 근처 여행</span>
				<span class="travel-tab">핫플 여행</span>
				<span class="travel-tab">맛집 여행</span>
			</div>

			<div class="travel-list-container">

				<div class="travel-item">
					<div class="travel-item-image">
						<div class="travel-item-view-cnt">
							<img src="/images/view_cnt_icon_main_layout.svg"/>
							<span class="view-cnt">000 명</span>
						</div>
						<div class="travel-item-like-btn">
							<img src="/images/like_icon_main_layout.svg">
						</div>
						<img src="/images/test/test_pic1.png">
					</div>
					<div class="travel-item-description">
						<span>지역이름</span>
						<span>·</span>
						<span>N km</span>
					</div>
					<div class="travel-item-tour-title">
						<span>투어명 : 봄내음과 함께하는 제주</span>
					</div>
				</div>

				<div class="travel-item">
					<div class="travel-item-image">
						<div class="travel-item-view-cnt">
							<img src="/images/view_cnt_icon_main_layout.svg"/>
							<span class="view-cnt">000 명</span>
						</div>
						<div class="travel-item-like-btn">
							<img src="/images/like_icon_main_layout.svg">
						</div>
						<img src="/images/test/test_pic1.png">
					</div>
					<div class="travel-item-description">
						<span>지역이름</span>
						<span>·</span>
						<span>N km</span>
					</div>
					<div class="travel-item-tour-title">
						<span>투어명 : 봄내음과 함께하는 제주</span>
					</div>
				</div>

				<div class="travel-item">
					<div class="travel-item-image">
						<div class="travel-item-view-cnt">
							<img src="/images/view_cnt_icon_main_layout.svg"/>
							<span class="view-cnt">000 명</span>
						</div>
						<div class="travel-item-like-btn">
							<img src="/images/like_icon_main_layout.svg">
						</div>
						<img src="/images/test/test_pic1.png">
					</div>
					<div class="travel-item-description">
						<span>지역이름</span>
						<span>·</span>
						<span>N km</span>
					</div>
					<div class="travel-item-tour-title">
						<span>투어명 : 봄내음과 함께하는 제주</span>
					</div>
				</div>

				<div class="travel-item">
					<div class="travel-item-image">
						<div class="travel-item-view-cnt">
							<img src="/images/view_cnt_icon_main_layout.svg"/>
							<span class="view-cnt">000 명</span>
						</div>
						<div class="travel-item-like-btn">
							<img src="/images/like_icon_main_layout.svg">
						</div>
						<img src="/images/test/test_pic1.png">
					</div>
					<div class="travel-item-description">
						<span>지역이름</span>
						<span>·</span>
						<span>N km</span>
					</div>
					<div class="travel-item-tour-title">
						<span>투어명 : 봄내음과 함께하는 제주</span>
					</div>
				</div>

				<div class="travel-item">
					<div class="travel-item-image">
						<div class="travel-item-view-cnt">
							<img src="/images/view_cnt_icon_main_layout.svg"/>
							<span class="view-cnt">000 명</span>
						</div>
						<div class="travel-item-like-btn">
							<img src="/images/like_icon_main_layout.svg">
						</div>
						<img src="/images/test/test_pic1.png">
					</div>
					<div class="travel-item-description">
						<span>지역이름</span>
						<span>·</span>
						<span>N km</span>
					</div>
					<div class="travel-item-tour-title">
						<span>투어명 : 봄내음과 함께하는 제주</span>
					</div>
				</div>

				<div class="travel-item">
					<div class="travel-item-image">
						<div class="travel-item-view-cnt">
							<img src="/images/view_cnt_icon_main_layout.svg"/>
							<span class="view-cnt">000 명</span>
						</div>
						<div class="travel-item-like-btn">
							<img src="/images/like_icon_main_layout.svg">
						</div>
						<img src="/images/test/test_pic1.png">
					</div>
					<div class="travel-item-description">
						<span>지역이름 </span>
						<span> · </span>
						<span> N km</span>
					</div>
					<div class="travel-item-tour-title">
						<span>투어명 : 봄내음과 함께하는 제주</span>
					</div>
				</div>
			</div>
		</div>


	</div>
</template>

<script>
export default {
	data() {
		return {
			userLogin: false,
			userCurrentJourney: '현재 진행중인 여행 타이틀',
			buddyName: '져니버디',
			totalJourneyCount: 0,
			userNickname: ' 재준킴',
			userProfileImage: 'https://item.kakaocdn.net/do/cedcbf84571e49821131986a98b6b70f8f324a0b9c48f77dbce3a43bd11ce785',
		}
	},
}
</script>

<style lang="css" scoped>
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css");

* {
  font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  margin: 0px;
  padding: 0px;
}

.main-layout-upside {
  margin-top: 20px;
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-layout-upside .upside-menu-btn {
  position: absolute;
  top: 18px;
  right: 15px;
  width: 24px;
  height: 24px;
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

.main-layout-user-login-section span {
  font-size: 28px;
  font-weight: bold;
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
  padding-left: 0px;
  padding-right: 0px;
  margin-left: 0px;
  margin-right: 0px;

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

.travel-item {
  margin: 0px;
  padding: 0px;
}

.travel-item-image {
  position: relative;
}

.travel-item-view-cnt {
  position: absolute;
  top: 8px;
  left: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-size: 11px;
  padding: 3px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

.travel-item-like-btn {
  position: absolute;
  top: 6px;
  right: 6px;
}

.travel-item-image > img {
  object-fit: cover;
  width: 100%;
}

.travel-item-description {
  margin-top: 8px;
  display: flex;
  width: 100%;
}

.travel-item-description span {
  font-size: 13px;
  font-weight: 600;
  color: #636C73;
  padding-right: 5px;
}

.travel-item-tour-title {
  margin-top: 5px;
  text-align: start;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
}
</style>
