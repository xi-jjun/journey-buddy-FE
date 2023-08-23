<script setup>
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";

let userTokenFromLocalStorage = reactive({ token: '' });
onMounted(async () => {
	userTokenFromLocalStorage.token = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY); // user token
});

const logout = () => {
	nuxtStorage.localStorage.removeItem(constant.LOCAL_STORAGE_USER_TOKEN_KEY);
	userTokenFromLocalStorage.token = undefined;
	window.location.reload();
};

</script>

<template>
	<section class="wrapper">
		<section class="menu-view-section">
			<div class="close-btn-wrapper">
				<button class="close-btn" @click="$emit('closeBtnClick')">&times;</button>
			</div>
			<h1 class="home" @click="navigateTo('/')">홈</h1>
			<h1 class="service-introduction">서비스 소개</h1>
			<h1 class="my-page" @click="navigateTo('/user')">마이페이지</h1>
			<h1 v-if="userTokenFromLocalStorage.token" class="logout" @click="logout">로그아웃</h1>
			<h1 v-if="!userTokenFromLocalStorage.token" class="login" @click="navigateTo('/login')">로그인</h1>

			<div class="search-section">
				<span class="search-box-label">여행 검색</span>
				<div class="search-box-wrapper">
					<div class="search-box">어디로 떠나고 싶으신가요?</div>
					<img src="/images/search_icon.svg" alt="search icon"/>
				</div>
			</div>

			<div class="menu-internal-border"></div>

			<div class="service-detail-introduction">
				<div class="service-detail-introduction-script">
					<span class="service-introduction-title">서비스 소개</span>
					<h1 class="service-introduction-subtitle">져니버디, 더 알고싶다면?</h1>
				</div>
				<img src="/images/menu_internal_bottom_side_pic.jpg" alt="picture"/>
			</div>
		</section>
	</section>
</template>

<style scoped lang="css">
.wrapper {
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;

  display: flex;
  justify-content: right;
}

.menu-view-section {
  background-color: white;
  width: 84vw;

  display: flex;
  flex-direction: column;
  position: relative;
}

.close-btn-wrapper {
  display: flex;
  flex-direction: row-reverse;
  padding: 16px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 48px;
  font-weight: 150;
}

.home, .service-introduction, .my-page, .login, .logout {
  font-size: 22px;
  font-weight: bold;
  padding: 18px 24px;
}

.search-section {
  position: absolute;
  bottom: 160px;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  padding: 12px 24px;
}

.search-box-label {
  color: #76A4FF;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
}

.search-box-wrapper {
  border: solid #E6E8EB 1px;
  border-radius: 48px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 48px;

  color: #262C31;
  font-size: 15px;
  font-weight: 600;
}

.search-box {
  padding-left: 20px;
}

.search-box-wrapper > img {
  background-color: #76A4FF;
  border-radius: 50%;
  padding: 4px;
}

.menu-internal-border {
  position: absolute;
  bottom: 140px;
  left: 0;
  right: 0;
  border-top: solid 8px #F2F4F5;
}

.service-detail-introduction {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  align-items: center;
  padding: 24px;

  height: 91px;
}

.service-detail-introduction > img {
  height: 91px;
  width: 100px;
}

.service-detail-introduction-script {
  display: flex;
  flex-direction: column;
}

.service-introduction-title {
  color: #76A4FF;
  font-size: 16px;
  font-weight: 600;
  padding: 6px 0;
}

.service-introduction-subtitle {
  color: #262c31;
  font-size: 18px;
  font-weight: bold;
  word-break: keep-all;
}

</style>
