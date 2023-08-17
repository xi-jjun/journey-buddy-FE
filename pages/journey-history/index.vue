<script setup>
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";
import userApi from "~/service/userApi";
import parseJwt from "~/service/jwtParser";

let userTokenFromLocalStorage;
if (nuxtStorage.localStorage) {
	userTokenFromLocalStorage = await nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY); // user token
}

const payload = parseJwt(userTokenFromLocalStorage);
const userId = payload['user_id'];
const result = await userApi.getUserJourneys(userId, userTokenFromLocalStorage);
const journeyList = result['journeys'];

</script>

<template>
	<section class="journey-history-page">
		<BackNavbarView :navbar-title="`AI와 함께한 여행 기록`">

    </BackNavbarView>

    <section class="journey-history-list-wrapper">
			<JourneyCardView :journey-info-component="journeyComponent" v-for="journeyComponent in journeyList">

      </JourneyCardView>
    </section>
  </section>
</template>

<style scoped lang="css">
.journey-history-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.journey-history-list-wrapper {
  margin: 20px 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 12px;
  text-align: center;
  overflow-y: scroll;
}

</style>
