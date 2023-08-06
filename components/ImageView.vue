<template>
	<section class="image-view-component">
		<img :src="imageComponent.file_url" alt="journey image file" :id="`user_img_id_${imageComponent.id}`"/>
  </section>
</template>

<script setup>
const { imageComponent } = defineProps(['image-component']);

</script>

<style scoped lang="css">
.image-view-component {
	margin-top: 8px;
	display: flex;
	justify-content: center;
	width: 100%;
}
.image-view-component > img {
	width: 100%;
	object-fit: cover;
	border-radius: 8px;
}

</style>
