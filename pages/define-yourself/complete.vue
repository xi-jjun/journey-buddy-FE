<script setup>
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";
import journeyApi from "~/service/journeyApi";

const userTokenFromLocalStorage = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY); // user token
onMounted(() => {
	if (!userTokenFromLocalStorage) {
		navigateTo('/login');
	}
});

const maleBuddyBtnClicked = async () => {
	console.log("maleBuddyBtnClicked")
	const result = await journeyApi.startJourney(1, userTokenFromLocalStorage);
	if (result.code !== 200) {
		console.log("error response from maleBuddyBtnClicked");
		return;
	}
	navigateTo(`/journey/ready?journeyId=${result.journey_id}`);
};

const womanBuddyBtnClicked = async () => {
	console.log("womanBuddyBtnClicked")
	const result = await journeyApi.startJourney(2, userTokenFromLocalStorage);
	if (result.code !== 200) {
		console.log("error response from womanBuddyBtnClicked");
		return;
	}
	navigateTo(`/journey/ready?journeyId=${result.journey_id}`);
};

</script>

<template>
  <section class="personality-testing-complete-page">
    <div class="testing-complete-page-logo">
      <img src="/images/login/jb_logo_login_page.svg">
    </div>

    <div class="testing-complete-page-completed">
      <img src="/images/personality-testing/left_cong.svg">
      <div class="completed-test-complete-text">
        <span>여행 성향</span>
        <span>검사완료</span>
      </div>
      <img src="/images/personality-testing/right_cong.svg">
    </div>

    <div class="testing-complete-page-choice-notice">
      <span>당신의 여행성향에 맞는 AI의 성별을 선택해주세요!</span>
    </div>

    <div class="testing-complete-page-gender-btns">
      <button type="button" class="man-buddy-btn" @click="maleBuddyBtnClicked">남성</button>
      <button type="button" class="woman-buddy-btn" @click="womanBuddyBtnClicked">여성</button>
    </div>
  </section>
</template>

<style scoped lang="css">
.personality-testing-complete-page {
  margin-top: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.testing-complete-page-completed {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.completed-test-complete-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 12px;
  margin-right: 12px;
  color: #262C31;
  font-weight: bold;
  font-size: 28px;
}

.testing-complete-page-choice-notice {
  margin-top: 1.5rem;
  font-weight: 500;
  font-size: 15px;
  color: #262C31;
}

.testing-complete-page-gender-btns {
  margin-top: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.man-buddy-btn, .woman-buddy-btn {
  border-radius: 27px;
  width: 154px;
  height: 48px;
  border-style: none;
  font-weight: 600;
  font-size: 16px;
  color: white;
  margin: 8px;
}

.man-buddy-btn {
  background-color: #76A4FF;
}

.man-buddy-btn:active {
  background-color: #4684ff;
}

.woman-buddy-btn {
  background-color: #F85D87;
}

.woman-buddy-btn:active {
  background-color: #ff3167;
}
</style>
