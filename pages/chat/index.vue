<script setup>
import ChatView from "~/components/ChatView.vue";
import chatApi from "~/service/chatApi";
import tourApi from "~/service/tourApi";
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";
import axios from "axios";
import journeyApi from "~/service/journeyApi";

let chatContentType = 1; // 1: text, 2: image, 3: voice
let canUse = true; // true: 사용가능, false: 사용불가

const today = new Date();
const displayToday = today.toLocaleDateString("ko-KR");

const chatReactive = reactive({ list: [] })
const journeyInfoReactive = reactive({ title: [] })

const route = useRoute();
let userTokenFromLocalStorage;
if (nuxtStorage.localStorage) {
	userTokenFromLocalStorage = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY); // user token
}

onMounted(async () => {
	if (!userTokenFromLocalStorage) {
		navigateTo('/login');
		return;
	}
	// journey title
	const journeyResult = await journeyApi.getCurrentUserJourney(userTokenFromLocalStorage);
	journeyInfoReactive.title = journeyResult['journey']['title'];

	// chat list
	const result = await chatApi.getAllChats(route.query['journeyId'], userTokenFromLocalStorage);
	if (result.code === 200) {
		chatReactive.list = result.chats;
	} else {
		console.log("메세지를 가져오는 것에 실패했습니다.");
	}
});

onUpdated(async () => {
	// 채팅을 불러오면, 새롭게 다시 맨 아래로 스크롤을 자동 이동 시킨다.
	document.getElementById("chat-conversation").scrollTop = document.getElementById("chat-conversation").scrollHeight;
});

// TODO : 사용자의 현재 진행중인 퀘스트 가져오기
const nowQuest = {
	existed: true,
	statue: 1,
	title: '현재 받은 퀘스트가 없습니다.'
}

const sendChatBtnClick = async () => {
	if (!canUse) return;
	canUse = false;

	const waitingView = document.getElementById("chat-waiting");
	waitingView.className = '';

	const location = await tourApi.getCurrentLocation();
	let requestData = {
		chat_role: 2, // 1: chat GPT, 2: user
		content_type: chatContentType,
		content: ' ',
		lat: location.lat,
		lng: location.lng,
	};
	if (!location) {
		alert("위치동의를 해주셔야 이용을 하실 수 있습니다.");
		window.location.reload(true);
		return;
	}

	if (chatContentType === 1) {
		requestData['content'] = document.getElementById("chat-input-area").value;
		document.getElementById("chat-input-area").value = ''; // reset textarea
		const result = await chatApi.sendChat(requestData, userTokenFromLocalStorage);
		if (result.code !== 200) {
			alert("메세지 전송에 실패하였습니다.");
			return;
		}
		const newChatList = await chatApi.getAllChats(route.query['journeyId'], userTokenFromLocalStorage);
		chatReactive.list = newChatList.chats;
		await resetParams();
		return;
	}

	// image
	if (chatContentType === 2) {
		let formData = new FormData();
		formData.append('chat_role', requestData['chat_role']);
		formData.append('content_type', 2);
		formData.append('lat', requestData['lat']);
		formData.append('lng', requestData['lng']);

		const cameraImage = document.getElementById("cameraImage");
		formData.append('content', cameraImage.files[0]);
		await closeCameraImagePreview(); // 사진 전송했으면 미리보기 종료

		const result = await submitImageChat(formData);
		if (result.code !== 200) {
			alert("이미지 전송에 실패하였습니다.");
			return;
		}
		const newChatList = await chatApi.getAllChats(route.query['journeyId'], userTokenFromLocalStorage);
		chatReactive.list = newChatList.chats;
		await resetParams();
		return;
	}

	if (chatContentType === 3) {
		// TODO : voice
	}
};

const resetParams = async () => {
	chatContentType = 1;
	canUse = true;
	const waitingView = document.getElementById("chat-waiting");
	if (!waitingView.className) {
		waitingView.className = 'hidden';
	}
};

const submitImageChat = async (formData) => {
	const config = useRuntimeConfig();
	try {
		const { data } = await axios.post(`${config.public.API_BASE_URL}/api/v1/chats`, formData, {
			headers: {
				Authorization: userTokenFromLocalStorage,
				'Content-Type': 'multipart/form-data',
				'Access-Control-Allow-Origin': '*',
				'ngrok-skip-browser-warning': '123',
			}
		});
		return data;
	} catch (error) {
		const response = error.response;
		return response.data;
	}
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
		<header class="chat-page-navbar" @click="$router.go(-1);">
			<img src="/images/login/back_icon_navbar.svg" class="chat-page-back-btn">
		</header>

		<div class="journey-info">
			<span class="journey-info-title">{{ journeyInfoReactive.title }}</span>
			<span class="now-datetime">{{ displayToday }}</span>
		</div>

		<section id="chat-conversation" class="chat-text-list-area">
			<ChatView v-for="chat in chatReactive.list" :chat-component="chat">
			</ChatView>
			<div id="chat-waiting" class="hidden">&#183; &#183; &#183;</div>
		</section>

		<section class="chat-page-bottom-side">
			<div id="image-preview-section" class="hidden">
				<button class="image-preview-close-btn" @click="closeCameraImagePreview">&times;</button>
				<img id="fileUploadPreviewArea"/>
			</div>

			<div v-if="nowQuest.existed" class="ongoing-quest-notice">
				<div v-if="nowQuest.statue === 1" class="quest-status-waiting">대기 중</div>
				<div v-if="nowQuest.statue === 2" class="quest-status-ongoing">진행 중</div>
				<div v-if="nowQuest.statue === 3" class="quest-status-complete">완료</div>
				<span class="quest-title">{{ nowQuest.title }}</span>
			</div>

			<div class="chat-page-input-functions">
				<img src="/images/chat/camera.svg" @click="$refs.liveCamera.click()">
				<input type="file" ref="liveCamera" id="cameraImage" name="camera" capture="camera" accept="image/*" style="display: none;" @change="showCameraImagePreview" />
				<img src="/images/chat/live_record.svg">
				<textarea id="chat-input-area" maxlength="200" rows="1" spellcheck="false" @keydown="resizeTextAreaByHeight"></textarea>
				<button class="submit-btn" @click="sendChatBtnClick">
					<img src="/images/chat/send_btn.png" class="send-btn">
				</button>
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

#chat-waiting {
	font-size: 26px;
	text-align: center;
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

.quest-status-ongoing {
  background-color: red;
  font-weight: bold;
  font-size: 12px;
  color: white;
  padding: 4px 8px;
  text-align: center;
  border-radius: 5px;
  margin-right: 10px;
}

.quest-status-waiting {
	background-color: wheat;
	font-weight: bold;
	font-size: 12px;
	color: #778088;
	padding: 4px 8px;
	text-align: center;
	border-radius: 5px;
	margin-right: 10px;
}

.quest-status-complete {
	background-color: greenyellow;
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

.submit-btn {
	background: none;
	border: none;
}

.submit-btn:active {
	background-color: #778088;
	border-radius: 8px;
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
