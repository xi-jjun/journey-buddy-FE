<template>
	<section class="journey-history-detail-page">
		<BackNavbarView :navbar-title="``">

		</BackNavbarView>

		<Swiper class="journey-history-detail-images-swiper">
			<SwiperSlide v-for="journeyImage in journeyImageList">
				<img :src="journeyImage.file_url" alt="journey image" class="journey-slide-image">
			</SwiperSlide>
		</Swiper>

		<div class="journey-detail-infos">
			<span class="journey-detail-info-subtitle">{{ journeyDetailInfo.subtitle }}</span>
			<span class="journey-detail-info-title">{{ journeyDetailInfo.title }}</span>
		</div>

		<div class="journey-detail-info-address-name-wrapper">
			<div class="journey-detail-info-address-name">
				<img src="/images/journey-history/location_icon.svg" alt="location icon">
				{{ journeyDetailInfo.address_name }}
			</div>
		</div>

		<div class="journey-detail-summary-info">
			<div class="total-chat-cnt-wrapper">
				<span class="total-chat-cnt-title">총 대화 개수</span>
				<div class="total-chat-cnt-value">
					<span class="total-chat-cnt">{{ journeyDetailInfo.total_chat_cnt }}</span>
					<span class="total-chat-cnt-unit"> 개</span>
				</div>
			</div>

			<div class="line"></div>

			<div class="total-journey-time-wrapper">
				<span class="total-journey-time-title">소요 시간</span>
				<div class="total-journey-time-value">
					<span class="total-journey-time">{{ journeyDetailInfo.total_journey_time }}</span>
					<span class="total-journey-time-unit"> 분</span>
				</div>
			</div>

			<div class="line"></div>

			<div class="total-distance-wrapper">
				<span class="total-distance-title">총 길이</span>
				<div class="total-distance-value">
					<span class="total-distance">{{ journeyDetailInfo.total_distance }}</span>
					<span class="total-distance-unit"> m</span>
				</div>
			</div>
		</div>

		<KakaoMapView ref="kakaoMapRef" :mapOptions="kakaoMapOptions" :chatList="chatList">

		</KakaoMapView>

		<section class="chat-text-list-area">
			<ChatView v-for="chat in chatList" :chat-component="chat">
			</ChatView>
		</section>

		<section class="journey-history-detail-voices">
			<h3>녹음</h3>
			<div class="journey-history-detail-voices-wrapper">
				<VoiceView :voice-component="voice" v-for="voice in journeyVoiceList">

				</VoiceView>
			</div>
		</section>
	</section>

</template>

<script setup>

import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css';
import chatApi from "~/service/chatApi";
import journeyApi from "~/service/journeyApi";
import ChatView from "~/components/ChatView.vue";

// KAKAO MAP
let chatList = [];
let journeyDetailInfo = {};
let journeyFileList = []; // 여행의 모든 파일 리스트
let journeyImageList = []; // 여행의 모든 파일 중 이미지 리스트
let journeyVoiceList = []; // 여행의 모든 파일 중 음성파일 리스트
chatApi.all((response) => {
	chatList = response.chats;
});

journeyApi.getJourneyDetailById(response => {
	journeyDetailInfo = response.journey;
});

journeyApi.getJourneyFiles(response => {
	journeyImageList = response.journeyFiles.filter(journeyFile => {
		return journeyFile.content_type === 2;
	});
	journeyFileList = response.journeyFiles;
});

// TODO : journeyAPI 가 아니라 모두 chat api 에서 가져오도록 수정 필요 (어차피 정보는 다 여기있어서..)
chatApi.all(response => {
	response.chats.forEach(chatData => {
		if (chatData.content_type === 2) {
			journeyImageList.push({
				file_url: chatData.content,
				username: chatData.name,
				content_type: chatData.content_type,
				created_at: '7월 31일 오후 1:20'
			});
		} else if (chatData.content_type === 3) {
			journeyVoiceList.push({
				file_url: chatData.content,
				username: chatData.name,
				content_type: chatData.content_type,
				created_at: '7월 31일 오후 1:20'
			});
		}
	});
});

const kakaoMapOptions = {
	center: { lat: chatList[0].lat, lng: chatList[0].lng },
	level: 7
};

</script>

<style scoped lang="css">
.journey-history-detail-page {
  //display: flex;
  //flex-direction: column;
  align-items: center;
}

.journey-history-detail-images-swiper {
  width: 100%;
}

.journey-slide-image {
  object-fit: cover;
  width: 100%;
  height: 32vh;
}

.journey-detail-infos {
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.journey-detail-info-subtitle {
  margin: 4px 16px;
  font-weight: 500;
  font-size: 14px;
  color: #808991;
}

.journey-detail-info-title {
  margin: 4px 16px;
  font-weight: bold;
  font-size: 26px;
}

.journey-detail-info-address-name-wrapper {
	margin-top: 4px;
	width: 100%;
	display: flex;
	justify-content: flex-start;
}

.journey-detail-info-address-name {
  margin-left: 16px;

  font-size: 13px;
  font-weight: 600;
  color: #636C73;
  padding: 2px 8px;
  border: 1px solid #E6E8EB;
  border-radius: 16px;

  display: flex;
  align-items: center;
}

.journey-detail-summary-info {
	margin: 12px 12px;
	border: 1px solid #F2F4F5;
	border-radius: 2px;
	padding: 12px 20px;

	display: grid;
	grid-column-gap: 12px;
	grid-template-columns: 2fr 0.01fr 2fr 0.01fr 2fr;
}

.total-chat-cnt-wrapper, .total-journey-time-wrapper, .total-distance-wrapper {
  text-align: center;
}

.line {
  border-right: 1px solid #E6E8EB;
}

.total-chat-cnt-title, .total-journey-time-title, .total-distance-title {
  font-size: 12px;
  font-weight: 500;
  color: #808991;
}

.total-chat-cnt, .total-journey-time, .total-distance {
  font-weight: bold;
  font-size: 16px;
  color: #262C31;
}

.total-chat-cnt-unit, .total-journey-time-unit, .total-distance-unit {
  color: #B8BFC4;
  font-size: 12px;
}

.chat-text-list-area {
	margin: 0 12px 40px;
	height: 250px;
	border: 1px solid black;
	overflow-y: scroll;
}

.journey-history-detail-voices {
	margin: 10px 12px;
}

.journey-history-detail-voices-wrapper {
	display: flex;
	align-items: center;
	overflow-x: scroll;
	white-space: nowrap
}

.journey-history-detail-voices > h3 {
	color: #262C31;
	font-weight: bold;
	font-size: 18px;
	margin-bottom: 4px;
}
</style>
