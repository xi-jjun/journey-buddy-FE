<script setup>
import tourApi from "~/service/tourApi";
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/css';

const route = useRoute();
const contentId = route.query['contentId'];

const kakaoMap = reactive({ options: {} });
const tourDetail = reactive({ info: {}, images: [], location: { lat: 0, lng: 0 } });

const result = await tourApi.getTourDetailInfo(contentId);
if (result.code === 200) {
	tourDetail.info = result['tour_detail'];
	tourDetail.images = [
		tourDetail.info['firstimage'],
		tourDetail.info['firstimage2'],
	];
	tourDetail.location['lat'] = tourDetail.info['mapy'];
	tourDetail.location['lng'] = tourDetail.info['mapx'];

	kakaoMap.options = {
		center: { lat: tourDetail.location['lat'], lng: tourDetail.location['lng'] },
		level: 8
	};
} else {
	console.log("error occurred by getTourDetailInfo");
}
</script>

<template>
  <section class="tour-detail-view-section">
    <BackNavbarView :navbar-title="``">

    </BackNavbarView>

    <Swiper class="tour-detail-images-swiper">
      <SwiperSlide v-for="tourImg in tourDetail.images">
				<img v-if="tourImg" :src="`https://${tourImg.substr(7, tourImg.length)}`" alt="tour image" class="tour-detail-slide-image"/>
				<img v-if="!tourImg" src="/images/jb_logo_main_layout.svg" alt="tour image" class="tour-detail-slide-image"/>
      </SwiperSlide>
    </Swiper>

		<div class="tour-detail-infos">
			<span class="tour-detail-info-title">{{ tourDetail.info['title'] }}</span>
			<img src="/images/tours/heart.svg" alt="heart image"/>
		</div>

		<div class="tour-detail-info-address-name-wrapper">
			<div class="tour-detail-info-address-name">
				<img src="/images/journey-history/location_icon.svg" alt="location icon">
				{{ tourDetail.info['addr1'] }}
			</div>
		</div>

		<div class="tour-detail-overview" >
			<div v-html="tourDetail.info['overview']"></div>
		</div>

		<KakaoMapView ref="kakaoMapRef" :mapOptions="kakaoMap.options"
									:chatList="[{
										latitude: tourDetail.location['lat'],
										longitude: tourDetail.location['lng'],
										content_type: 0,
										from: 'tour_detail',
									}]">

		</KakaoMapView>
  </section>
</template>

<style scoped lang="css">
.tour-detail-images-swiper {
	width: 100%;
}

.tour-detail-slide-image {
	object-fit: cover;
	width: 100%;
	height: 32vh;
}

.tour-detail-infos {
	width: 100%;
	margin-top: 20px;
	display: flex;
	flex-direction: column;

	position: relative;
}

.tour-detail-infos > img {
	width: 24px;
	height: 24px;

	position: absolute;
	right: 20px;
	top: 10px;
}

.tour-detail-info-title {
	margin: 4px 16px;
	font-weight: bold;
	font-size: 26px;
}

.tour-detail-info-address-name-wrapper {
	margin-top: 4px;
	width: 100%;
	display: flex;
	justify-content: flex-start;
}

.tour-detail-info-address-name {
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

.tour-detail-overview {
	color: #636C73;
	font-weight: 500;
	font-size: 15px;

	padding: 20px 16px;
	line-height: 170%;
}
</style>
