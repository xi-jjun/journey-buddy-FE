import axios from "axios";

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
			{ id: 1, writer: writerType.ASSISTANT, name: 'AI name', content: '안녕? 나는 AI야', content_type: contentType.TEXT, created_at: '오전 10:23', lat: 37.591192508093414, lng: 127.02054866636433 },
			{ id: 2, writer: writerType.USER, name: 'User name', content: '안녕? 나는 김재준이야', content_type: contentType.TEXT, created_at: '오전 11:05', lat: 37.5809983254381, lng: 127.00782518409925 },
			{ id: 3, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
			{ id: 4, writer: writerType.USER, name: 'User name', content: 'https://cdn.drtour.com/MainNew/Recommend/2022/11/f276b510-fd96-41b2-8ea0-12a074177c81.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.02167546922172 },
			{ id: 5, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
			{ id: 6, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.576496070472174, lng: 127.01773165922074 },
			{ id: 7, writer: writerType.ASSISTANT, name: 'AI name', content: '퀘스트 들어간다 입 벌려라;', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113, is_quest: true },
			{ id: 8, writer: writerType.USER, name: 'User name', content: '퀘스트는 나중에 할거라서;; 여행지나 추천해 노예새끼야', content_type: contentType.TEXT, created_at: '오후 10:21', lat: 37.576496070472174, lng: 127.01773165922074 },
			{ id: 9, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
			{ id: 10, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.576496070472174, lng: 127.01773165922074 },
			{ id: 11, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
			{ id: 12, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.436496070472174, lng: 127.04173165922074 },
			{ id: 13, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
			{ id: 14, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.716496070472174, lng: 127.01973165922074 },
			{ id: 15, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
			{ id: 16, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.616496070472174, lng: 127.12473165922074 },
			{ id: 17, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
			{ id: 18, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.526496070472174, lng: 127.21373165922074 },
			{ id: 19, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
			{ id: 20, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.546496070472174, lng: 127.02273165922074 },
			{ id: 21, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
			{ id: 22, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.596496070472174, lng: 127.03773165922074 },
			{ id: 23, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
			{ id: 24, writer: writerType.USER, name: 'User name', content: 'https://www.hotelrestaurant.co.kr/data/photos/20220728/art_16575051213065_0f3832.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.02167546922172 },
			{ id: 25, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
			{ id: 26, writer: writerType.USER, name: 'User name', content: 'https://50plus.or.kr/upload/im/2019/01/d3c19df5-37b2-4eab-9a97-51423b7cb419.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.02167546922172 },
			{ id: 27, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
			{ id: 28, writer: writerType.USER, name: 'User name', content: 'https://cdn.drtour.com/MainNew/Recommend/2022/11/f276b510-fd96-41b2-8ea0-12a074177c81.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.01767546922172 },
			{ id: 29, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
			{ id: 30, writer: writerType.USER, name: 'User name', content: 'https://rda.go.kr/webzine/2022/07/images/sub1-2_img01.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.02267546922172 },
			{ id: 31, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
			{ id: 32, writer: writerType.USER, name: 'User name', content: 'https://cdn.drtour.com/MainNew/Recommend/2022/11/f276b510-fd96-41b2-8ea0-12a074177c81.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.56114715566437, lng: 127.04167546922172 },
			{ id: 33, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
			{ id: 34, writer: writerType.USER, name: 'User name', content: 'https://cdn.drtour.com/MainNew/Recommend/2022/11/f276b510-fd96-41b2-8ea0-12a074177c81.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.03467546922172 },
			{ id: 35, writer: writerType.ASSISTANT, name: 'AI name', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
			{ id: 36, writer: writerType.USER, name: 'User name', content: 'https://rda.go.kr/webzine/2022/07/images/sub1-2_img01.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.02167546922172 },
		];

		callback({ success: true, chats });
	},
	async getAllChats(journeyId, token) {
		const config = useRuntimeConfig();
		const searchParams = { journey_id: journeyId, };
		try {
			const { data } = await axios.get(`${config.public.API_BASE_URL}/api/v1/chats`, {
				params: searchParams,
				headers: { Authorization: token, 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' }
			});
			return data;
		} catch (error) {
			console.log("fail getAllChats by ", error);
			return error.response.data;
		}
	},
	async sendChat(requestData, token) {
		const config = useRuntimeConfig();
		try {
			const { data } = await axios.post(`${config.public.API_BASE_URL}/api/v1/chats`, requestData, {
				headers: { Authorization: token, 'Access-Control-Allow-Origin': '*', 'ngrok-skip-browser-warning': '123' }
			});
			return data;
		} catch (error) {
			console.log("fail sendChat by ", error);
			return error.response.data;
		}
	},
	// makeChatForShow(result) {
	// 	console.log("buddy name : ", result.buddy_name);
	// 	const buddyName = result.buddy_name ? result.buddy_name : '';
	// 	console.log("buddyName : ", buddyName);
	// 	return {
	// 		id: result.id,
	// 		writer: result.writer,
	// 		content: result.content,
	// 		name: buddyName,
	// 		content_type: 1, // 1: TEXT
	// 		created_at: result.created_at,
	// 		lat: result.latitude,
	// 		lng: result.longitude
	// 	}
	// },
}

export default chatApi;
