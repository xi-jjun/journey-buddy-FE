<script setup>
import ChatView from "~/components/ChatView.vue";
import chatApi from "~/service/chatApi";

let chatContentType = 1; // 1: text, 2: image, 3: voice

const today = new Date();
const displayToday = today.toLocaleDateString("ko-KR");

// TODO : 사용자의 현재 진행중인 퀘스트 가져오기
const nowQuest = {
	existed: true,
	title: '63빌딩 기어서 올라간 후 인증샷'
}

// TODO : 채팅 목록 API 요청하여 데이터 가져오기
let chats = [];
chatApi.all(response => {
	chats = response.chats;
});

const sendChatBtnClick = async () => {

};

const resizeTextAreaByHeight = async () => {
	const textArea = document.getElementById("chat-input-area");
	textArea.style.height = 'auto';
	textArea.style.height = `${textArea.scrollHeight}px`;
};

const showCameraImagePreview = async () => {
	const previewSection = document.getElementById("image-preview-section");
	const cameraImage = document.getElementById("cameraImage");
	const imageShowArea = document.getElementById("fileUploadPreviewArea");
	if (previewSection.className === 'hidden') {
		previewSection.className = '';
	}

	const image = cameraImage.files[0];

	const fileReader = new FileReader();
	fileReader.onload = (img) => {
		imageShowArea.src = img.target.result;
	};

	fileReader.readAsDataURL(image);
	chatContentType = 2; // image type
};

const closeCameraImagePreview = async () => {
	const previewSection = document.getElementById("image-preview-section");
	const cameraImage = document.getElementById("cameraImage");
	previewSection.className = 'hidden';
	cameraImage.value = ''; // input file reset
	chatContentType = 1; // reset content type
};

</script>

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
			<div id="image-preview-section" class="hidden">
				<button class="image-preview-close-btn" @click="closeCameraImagePreview">&times;</button>
				<img id="fileUploadPreviewArea"/>
			</div>

			<div v-if="nowQuest.existed" class="ongoing-quest-notice">
				<div class="quest-status">진행 중</div>
				<span class="quest-title">{{ nowQuest.title }}</span>
			</div>

			<div class="chat-page-input-functions">
				<img src="/images/chat/camera.svg" @click="$refs.liveCamera.click()">
				<input type="file" ref="liveCamera" id="cameraImage" name="camera" capture="camera" accept="image/*" style="display: none;" @change="showCameraImagePreview" />
				<img src="/images/chat/live_record.svg">
				<textarea id="chat-input-area" maxlength="200" rows="1" spellcheck="false" @keydown="resizeTextAreaByHeight"></textarea>
				<img src="/images/chat/send_btn.png" class="send-btn" @click="sendChatBtnClick">
			</div>
		</section>
	</section>
</template>

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
	background-color: white;
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
	min-height: 40px;
	max-height: 100px;
	box-sizing: border-box;
	border: solid 2px #C0C0C0;
	border-radius: 5px;
	font-size: 16px;
	resize: none;
	padding: 8px;
}

textarea:focus {
	outline: none;
}

#fileUploadPreviewArea {
	height: 25vh;
	width: 40vw;
	border-radius: 12px;
}

#image-preview-section {
	text-align: center;
	padding: 8px 0;
	width: 100%;

	position: relative;
}

#image-preview-section::before {
	position: absolute;
	content: "";

	text-align: center;
	width: 100%;
	left: 0;
	right: 0;
	bottom: 0;
	height: 28.5vh;
	background-color: black;
	opacity: 0.5;
	z-index: -1;
}

.image-preview-close-btn {
	position: absolute;
	display: flex;
	align-items: center;
	font-size: 35px;
	top: 0;
	right: 6vw;

	color: white;
	background: none;
	border: none;
}

.image-preview-close-btn:active {
	color: red;
	font-size: 45px;
}

.hidden {
	display: none;
}
</style>
