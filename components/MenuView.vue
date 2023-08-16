<script setup>
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";

const logout = () => {
	nuxtStorage.localStorage.removeItem(constant.LOCAL_STORAGE_USER_TOKEN_KEY);
	navigateTo('/');
};
</script>

<template>
  <section class="menu-view-section">
    <button class="close-btn" @click="$router.go(-1)">&times;</button>
    <h1 class="home">홈</h1>
    <h1 class="service-introduction">서비스 소개</h1>
    <h1 class="my-page">마이페이지</h1>
    <h1 class="logout" @click="logout">로그아웃</h1>
  </section>
</template>

<style scoped lang="css">
.menu-view-section {
  background-color: white;
  width: 80vw;
  padding: 40px 30px;

  display: flex;
  flex-direction: column;
}

.close-btn {
}
</style>
