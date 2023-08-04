<template>
  <div v-show="chatComponent.writer === 1" class="chatting">
		<img src="/images/chat/default_buddy_profile_image_in_chat_page.png">
		<div class="chat-info">
			<span class="ai-buddy-name">{{ chatComponent.name }}</span>
			<div class="chat-info-content">
				{{ chatComponent.content }}
			</div>
		</div>
		<span class="chat-send-datetime align-right-datetime">{{ chatComponent.send_at }}</span>
  </div>

	<div v-show="chatComponent.writer === 2" class="chatting row-reverse">
		<div class="chat-info">
			<div class="chat-info-content user-chat-info-content">
				{{ chatComponent.content }}
			</div>
		</div>
		<span class="chat-send-datetime align-right-datetime">{{ chatComponent.send_at }}</span>
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
	max-width: 75%; /* 각 휴대폰 화면마다 채팅크기를 다르게 보이게하기 위해 추가 */
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
	padding: 12px 20px;
	white-space: pre;
	font-size: 14px;
	word-break: break-all;
}

.user-chat-info-content {
	background-color: #76A4FF;
	color: white;
	border: none;
}

.chat-send-datetime {
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
