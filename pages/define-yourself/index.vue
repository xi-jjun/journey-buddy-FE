<script setup>
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";

const route = useRoute();
const userTokenFromLocalStorage = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY); // user token
onMounted(() => {
	if (!userTokenFromLocalStorage) {
		navigateTo('/login');
	}
});
</script>

<template>
	<section class="personality-choice-start-page">
    <div class="start-page-logo">
      <img src="/images/login/jb_logo_login_page.svg">
    </div>

		<div class="start-page-introduce">
      <h2>여행 성향</h2>
      <h2 v-if="route.query['from'] === 'reTest'">다시 알아보기</h2>
      <h2 v-else>알아보기</h2>
    </div>

		<div class="start-page-detail-introduce">
      <span>나의 성향과 맞는 AI 친구를 찾아보아요!</span>
    </div>

		<NuxtLink :to="`/define-yourself/testing?from=${route.query['from']}`" class="start-page-start-btn">
      시작하기
    </NuxtLink>
  </section>
</template>

<style scoped lang="css">
.personality-choice-start-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-left: 20px;
  padding-right: 20px;
}

.start-page-logo {
  margin-top: 8rem;
}

.start-page-introduce {
  margin-top: 4rem;
}

.start-page-introduce h2 {
  text-align: center;
  font-weight: bold;
  font-size: 28px;
}

.start-page-detail-introduce {
  margin-top: 1.5rem;
  font-weight: 500;
  color: #B8BFC4;
  font-size: 15px;
}

.start-page-start-btn {
  margin-top: 5rem;
  background-color: #76A4FF;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  color: white;
  width: 100%;
  height: 48px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.start-page-start-btn:active {
  background-color: #528dff;
}

</style>
