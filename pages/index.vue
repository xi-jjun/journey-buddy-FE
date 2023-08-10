<template>
	<div id="MainLayout" class="main-layout">
		<div id="nav-bar" class="main-layout-upside">
			<img src="/images/jb_logo_main_layout.svg" class="upside-logo"/>
			<img src="/images/menu_btn_main_layout_upside.png" class="upside-menu-btn"/>
		</div>

		<div v-show="!userLogin" class="main-layout-anonymous-welcome">
			환영합니다,<br/>
			져니버디와 함께 새로운 여행을 시작해요!
		</div>
		<div v-show="userLogin" class="main-layout-user-welcome">
			<img :src="userProfileImage" class="user-profile-image" alt="user-profile-image">
			환영해요, <strong> {{ userNickname }}</strong>님!
		</div>

		<div v-show="!userLogin" class="main-layout-user-login-section">
			<span class="user-login-section-login">로그인</span>
			<span class="user-login-section-sign-up">회원가입</span>
		</div>
		<div v-show="userLogin" class="main-layout-current-journey">
			<span>진행중인 여행</span>
			<div class="current-journey-title">{{ userCurrentJourney }}</div>
		</div>

		<div class="main-layout-travel-with-journey-buddy">
			<span v-show="!userLogin" class="travel-with-journey-buddy-title">{{ buddyName }}와 함께한 여행</span>
			<span v-show="userLogin" class="travel-with-journey-buddy-title">AI와 함께한 여행기록</span>
			<span class="travel-with-journey-buddy-total-count">{{ totalJourneyCount }}</span>
			<img v-show="userLogin" src="/images/go_to_icon_main_layout.svg" alt="goto_journey"/>
		</div>

		<div class="main-layout-travel-start-btns">
			<div class="travel-start-btns-chat-with-ai">
				<button>AI와 대화하기</button>
				<img src="/images/ai_default_profile_main_layout.svg"/>
			</div>
			<button class="travel-start-btns-new-journey">새로운 여행 시작하기</button>
		</div>

		<div class="main-layout-banner">
			<img src="/images/welcome_banner_main_layout.png">
		</div>

		<div class="main-layout-recommend-by-bigdata">
			<img src="/images/tourApi_logo_main_layout.svg"/>
			<span>빅데이터 기반 AI추천 여행지</span>

			<div class="travel-tabs">
				<span class="selected-travel-tab">내 근처 여행</span>
				<span class="travel-tab">핫플 여행</span>
				<span class="travel-tab">맛집 여행</span>
			</div>

			<div class="travel-list-container">
				<TourCardView :tour-component="tourData" v-for="tourData in tourList">

				</TourCardView>
			</div>
		</div>
	</div>
</template>

<script setup>
// import { useGeolocation } from '@vueuse/core';
import TourCardView from "~/components/TourCardView.vue";

const userLogin = false;
const userCurrentJourney = '현재 진행중인 여행 타이틀';
const buddyName = '져니버디';
const totalJourneyCount = 0;
const userNickname = ' 재준킴';
const userProfileImage = 'https://item.kakaocdn.net/do/cedcbf84571e49821131986a98b6b70f8f324a0b9c48f77dbce3a43bd11ce785';

// const { coords } = useGeolocation();

