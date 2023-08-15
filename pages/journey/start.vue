<script setup>
import journeyApi from "~/service/journeyApi";
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";

const route = useRoute();
const userTokenFromLocalStorage = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY);

let buddyDetailInfo = ref(null);
const journeyId = route.query.journeyId;
const result = await journeyApi.getBuddyDetailByJourneyId(journeyId, userTokenFromLocalStorage);
if (result.code !== 200) {
	console.log("error response from getBuddyDetailByJourneyId");
} else {
	buddyDetailInfo = result.buddy;
}

const touchScreen = () => {
	navigateTo(`/chat?journey_id=${journeyId}`);
};

</script>

<template>
  <section class="journey-start-page" @click="touchScreen">
		<img src="/images/login/jb_logo_login_page.svg" alt="journey-buddy logo" class="journey-buddy-logo"/>

		<img v-if="buddyDetailInfo" :src="buddyDetailInfo['profile_image_url']" alt="ai buddy profile image" class="ai-buddy-profile-image"/>
		<img v-if="!buddyDetailInfo" src="/images/sign-up/profile_default_img_icon_sign_up_page.svg" alt="ai buddy profile image" class="ai-buddy-profile-image"/>

    <span v-if="buddyDetailInfo" class="start-journey">{{ buddyDetailInfo['display_name'] }}와 여행을 시작합니다!</span>
    <span v-if="!buddyDetailInfo" class="start-journey">AI와 여행을 시작합니다!</span>
    <span class="have-great-time">즐거운 여행 되세요!</span>
  </section>
</template>

<style scoped lang="css">
.journey-start-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.journey-buddy-logo {
  margin-top: 22vh;
}

.ai-buddy-profile-image {
  margin-top: 5vh;
  border-radius: 50%;
  width: 125px;
  height: 125px;
}

.start-journey {
  margin-top: 3vh;
  color: #262C31;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  word-break: keep-all;
  padding: 0 20vw;
}

.have-great-time {
  margin-top: 2vh;
  font-weight: 500;
  font-size: 15px;
  color: #B8BFC4;
}

</style>
