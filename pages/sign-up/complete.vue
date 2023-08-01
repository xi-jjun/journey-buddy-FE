<template>
	<section class="sign-up-complete-page">
		<img src="/images/login/jb_logo_login_page.svg">

		<div class="sign-up-congratulatory-message">
			<h1>가입을 축하합니다!</h1>
			<span>
				나의 여행친구 져니버디,<br>
				져니버디와 함께 여행해요!
			</span>
		</div>
	</section>

	<button class="sign-up-complete-page-start-btn">시작하기</button>
</template>

<script>

export default {
	data() {
		return {}
	},
}
</script>

<style scoped lang="css">
.sign-up-complete-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 7rem;
}

.sign-up-congratulatory-message {
  margin-top: 6rem;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.sign-up-congratulatory-message > h2 {
  font-size: 28px;
  font-weight: bold;
}

.sign-up-congratulatory-message > span {
  margin-top: 20px;

  text-align: center;
  color: #B8BFC4;
  font-size: 15px;
  font-weight: 500;
}

.sign-up-complete-page-start-btn {
  position: absolute;
  height: 48px;
  bottom: 20px;
  left: 20px;
  right: 20px;

  background-color: #76A4FF;
  border-style: none;
  border-radius: 4px;

  font-weight: 600;
  font-size: 16px;
  color: white;
}
</style>
