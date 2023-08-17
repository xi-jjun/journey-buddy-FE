<script setup>
const { journeyInfoComponent } = defineProps(['journey-info-component']);

function goToJourneyDetail(id) {
	navigateTo(`/journey-history/detail?journeyId=${id}`);
}
</script>

<template>
	<section class="journey-card-view-component">
		<div class="journey-card-view-image-wrapper" @click="goToJourneyDetail(journeyInfoComponent.id)">
			<img v-if="!journeyInfoComponent.image_url" src="/images/login/jb_logo_login_page.svg" alt="journey image">
			<img v-if="journeyInfoComponent.image_url" :src="journeyInfoComponent.image_url" alt="journey image">

			<div class="journey-card-view-description">
				<span class="status-ready" v-if="journeyInfoComponent.status === 1">준비중</span>
				<span class="status-traveling" v-if="journeyInfoComponent.status === 2">여행중</span>
				<span class="status-complete" v-if="journeyInfoComponent.status === 3">여행끝</span>
				<span class="description-title">{{ journeyInfoComponent.title }}</span>
				<span class="description-created-at">{{ journeyInfoComponent.created_at }}</span>
			</div>
		</div>
	</section>
</template>

<style scoped lang="css">
.journey-card-view-component {
	width: 100%;
	display: flex;
}

.journey-card-view-image-wrapper {
	width: 100%;
	display: flex;
	object-fit: cover;
	border-radius: 4px;

	position: relative;
}

.journey-card-view-description {
	display: flex;
	align-items: center;
	position: absolute;
	bottom: 0;
	left: 0;
}

.journey-card-view-image-wrapper > img {
	width: 100%;
	object-fit: cover;
	border-radius: 4px;
}

.journey-card-view-description {
	margin-top: 2px;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
}

.description-title {
	color: white;
	font-weight: bold;
	font-size: 16px;
	padding-top: 2px;
	padding-left: 4px;
	text-shadow: black 1px 1px 10px;
}

.description-created-at {
	color: white;
	font-weight: bold;
	font-size: 13px;
	padding: 4px;
	text-shadow: black 1px 1px 10px;
}

.status-ready {
	background-color: #F24147;
	font-size: 10px;
	color: white;
	padding: 2px 4px;
	margin-left: 4px;
	text-align: center;
	border-radius: 5px;
}

.status-traveling {
	background-color: #2FAAFF;
	font-size: 10px;
	color: white;
	padding: 2px 4px;
	margin-left: 4px;
	text-align: center;
	border-radius: 5px;
}

.status-complete {
	background-color: #94DD00;
	font-size: 10px;
	color: white;
	padding: 2px 4px;
	margin-left: 4px;
	text-align: center;
	border-radius: 5px;
}
</style>