const tourList = [
	{
		"addr1": "제주특별자치도 제주시 세화14길 3",
		"addr2": "",
		"areacode": "39",
		"booktour": "",
		"cat1": "A05",
		"cat2": "A0502",
		"cat3": "A05020900",
		"contentid": "2850913",
		"contenttypeid": "39",
		"createdtime": "20220907142125",
		"firstimage": "http://tong.visitkorea.or.kr/cms/resource/08/2850908_image2_1.jpg",
		"firstimage2": "http://tong.visitkorea.or.kr/cms/resource/08/2850908_image3_1.jpg",
		"cpyrhtDivCd": "Type3",
		"mapx": "126.8606961680",
		"mapy": "33.5205279098",
		"mlevel": "6",
		"modifiedtime": "20220907142137",
		"sigungucode": "4",
		"tel": "",
		"title": "가는곶 세화",
		"zipcode": "63361"
	},
	{
		"addr1": "제주특별자치도 제주시 복지로북길 4",
		"addr2": "1층",
		"areacode": "39",
		"booktour": "",
		"cat1": "A05",
		"cat2": "A0502",
		"cat3": "A05020100",
		"contentid": "2906155",
		"contenttypeid": "39",
		"createdtime": "20221111131820",
		"firstimage": "http://tong.visitkorea.or.kr/cms/resource/52/2906152_image2_1.jpg",
		"firstimage2": "http://tong.visitkorea.or.kr/cms/resource/52/2906152_image3_1.jpg",
		"cpyrhtDivCd": "Type3",
		"mapx": "126.5206569716",
		"mapy": "33.4888787305",
		"mlevel": "6",
		"modifiedtime": "20221111131843",
		"sigungucode": "4",
		"tel": "",
		"title": "가람",
		"zipcode": "63220"
	},
	{
		"addr1": "제주특별자치도 서귀포시 중문관광로 332",
		"addr2": "(대포동)",
		"areacode": "39",
		"booktour": "",
		"cat1": "A05",
		"cat2": "A0502",
		"cat3": "A05020100",
		"contentid": "2755053",
		"contenttypeid": "39",
		"createdtime": "20211008202759",
		"firstimage": "http://tong.visitkorea.or.kr/cms/resource/47/2755047_image2_1.jpg",
		"firstimage2": "http://tong.visitkorea.or.kr/cms/resource/47/2755047_image2_1.jpg",
		"cpyrhtDivCd": "Type3",
		"mapx": "126.4313173340",
		"mapy": "33.2496843087",
		"mlevel": "6",
		"modifiedtime": "20221229140705",
		"sigungucode": "3",
		"tel": "",
		"title": "가람돌솥밥",
		"zipcode": "63544"
	},
	{
		"addr1": "제주특별자치도 제주시 한경면 청수로 13-3",
		"addr2": "",
		"areacode": "39",
		"booktour": "0",
		"cat1": "A01",
		"cat2": "A0101",
		"cat3": "A01010400",
		"contentid": "1884202",
		"contenttypeid": "12",
		"createdtime": "20140113194252",
		"firstimage": "http://tong.visitkorea.or.kr/cms/resource/01/1884201_image2_1.jpg",
		"firstimage2": "http://tong.visitkorea.or.kr/cms/resource/01/1884201_image2_1.jpg",
		"cpyrhtDivCd": "Type3",
		"mapx": "126.2460707194",
		"mapy": "33.3209235283",
		"mlevel": "6",
		"modifiedtime": "20220923172132",
		"sigungucode": "4",
		"tel": "064-728-2742",
		"title": "가메창(암메)",
		"zipcode": "63006"
	},
	{
		"addr1": "제주특별자치도 서귀포시 칠십리로 191",
		"addr2": "",
		"areacode": "39",
		"booktour": "",
		"cat1": "A05",
		"cat2": "A0502",
		"cat3": "A05020100",
		"contentid": "2650410",
		"contenttypeid": "39",
		"createdtime": "20200326203220",
		"firstimage": "http://tong.visitkorea.or.kr/cms/resource/77/2666377_image2_1.jpg",
		"firstimage2": "http://tong.visitkorea.or.kr/cms/resource/77/2666377_image2_1.jpg",
		"cpyrhtDivCd": "Type3",
		"mapx": "126.5732606548",
		"mapy": "33.2465785631",
		"mlevel": "6",
		"modifiedtime": "20220411173612",
		"sigungucode": "3",
		"tel": "064-732-9886",
		"title": "가문잔치",
		"zipcode": "63597"
	},
	{
		"addr1": "제주특별자치도 제주시 연미길",
		"addr2": "(오라삼동)",
		"areacode": "39",
		"booktour": "0",
		"cat1": "A01",
		"cat2": "A0101",
		"cat3": "A01010400",
		"contentid": "1884521",
		"contenttypeid": "12",
		"createdtime": "20140114193335",
		"firstimage": "https://blog.kakaocdn.net/dn/bH6yWF/btqCBxVLQEJ/pJ4zl19crf5LcvDpRcSm3K/img.jpg",
		"firstimage2": "",
		"cpyrhtDivCd": "",
		"mapx": "126.5039945305",
		"mapy": "33.4889034625",
		"mlevel": "6",
		"modifiedtime": "20220811103831",
		"sigungucode": "4",
		"tel": "064-740-6001",
		"title": "가새기오름",
		"zipcode": "63145"
	},
	{
		"addr1": "제주특별자치도 서귀포시 성산읍 섭지코지로 10",
		"addr2": "",
		"areacode": "39",
		"booktour": "",
		"cat1": "A05",
		"cat2": "A0502",
		"cat3": "A05020100",
		"contentid": "2791481",
		"contenttypeid": "39",
		"createdtime": "20211210183846",
		"firstimage": "http://tong.visitkorea.or.kr/cms/resource/99/2800599_image2_1.jpg",
		"firstimage2": "http://tong.visitkorea.or.kr/cms/resource/99/2800599_image2_1.jpg",
		"cpyrhtDivCd": "Type3",
		"mapx": "126.9180903016",
		"mapy": "33.4386517763",
		"mlevel": "6",
		"modifiedtime": "20221208092536",
		"sigungucode": "3",
		"tel": "",
		"title": "가시아방국수",
		"zipcode": "63641"
	},
	{
		"addr1": "제주특별자치도 제주시 월랑로 36",
		"addr2": "",
		"areacode": "39",
		"booktour": "",
		"cat1": "A05",
		"cat2": "A0502",
		"cat3": "A05020100",
		"contentid": "2837181",
		"contenttypeid": "39",
		"createdtime": "20220816161254",
		"firstimage": "http://tong.visitkorea.or.kr/cms/resource/75/2837175_image2_1.jpg",
		"firstimage2": "http://tong.visitkorea.or.kr/cms/resource/75/2837175_image3_1.jpg",
		"cpyrhtDivCd": "Type3",
		"mapx": "126.4763302701",
		"mapy": "33.4888641378",
		"mlevel": "6",
		"modifiedtime": "20220916131956",
		"sigungucode": "4",
		"tel": "",
		"title": "가시어멍김밥",
		"zipcode": "63097"
	},
	{
		"addr1": "제주특별자치도 서귀포시 대정읍 하모이삼로21번길 1",
		"addr2": "",
		"areacode": "39",
		"booktour": "0",
		"cat1": "A01",
		"cat2": "A0101",
		"cat3": "A01010400",
		"contentid": "1885754",
		"contenttypeid": "12",
		"createdtime": "20140116185151",
		"firstimage": "https://www.jejunews.com/news/photo/202108/2184985_206815_2012.jpg",
		"firstimage2": "",
		"cpyrhtDivCd": "",
		"mapx": "126.2500169782",
		"mapy": "33.2236315617",
		"mlevel": "6",
		"modifiedtime": "20220826145654",
		"sigungucode": "3",
		"tel": "",
		"title": "가시오름",
		"zipcode": "63507"
	},
	{
		"addr1": "제주특별자치도 서귀포시 대정읍 가파로",
		"addr2": "",
		"areacode": "39",
		"booktour": "0",
		"cat1": "A01",
		"cat2": "A0101",
		"cat3": "A01011300",
		"contentid": "126446",
		"contenttypeid": "12",
		"createdtime": "20030909090000",
		"firstimage": "https://upload.wikimedia.org/wikipedia/commons/4/49/Gapado_scenery.JPG",
		"firstimage2": "",
		"cpyrhtDivCd": "",
		"mapx": "126.2735884192",
		"mapy": "33.1664326869",
		"mlevel": "6",
		"modifiedtime": "20230315143308",
		"sigungucode": "3",
		"tel": "",
		"title": "가파도",
		"zipcode": "63514"
	},
	{
		"addr1": "제주특별자치도 서귀포시 호근동 2112",
		"addr2": "(호근동)",
		"areacode": "39",
		"booktour": "0",
		"cat1": "A01",
		"cat2": "A0101",
		"cat3": "A01010400",
		"contentid": "1887368",
		"contenttypeid": "12",
		"createdtime": "20140121002153",
		"firstimage": "https://www.newsje.com/news/photo/201811/115533_125066_2444.jpg",
		"firstimage2": "",
		"cpyrhtDivCd": "",
		"mapx": "126.5269445463",
		"mapy": "33.2767800518",
		"mlevel": "6",
		"modifiedtime": "20220809133003",
		"sigungucode": "3",
		"tel": "",
		"title": "각시바우오름",
		"zipcode": "63575"
	},
	{
		"addr1": "제주특별자치도 서귀포시 성산읍 중산간동로",
		"addr2": "(신풍리)",
		"areacode": "39",
		"booktour": "0",
		"cat1": "A01",
		"cat2": "A0101",
		"cat3": "A01010500",
		"contentid": "1887381",
		"contenttypeid": "12",
		"createdtime": "20140121004604",
		"firstimage": "",
		"firstimage2": "",
		"cpyrhtDivCd": "",
		"mapx": "126.8115590479",
		"mapy": "33.3870224256",
		"mlevel": "6",
		"modifiedtime": "20230120155947",
		"sigungucode": "3",
		"tel": "",
		"title": "갈마못(갈뫼못)",
		"zipcode": "63635"
	},
	{
		"addr1": "제주특별자치도 서귀포시 사계남로216번길 24-61 갈중이",
		"addr2": "",
		"areacode": "39",
		"booktour": "0",
		"cat1": "A02",
		"cat2": "A0203",
		"cat3": "A02030200",
		"contentid": "635593",
		"contenttypeid": "12",
		"createdtime": "20081010200127",
		"firstimage": "",
		"firstimage2": "",
		"cpyrhtDivCd": "",
		"mapx": "126.3136584209",
		"mapy": "33.2351423980",
		"mlevel": "6",
		"modifiedtime": "20220613155349",
		"sigungucode": "3",
		"tel": "",
		"title": "갈중이(천연염색체험)",
		"zipcode": "63528"
	},
	{
		"addr1": "제주특별자치도 제주시 해맞이해안로 1296",
		"addr2": "",
		"areacode": "39",
		"booktour": "",
		"cat1": "A05",
		"cat2": "A0502",
		"cat3": "A05020100",
		"contentid": "2853435",
		"contenttypeid": "39",
		"createdtime": "20220914152956",
		"firstimage": "http://tong.visitkorea.or.kr/cms/resource/24/2853424_image2_1.jpg",
		"firstimage2": "http://tong.visitkorea.or.kr/cms/resource/24/2853424_image3_1.jpg",
		"cpyrhtDivCd": "Type3",
		"mapx": "126.8509745258",
		"mapy": "33.5319348245",
		"mlevel": "6",
		"modifiedtime": "20220914153035",
		"sigungucode": "4",
		"tel": "",
		"title": "갈치공장",
		"zipcode": "63360"
	}
];


