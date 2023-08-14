<script setup>
const buddyName = '킴AI';

</script>

<template>
  <section class="journey-start-page">
		<img src="/images/login/jb_logo_login_page.svg" alt="journey-buddy logo" class="journey-buddy-logo"/>

		<img src="/images/sign-up/profile_default_img_icon_sign_up_page.svg" alt="ai buddy profile image" class="ai-buddy-profile-image"/>

    <span class="start-journey">{{ buddyName }}와 여행을 시작합니다!</span>
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
