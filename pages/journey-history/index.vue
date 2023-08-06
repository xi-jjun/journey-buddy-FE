<template>
	<section class="journey-history-page">
		<BackNavbarView :navbar-title="`AI와 함께한 여행 기록`">

    </BackNavbarView>

    <section class="journey-history-list-wrapper">
			<JourneyCardView :journey-info-component="journeyComponent" v-for="journeyComponent in journeyList">

      </JourneyCardView>
    </section>
  </section>
</template>

<script setup>
import journeyApi from "~/service/journeyApi";

let journeyList = [];
journeyApi.all(response => {
	journeyList = response.journeyList;
});

</script>
<style scoped lang="css">
.journey-history-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.journey-history-list-wrapper {
  margin: 20px 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
  grid-row-gap: 12px;
  text-align: center;
  overflow-y: scroll;
}

</style>
