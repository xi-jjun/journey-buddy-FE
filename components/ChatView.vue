<template>
  <div v-if="chatComponent.writer === 1" class="chatting"  :id="`buddy_chat_id_${chatComponent.id}`" tabindex="0">
		<img src="/images/chat/default_buddy_profile_image_in_chat_page.png">
		<div class="chat-info">
			<span class="ai-buddy-name">{{ chatComponent.name }}</span>
			<div v-if="chatComponent.content_type === 1 && !chatComponent.is_quest" class="chat-info-content">
				{{ chatComponent.content }}
			</div>
			<div v-if="chatComponent.content_type === 1 && chatComponent.is_quest" class="chat-info-content quest-chat-info">
				{{ chatComponent.content }}
			</div>
		</div>
		<span class="chat-send-datetime align-right-datetime">{{ chatComponent.created_at }}</span>
  </div>
	<div v-if="chatComponent.writer === 2" class="chatting row-reverse" :id="`user_chat_id_${chatComponent.id}`" tabindex="0">
		<div class="chat-info">
			<div v-if="chatComponent.content_type === 1 && !chatComponent.is_quest" class="chat-info-content user-chat-info-content">
				{{ chatComponent.content }}
			</div>
			<div v-if="chatComponent.content_type === 1 && chatComponent.is_quest" class="chat-info-content user-chat-info-content">
				{{ chatComponent.content }}
			</div>
			<div v-if="chatComponent.content_type === 2" class="user-chat-info-image-content-wrapper">
				<img :src="chatComponent.content" alt="user chat image" class="user-chat-info-image-content">
			</div>
			<div v-if="chatComponent.content_type === 3" class="">
				<audio controls :src="chatComponent.content">
				</audio>
			</div>
		</div>
		<span class="chat-send-datetime align-right-datetime">{{ chatComponent.created_at }}</span>
	</div>
</template>

<script setup>
const { chatComponent } = defineProps(['chat-component']);

</script>

<style scoped lang="css">
.chatting {
	display: flex;
	align-items: flex-end;
	margin-bottom: 25px;
	margin-left: 10px;
	margin-right: 10px;
}

.row-reverse {
	flex-direction: row-reverse;
}

.chat-info {
	display: flex;
	flex-direction: column;
}

.ai-buddy-name {
	margin-bottom: 5px;
	font-size: 13px;
	font-weight: 600;
	color: #76A4FF;
}

.chat-info-content {
	border: 1px solid #547CF1;
	border-radius: 48px;
	padding: 8px 16px;
	white-space: pre-wrap;
	font-size: 14px;
	word-break: break-all;
}

.user-chat-info-content {
	background-color: #76A4FF;
	color: white;
	border: none;
}

.user-chat-info-image-content-wrapper {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.user-chat-info-image-content-wrapper img {
	min-width: 180px;
	max-width: 220px;
	border-radius: 12px;
}

.quest-chat-info {
	border: 1px solid orangered;
	background-color: #FFBEBE;
	color: white;
	font-weight: bold;
}

.chat-send-datetime {
	padding: 0 4px;
	font-size: 9px;
	font-weight: 600;
	color: #858585;
}

textarea {
	width: 100%;
	height: 40px;
	box-sizing: border-box;
	border: solid 2px #C0C0C0;
	border-radius: 5px;
	font-size: 16px;
	resize: none;
}

textarea:focus {
	outline: none;
}
</style>
