<template>
<!--	<h1>{{ tourComponent.dist }}</h1>-->
	<div class="travel-item">
		<div class="travel-item-image">
			<div class="travel-item-view-cnt">
				<img src="/images/view_cnt_icon_main_layout.svg"/>
				<span class="view-cnt">000 명</span>
			</div>
			<div class="travel-item-like-btn">
				<img src="/images/like_icon_main_layout.svg">
			</div>
			<img v-if="tourComponent.firstimage" :src="`https://${tourComponent.firstimage.substr(7, tourComponent.firstimage.length)}`">
		</div>
		<div class="travel-item-description">
			<span>{{ tourComponent.addr1.split(' ')[0] }}</span>
			<span>·</span>
			<span>{{ (tourComponent.dist / 1000).toFixed(2) }} km</span>
		</div>
		<div class="travel-item-tour-title">
			<span>{{ tourComponent.title }}</span>
		</div>
	</div>
</template>

<script setup>
const { tourComponent } = defineProps(['tour-component'])

</script>

<style scoped lang="css">
.travel-item {
  margin: 0;
  padding: 0;
}

.travel-item-image {
  position: relative;
}

.travel-item-image > img {
	object-fit: cover;
	width: 100%;
	height: 140px; /* TODO : 생각이 안나서 일단은 px로 박음 */
}

.travel-item-view-cnt {
  position: absolute;
  top: 8px;
  left: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-size: 11px;
  padding: 3px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

.travel-item-like-btn {
  position: absolute;
  top: 6px;
  right: 6px;
}

.travel-item-description {
  margin-top: 8px;
  display: flex;
  width: 100%;
}

.travel-item-description span {
  font-size: 13px;
  font-weight: 600;
  color: #636C73;
  padding-right: 5px;
}

.travel-item-tour-title {
  margin-top: 5px;
  text-align: start;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
}
</style>