// const state = reactive({ tourList: [] })

// watch(coords, async () => {
// 	if (state.tourList.length > 0) return;
//
// 	const currentLocation = toRaw(coords.value);
// 	const searchParams = {
// 		lat: currentLocation.latitude,
// 		lng: currentLocation.longitude,
// 		radius: 1000,
// 	};
// 	const config = useRuntimeConfig();
// 	const { data: _tourList } = await useFetch(
// 			`/api/v1/tour/list-by-geolocation?lat=${searchParams.lat}&lng=${searchParams.lng}&radius=${searchParams.radius}`,
// 			{
// 				baseURL: config.public.API_BASE_URL
// 			}
// 	);
//
// 	state.tourList = toRaw(_tourList.value)['tour_list'];
// });

</script>

<style lang="css" scoped>
.main-layout-upside {
  margin-top: 20px;
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-layout-upside .upside-menu-btn {
  position: absolute;
  top: 18px;
  right: 15px;
  width: 24px;
  height: 24px;
}

.main-layout-anonymous-welcome, .main-layout-user-welcome {
  margin-top: 25px;
  font-size: 18px;
  padding-left: 20px;
  padding-right: 20px;
}

.main-layout-user-welcome {
  display: flex;
  align-items: center;
}

.main-layout-user-welcome img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: solid;
  margin-right: 10px;
}

