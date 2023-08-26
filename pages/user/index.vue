<script setup>
const userLogin = true;
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
	<section class="user-my-page">
		<BackNavbarView :navbar-title="`마이페이지`">

		</BackNavbarView>

		<div class="user-my-page-edit-btn">
			<div class="edit-btn-wrapper">
				<img src="/images/user/edit_icon.svg" alt="edit icon" class="user-my-page-edit-icon">
				<NuxtLink class="user-my-page-edit-title" :to="{ path: '/user/edit', query: { id: user.id } }">편집</NuxtLink>
			</div>
		</div>

		<div class="user-infos">
			<img src="/images/user/default_user_profile_image.svg" class="user-profile-image" alt="user profile image">
			<span class="user-username">{{ user.username }} 님</span>
			<div class="ongoing-journey-buddy">
				<span class="ai-buddy-name">{{ user.buddy.name }}</span>
				<span class="ai-buddy-name-postfix">과 여행 중</span>
			</div>
		</div>

		<div class="line"></div>

		<section class="user-page-menu-list">
			<button class="user-page-menu-list-btn user-personality-test">
				<img src="/images/user/user_personality_test.svg" alt="user personality test icon">
				<span class="menu-title">여행 성향 다시 검사하기</span>
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
			<button v-show="userLogin" class="logout-btn">로그아웃</button>
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
</style>
