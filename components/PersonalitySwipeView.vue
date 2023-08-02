<template>
	<section class="partial-personality-choice-component">
		<div class="personality-component-logo">
			<img src="/images/personality-testing/jb_logo_personality_testing_page.svg">
		</div>

		<div class="personality-component-question">
			<span>다음 중</span>
			<h2>{{ personalityChoiceComponent.question }}</h2>
		</div>

		<div class="personality-component-choice">
			<div class="choice1" @click="$emit('clickPersonalityId', { selectedId: personalityChoiceComponent.choice1.id, name: personalityChoiceComponent.choice1.name })">
				<span>{{ personalityChoiceComponent.choice1.name }}</span>
				<img :src="personalityChoiceComponent.choice1.image_url" class="choice1-image">
			</div>
			<div class="choice2" @click="$emit('clickPersonalityId', { selectedId: personalityChoiceComponent.choice2.id, name: personalityChoiceComponent.choice2.name })">
				<span>{{ personalityChoiceComponent.choice2.name }}</span>
				<img :src="personalityChoiceComponent.choice2.image_url" class="choice2-image">
			</div>
		</div>
		
		<div class="personality-component-next-arrow">
			<img src="/images/personality-testing/next_arrow.svg">
		</div>
	</section>
</template>

<script setup>
const {personalityChoiceComponent} = defineProps(['personality-choice-component']);
</script>

<style scoped lang="css">
.partial-personality-choice-component {
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.personality-component-question {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.personality-component-question > span, .personality-component-question > h2 {
  font-size: 28px;
  font-weight: bold;
  color: #262C31;
}

.personality-component-question > h2 {
  margin-top: 0.5rem;
}

.personality-component-choice {
  margin-top: 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
}


.choice1 {
  width: 100%;
  border-radius: 31px;
  background-color: #F85D87;
  margin: 10px;
}

.choice2 {
  width: 100%;
  border-radius: 31px;
  background-color: #76A4FF;
  margin: 10px;
}

.choice1, .choice2 {
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  width: 160px;
  height: 174px;
}

.choice1 > span, .choice2 > span {
  margin-top: 18px;
  font-weight: 600;
  color: white;
  font-size: 20px;
}

.choice1-image, .choice2-image {
  position: absolute;
  bottom: 22px;
  left: 22px;
  width: 114px;
  height: 86px;
}

.personality-component-next-arrow {
	margin-top: 4rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 56px;
	height: 56px;
	border-radius: 50%;
	background-color: #1D364B;
}

</style>
