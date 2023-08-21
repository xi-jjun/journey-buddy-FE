<script setup>
const route = useRoute();

const journeyHistoryBtnClick = () => {
	navigateTo(`/journey-history/detail?journeyId=${route.query['journeyId']}`)
};
</script>

<template>
	<section class="journey-end-page">
		<img src="/images/login/jb_logo_login_page.svg" alt="journey-buddy logo" class="journey-buddy-logo"/>

		<span class="end-journey">여행이 종료되었습니다.</span>
		<span class="had-great-time">져니버디와 함께한 추억을 기록하러 가요!</span>

	</section>

	<button class="form-title-submit" @click="journeyHistoryBtnClick">기록하기</button>
</template>

<style scoped lang="css">
.journey-end-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 4vw;

  position: relative;
}

.journey-buddy-logo {
  margin-top: 22vh;
}

.end-journey {
  margin-top: 10vh;
  color: #262C31;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  word-break: keep-all;
  padding: 0 2vw;
}

.had-great-time {
  margin-top: 2vh;
  font-weight: 500;
  font-size: 15px;
  color: #B8BFC4;
  text-align: center;
  word-break: keep-all;
  padding: 0 26vw;
}

.form-title-submit {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;

  height: 48px;
  border-style: none;
  border-radius: 4px;
  background-color: #76A4FF;

  color: white;
  font-size: 16px;
  font-weight: 600;
}

.form-title-submit:active {
  background-color: #528dff;
}
</style>
