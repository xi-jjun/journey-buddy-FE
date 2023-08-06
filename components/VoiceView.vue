<template>
  <section class="voice-view-component">
    <h3 class="voice-username">{{ voiceComponent.username }} 의 녹음</h3>
		<img src="/images/journey-history/voice_record_file_icon.svg" alt="voice recorded image" @click="$refs.voicePlay.play()"/>
    <audio ref="voicePlay" style="display: none;" controls :src="voiceComponent.file_url"></audio>
    <span class="voice-created-at">{{ voiceComponent.created_at }}</span>
  </section>
</template>

<script setup>
const { voiceComponent } = defineProps(['voice-component']);

</script>

<style scoped lang="css">
.voice-view-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4px 0;
  padding: 0 8px;
}

.voice-username {
  color: #262C31;
  font-weight: 600;
  font-size: 12px;
  padding: 4px 0;
}

.voice-created-at {
  font-size: 9px;
  font-weight: 600;
  color: #636C73;
  padding: 4px 0;
}
</style>
