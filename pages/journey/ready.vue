<script setup>
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";
import journeyApi from "~/service/journeyApi";

const route = useRoute();
const userTokenFromLocalStorage = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY);
onMounted(() => {
	if (!userTokenFromLocalStorage) {
		navigateTo('/login');
	}
});

const journeyTitleSubmit = async () => {
	const journeyId = route.query['journeyId'];
	const title = document.getElementById("journey-title").value;

	const result = await journeyApi.namingJourneyTitle(journeyId, title, userTokenFromLocalStorage);
	if (result.code !== 200) {
		console.log("error response from journeyTitleSubmit");
		return;
	}

	navigateTo(`/journey/start?journeyId=${journeyId}`);
};

</script>

<template>
	<BackNavbarView :navbar-title="``" @click="$router.go(-1)">

	</BackNavbarView>
	<section class="journey-create-page">

		<img src="/images/login/jb_logo_login_page.svg" alt="journey-buddy logo" class="journey-buddy-logo"/>

		<span class="journey-create-page-description">AI와 함께할 여행 타이틀을 지정해주세요!</span>

		<div class="form-title">
			<input id="journey-title" class="form-title-input" placeholder="여행 타이틀을 입력하세요."/>
		</div>

		<button class="form-title-submit" @click="journeyTitleSubmit">확인</button>
	</section>
</template>

<style scoped lang="css">
.journey-create-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
}

.journey-buddy-logo {
  margin-top: 10vh;
}

.journey-create-page-description {
  margin-top: 5vh;
  color: #262c31;
  font-size: 15px;
  font-weight: 500;
}

.form-title {
  margin-top: 1.5vh;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-title-input {
  height: 48px;
  border-radius: 4px;
  border-style: solid;
  border-color: #E6E8EB;

  margin-top: 8px;
  padding: 0 20px;
}

.form-title-input::placeholder {
  font-size: 15px;
  font-weight: 500;
  color: #CCD1D7;
}

.form-title-submit {
  margin-top: 10vh;
  height: 48px;
  border-style: none;
  border-radius: 4px;
  background-color: #76A4FF;

  color: white;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
}

.form-title-submit:active {
  background-color: #528dff;
}
</style>