.main-layout-user-login-section {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.main-layout-user-login-section span {
  font-size: 28px;
  font-weight: bold;
}

.main-layout-current-journey {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
//justify-content: space-between; margin-top: 20px; margin-left: 20px; margin-right: 20px;
}

.main-layout-current-journey span {
  font-size: 14px;
  font-weight: 600;
  color: #636C73;
}

.current-journey-title {
  margin-top: 6px;
  font-size: 28px;
  font-weight: bold;
}

.main-layout-travel-with-journey-buddy {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  padding-left: 30px;
  padding-right: 30px;
  height: 80px;
  background-color: #B4D6FF;
  border-radius: 12px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.main-layout-travel-with-journey-buddy img {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
}

.travel-with-journey-buddy-title {
  font-size: 16px;
  color: white;
  font-weight: 600;
}

.travel-with-journey-buddy-total-count {
  font-size: 16px;
  color: #747474;
  font-weight: 600;
}

.main-layout-travel-start-btns {
  margin-top: 12px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.travel-start-btns-chat-with-ai {
  height: 54px;
  width: 10.5rem;
  background-color: #4B5BE8;
  border-radius: 40px;
  border: none;
  font-size: 15px;
  color: white;
  font-weight: 600;

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.travel-start-btns-chat-with-ai button {
  background: none;
  border: none;
  font-size: 15px;
  color: white;
  font-weight: 600;
  margin-left: 23px;
}

.travel-start-btns-chat-with-ai img {
  position: absolute;
  top: 10px;
  right: 10px;
}

.travel-start-btns-new-journey {
  height: 54px;
  width: 10.5rem;
  padding: 20px;
  background-color: #76A4FF;
  border-radius: 40px;
  border: none;
  font-size: 15px;
  color: white;
  font-weight: 600;

  display: flex;
  justify-content: center;
  align-items: center;
}

.main-layout-banner {
  width: 100%;
  margin-top: 30px;
  padding: 0px;
}

.main-layout-banner img {
  object-fit: fill;
  height: 114px;
  width: 100%;
}

.main-layout-recommend-by-bigdata {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.main-layout-recommend-by-bigdata > span {
  margin-top: 10px;
  font-size: 24px;
  font-weight: 900;
}

.travel-tabs {
  width: 20rem;
  height: 48px;
  border-radius: 38px;
  margin-top: 10px;
  padding-left: 0;
  padding-right: 0;
  margin-left: 0;
  margin-right: 0;

  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #F2F4F5;
}

.travel-tab {
  font-size: 14px;
  font-weight: 600;
  color: #808991;
  padding-right: 8px;
  padding-left: 8px;
}

.selected-travel-tab {
  font-size: 14px;
  font-weight: 600;
  color: #76A4FF;
  background-color: white;
  height: 38px;
  border-radius: 25px;
  padding-right: 8px;
  padding-left: 8px;

  display: flex;
  justify-content: center;
  align-items: center;
}

.travel-list-container {
  margin-top: 12px;
  text-align: center;
  display: grid;
  justify-items: stretch;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 14px;
  grid-row-gap: 28px;
  padding-left: 15px;
  padding-right: 15px;
}
</style>
