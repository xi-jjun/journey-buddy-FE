<template>
	<section class="chat-page">
		<header class="chat-page-navbar">
			<img src="/images/login/back_icon_navbar.svg" class="chat-page-back-btn">
		</header>

		<div class="journey-info">
			<span class="journey-info-title">나의 힐링을 위한 제주도</span>
			<span class="now-datetime">{{ displayToday }}</span>
		</div>

		<section class="chat-text-list-area">
			<ChatView v-for="chat in chats" :chat-component="chat">
			</ChatView>
		</section>

		<section class="chat-page-bottom-side">
			<div v-show="nowQuest.existed" class="ongoing-quest-notice">
				<div class="quest-status">진행 중</div>
				<span class="quest-title">{{ nowQuest.title }}</span>
			</div>

			<div class="chat-page-input-functions">
				<img src="/images/chat/camera.svg">
				<img src="/images/chat/live_record.svg">
				<textarea></textarea>
				<img src="/images/chat/send_btn.png" class="send-btn">
			</div>
		</section>
	</section>
</template>

<script setup>
import ChatView from "~/components/ChatView.vue";

const today = new Date();
const displayToday = today.toLocaleDateString("ko-KR");

// TODO : 사용자의 현재 진행중인 퀘스트 가져오기
const nowQuest = {
	existed: true,
	title: '63빌딩 기어서 올라간 후 인증샷'
}

// TODO : 채팅 목록 API 요청하여 데이터 가져오기
const chats = [
	{
		id: 1,
		content: '안녕 나는 로봇이야. 너를 제거할 예정이지\n1.hello\n2.world\n3.rrr            r',
		writer: 1,
		name: '존잘슬탄남(AI)',
		send_at: new Date().toLocaleDateString("ko-KR")
	},
	{
		id: 2,
		content: '할 수 있으면 해봐 쫄보련아',
		writer: 2,
		send_at: new Date().toLocaleDateString("ko-KR")
	},
	{
		id: 3,
		content: '허허허 이빨 재미나게 터네 후달리나봐',
		writer: 1,
		name: '존잘슬탄남(AI)',
		send_at: new Date().toLocaleDateString("ko-KR")
	},
	{
		id: 4,
		content: '후달달? 어이가 없네?',
		writer: 2,
		send_at: new Date().toLocaleDateString("ko-KR")
	},
	{
		id: 5,
		content: '채\n팅\n길\n이\n늘\n리\n기\n',
		writer: 1,
		name: '존잘슬탄남(AI)',
		send_at: new Date().toLocaleDateString("ko-KR")
	},
	{
		id: 6,
		content: '채\n팅\n길\n이\n늘\n리\n기\n',
		writer: 2,
		send_at: new Date().toLocaleDateString("ko-KR")
	},
	{
		id: 7,
		content: '안녕 나는 로봇이야. 너를 제거할 예정이지\n1.hello\n2.world\n3.rrr            r',
		writer: 2,
		send_at: new Date().toLocaleDateString("ko-KR")
	},
];

</script>

<style scoped lang="css">
.chat-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
}

.chat-page-navbar {
  position: fixed;
  top: 20px;
  left: 15px;
  z-index: 1;
}

.journey-info {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 40px;
  padding-top: 40px;
  padding-bottom: 5px;
  border-bottom: 1px solid #E6E8EB;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.journey-info > .journey-info-title {
  font-size: 16px;
  font-weight: 600;
  color: #262C31;
}

.journey-info > .now-datetime {
  font-size: 13px;
  font-weight: 600;
  color: #B8BFC4;
}

.chat-text-list-area {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 96px;
  overflow-y: scroll;
}

.chat-page-bottom-side {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.ongoing-quest-notice {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 6px;
  padding-bottom: 6px;
  border-top: 1px solid #D9D9D9;
  border-bottom: 1px solid #D9D9D9;
  width: 100%;
}

.quest-status {
  background-color: red;
  font-weight: bold;
  font-size: 12px;
  color: white;
  padding: 4px 8px;
  text-align: center;
  border-radius: 5px;
  margin-right: 10px;
}

.quest-title {
  font-size: 14px;
  font-weight: 600;
  color: #262C31;
}

.chat-page-input-functions {
	display: grid;
	align-items: center;
  justify-items: flex-end;
  grid-template-columns: 1.5fr 1.5fr 18fr 1fr;
  grid-column-gap: 15px;
	padding: 10px 30px;
}

.send-btn {
  width: 24px;
  height: 24px;
  background: none;
  border: none;
}

textarea {
	width: 100%;
	height: 40px;
	box-sizing: border-box;
	border: solid 2px #C0C0C0;
	border-radius: 5px;
	font-size: 16px;
	resize: none;
}

textarea:focus {
	outline: none;
}
</style>
