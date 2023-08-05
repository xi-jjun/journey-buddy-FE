const contentType = {
	TEXT: 1, IMAGE: 2, VOICE: 3
}
const writerType = {
	ASSISTANT: 1, USER: 2, SYSTEM: 3
}

const chatApi = {
	all(callback) {
		// TODO : 나중에 기능 올릴 때 Chat 전체 목록을 내려줘야 한다. by journey_id, user_id
		const chats = [
			{ writer: writerType.ASSISTANT, name: 'AI name', content: '안녕? 나는 AI야', content_type: contentType.TEXT, created_at: new Date(), lat: 37.591192508093414, lng: 127.02054866636433 },
			{ writer: writerType.USER, name: 'User name', content: '안녕? 나는 김재준이야', content_type: contentType.TEXT, created_at: new Date(), lat: 37.5809983254381, lng: 127.00782518409925 },
			{ writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: new Date(), lat: 37.59383383861659, lng: 127.01467990148191 },
			{ writer: writerType.USER, name: 'User name', content: 'https://cdn.drtour.com/MainNew/Recommend/2022/11/f276b510-fd96-41b2-8ea0-12a074177c81.jpg', content_type: contentType.IMAGE, created_at: new Date(), lat: 37.58114715566437, lng: 127.02167546922172 },
			{ writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: new Date(), lat: 37.59093209014804, lng: 127.03068989208113 },
			{ writer: writerType.USER, name: 'User name', content: 'https://cdn.drtour.com/MainNew/Recommend/2022/11/f276b510-fd96-41b2-8ea0-12a074177c81.jpg', content_type: contentType.VOICE, created_at: new Date(), lat: 37.576496070472174, lng: 127.01773165922074 },
		];

		callback({ success: true, chats });
	},
}

export default chatApi;
