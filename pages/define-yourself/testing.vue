<template>
	<section class="personality-choices-page">
		<Swiper class="personality-choices-page-swiper">
			<SwiperSlide v-for="comp in personalityChoices">
				<PersonalitySwipeView :personality-choice-component="comp" @clickPersonalityId="savePersonalityIds">
				</PersonalitySwipeView>
			</SwiperSlide>
		</Swiper>
	</section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import PersonalitySwipeView from "~/components/PersonalitySwipeView.vue";
import userPersonalityTestingApi from "~/service/userPersonalityTestingApi";
import nuxtStorage from "nuxt-storage";
import constant from "~/service/constant";
import parseJwt from "~/service/jwtParser";

let userSelectedInfos = [];
const userTokenFromLocalStorage = nuxtStorage.localStorage.getData(constant.LOCAL_STORAGE_USER_TOKEN_KEY); // user token

// value => { selectedId: personalityChoiceComponent.choice1.id, name: personalityChoiceComponent.choice1.name }
async function savePersonalityIds(value) {
	userSelectedInfos.push(value);
	// 8개의 선택지를 모두 고르면, 서버로 성향정보를 보낸다.
	if (userSelectedInfos.length === 8) {
		const personalitiesString = userSelectedInfos.map((selectedPersonality) => selectedPersonality.selectedId).join(',');
		const userTokenPayload = parseJwt(userTokenFromLocalStorage); // user_id, email, expired_at
		const userId = userTokenPayload['user_id'];
		const result = await userPersonalityTestingApi.createUserPersonality(userId, personalitiesString, userTokenFromLocalStorage);
		if (result.code !== 200) {
			console.log("error response from savePersonalityIds");
			return;
		}

		navigateTo('/define-yourself/complete');
	}
	console.log("after arr : ", userSelectedInfos);
}

// 시간 없으니 아래 정보들은 하드코딩 박아서 진행
const personalityChoices = [
	{
		question: '더 끌리는 장소는?',
		choice1: {
			id: 1,
			name: '바다',
			image_url: '/images/personality-testing/ocean.svg'
		},
		choice2: {
			id: 2,
			name: '산',
			image_url: '/images/personality-testing/mountains.svg'
		}
	},
	{
		question: '더 선호하는 사람은?',
		choice1: {
			id: 3,
			name: "친한사람",
			image_url: '/images/personality-testing/friendly_buddy.svg'
		},
		choice2: {
			id: 4,
			name: '낯선사람',
			image_url: '/images/personality-testing/unknown_buddy.svg'
		}
	},
	{
		question: '선호하는 여행 스타일은?',
		choice1: {
			id: 5,
			name: '계획적',
			image_url: '/images/personality-testing/mbti_JJJ.svg'
		},
		choice2: {
			id: 6,
			name: '즉흥적',
			image_url: '/images/personality-testing/mbti_PPP.svg'
		}
	},
	{
		question: '선호하는 여행지는?',
		choice1: {
			id: 7,
			name: '관광지',
			image_url: '/images/personality-testing/tour_loc.svg'
		},
		choice2: {
			id: 8,
			name: '휴양지',
			image_url: '/images/personality-testing/vacation_loc.svg'
		}
	},
	{
		question: '선호하는 투어 스타일은?',
		choice1: {
			id: 9,
			name: '관광지 투어',
			image_url: '/images/personality-testing/tour_prefer.svg'
		},
		choice2: {
			id: 10,
			name: '맛집 투어',
			image_url: '/images/personality-testing/food_prefer.svg'
		}
	},
	{
		question: '선호하는 여행 장소는?',
		choice1: {
			id: 11,
			name: '붐비는 곳',
			image_url: '/images/personality-testing/crowd.svg'
		},
		choice2: {
			id: 12,
			name: '한산한 곳',
			image_url: '/images/personality-testing/hansan.svg'
		}
	},
	{
		question: '선호하는 여행 소비 스타일은?',
		choice1: {
			id: 13,
			name: '럭셔리',
			image_url: '/images/personality-testing/luxury.svg'
		},
		choice2: {
			id: 14,
			name: '가성비',
			image_url: '/images/personality-testing/gaSungBi.svg'
		}
	},
	{
		question: '선호하는 여행 추억은?',
		choice1: {
			id: 15,
			name: '기념품(사진)',
			image_url: '/images/personality-testing/souvenir.svg'
		},
		choice2: {
			id: 16,
			name: '경험(레저활동)',
			image_url: '/images/personality-testing/experience.svg'
		}
	}
];
</script>

<style scoped lang="css">

</style>
