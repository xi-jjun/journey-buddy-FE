<script setup>

import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css';
import ChatView from "~/components/ChatView.vue";
import userApi from "~/service/userApi";
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";
import parseJwt from "~/service/jwtParser";

const route = useRoute();
let userTokenFromLocalStorage;
if (nuxtStorage.localStorage) {
	userTokenFromLocalStorage = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY); // user token
}

let chatList;
let journeyDetailInfo;
let journeyImageList = []; // 여행의 모든 파일 중 이미지 리스트
let journeyVoiceList = []; // 여행의 모든 파일 중 음성파일 리스트

const payload = parseJwt(userTokenFromLocalStorage);
const result = await userApi.getUserJourneyDetailInfo(payload['user_id'], route.query['journeyId'], userTokenFromLocalStorage);

chatList = result['result']['chats'];
chatList.forEach((chatData) => {
	if (chatData.content_type === 2) {
		journeyImageList.push({
			file_url: chatData.content,
			username: chatData.name,
			content_type: chatData.content_type,
			created_at: chatData.created_at
		});
	} else if (chatData.content_type === 3) {
		journeyVoiceList.push({
			file_url: chatData.content,
			username: chatData.name,
			content_type: chatData.content_type,
			created_at: chatData.created_at
		});
	}
});

// KAKAO MAP
// 2번째 부터 유저가 채팅하기에 배열의 인덱스 1 조회
const initLat = chatList[1]['latitude'];
const initLng = chatList[1]['longitude'];
const kakaoMapOptions = {
	center: { lat: initLat, lng: initLng },
	level: 7
};

const journeyDetailInfoResult = result['result'];
journeyDetailInfo = {
	title: journeyDetailInfoResult['journey_title'],
	subtitle: journeyDetailInfoResult['journey_subtitle'],
	address_name: journeyDetailInfoResult['journey_location'],
	total_chat_cnt: journeyDetailInfoResult['total_chat_cnt'],
	total_journey_time: journeyDetailInfoResult['total_spend_time'],
	total_distance: journeyDetailInfoResult['total_distance'],
}

</script>

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

		<section class="journey-history-detail-images">
			<h3>사진</h3>
			<div class="journey-history-detail-images-wrapper">
				<ImageView :image-component="imageComponent" v-for="imageComponent in journeyImageList">

				</ImageView>
			</div>
		</section>
	</section>

</template>

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
	border: 1px solid #778088;
	border-radius: 4px;
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

.journey-history-detail-images {
	margin: 20px 12px;
}

.journey-history-detail-images-wrapper {

	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column-gap: 6px;
	grid-row-gap: 4px;
}

.journey-history-detail-images > h3 {
	color: #262C31;
	font-weight: bold;
	font-size: 18px;
}
</style>
