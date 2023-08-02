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

import {Swiper, SwiperSlide} from "swiper/vue";
import "swiper/css";
import PersonalitySwipeView from "~/components/PersonalitySwipeView.vue";

let userSelectedInfos = [];

// value => { selectedId: personalityChoiceComponent.choice1.id, name: personalityChoiceComponent.choice1.name }
function savePersonalityIds(value) {
	userSelectedInfos.push(value);
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
			id: 5,
			name: '관광지 투어',
			image_url: '/images/personality-testing/tour_prefer.svg'
		},
		choice2: {
			id: 6,
			name: '맛집 투어',
			image_url: '/images/personality-testing/food_prefer.svg'
		}
	},
	{
		question: '선호하는 여행 장소는?',
		choice1: {
			id: 5,
			name: '붐비는 곳',
			image_url: '/images/personality-testing/crowd.svg'
		},
		choice2: {
			id: 6,
			name: '한산한 곳',
			image_url: '/images/personality-testing/hansan.svg'
		}
	},
	{
		question: '선호하는 여행 소비 스타일은?',
		choice1: {
			id: 5,
			name: '럭셔리',
			image_url: '/images/personality-testing/luxury.svg'
		},
		choice2: {
			id: 6,
			name: '가성비',
			image_url: '/images/personality-testing/gaSungBi.svg'
		}
	},
	{
		question: '선호하는 여행 추억은?',
		choice1: {
			id: 5,
			name: '기념품(사진)',
			image_url: '/images/personality-testing/souvenir.svg'
		},
		choice2: {
			id: 6,
			name: '경험(레저활동)',
			image_url: '/images/personality-testing/experience.svg'
		}
	}
];
</script>

<style scoped lang="css">

</style>
