const contentType = {
	TEXT: 1, IMAGE: 2, VOICE: 3
}
const writerType = {
	ASSISTANT: 1, USER: 2, SYSTEM: 3
}
let chats = []
let totalChatsCnt = 0;

const chatApi = {
	all(callback) {
		// TODO : 나중에 기능 올릴 때 Chat 전체 목록을 내려줘야 한다. by journey_id, user_id
		// chats.push({ id: 1, writer: writerType.USER, name: '여행이 좋은 사람', content: '안녕?', content_type: contentType.TEXT, created_at: '오전 11:05', lat: 33.5282463, lng: 126.7702874 })
		// chats.push({ id: 2, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '안녕! 어떻게 지내? 여행 계획이나 다른 이야기가 있으면 언제든지 말해줘. 함께 대화하면서 즐거운 시간을 보내자!', content_type: contentType.TEXT, created_at: '오전 11:05' })
		// chats.push({ id: 3, writer: writerType.USER, name: '여행이 좋은 사람', content: '나는 오늘부터 여행을 가려구! 지금 제주도인데, 어디가 좋을까?', content_type: contentType.TEXT, created_at: '오전 11:08', lat: 33.5282463, lng: 126.7702874 })
		// chats.push({ id: 4, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '오, 지금 제주도에 있구나! 제주도는 정말 아름다운 곳이야. 여행을 시작하려는데 어디를 추천해줄까? 등산을 좋아한다고 했으니 한라산을 오르는 것을 추천해볼까? 한라산은 제주도의 대표적인 산으로, 멋진 경치와 자연을 즐길 수 있어. 산행을 즐기면서 여행의 첫날을 기분 좋게 시작할 수 있을 것 같아. 다른 관광지로는 성산일출봉, 용눈이오름, 우도, 협재해수욕장 등도 추천해! 어디를 가기로 결정했는지 알려줘, 함께 얘기하며 여행을 즐기자!', content_type: contentType.TEXT, created_at: '오전 11:08' })
		// chats.push({ id: 5, writer: writerType.USER, name: '여행이 좋은 사람', content: '저번에 성산일출봉 갔어서ㅠㅠ 우도는 어때? 우도 좋을 것 같은데', content_type: contentType.TEXT, created_at: '오전 11:10', lat: 33.528546354, lng: 126.7705874 })
		// chats.push({ id: 6, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '성산일출봉에 이미 갔다니 아쉽네! 그럼 우도는 좋은 선택일 거야. 우도는 제주도에서 섬으로 가는 작은 섬이고, 그곳에는 아름다운 해변, 청정한 바다, 그리고 독특한 자연 경관이 있어. 우도에서는 자전거를 대여해서 섬을 돌아다니는 것도 추천! 풍경을 감상하며 바다를 바라보고, 유명한 우도 맛집에서 맛있는 음식도 즐길 수 있어. 또한, 섬의 남쪽에 위치한 세연정도 함께 방문해봐. 우도에서 멋진 경치와 여유로운 시간을 보낼 수 있을 거야. 솔직히 제주도에는 너무 많은 곳이 있어서 고민이 될 수도 있어. 하지만 우도는 제주도 여행에서 놓쳐선 안 될 보석 같은 곳이라고 할 수 있어. 어때? 우도로 가보기로 결정했으면, 어떤 계획을 세우고 있는지 알려줘. 함께 얘기하면서 좋은 여행을 만들어보자!', content_type: contentType.TEXT, created_at: '오전 11:10' })
		// chats.push({ id: 7, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://ak-d.tripcdn.com/images/1i60f22158ewyhvptE933.jpg?proc=source/trip', content_type: contentType.IMAGE, created_at: '오후 1:43', lat: 33.5042977, lng: 126.954048 })
		// chats.push({ id: 8, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '이 사진 멋진걸? 좋은 추억으로 간직할 수 있도록 보관해둘게!', content_type: contentType.TEXT, created_at: '오후 1:44' })
		// chats.push({ id: 9, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '퀘스트 : 바닷가의 파도소리를 녹음해오세요!', content_type: contentType.TEXT, created_at: '오후 2:00', is_quest: true })
		// chats.push({ id: 10, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_sea.m4a', content_type: contentType.VOICE, created_at: '오후 2:27', lat: 33.5144245, lng: 126.9713025 })
		// chats.push({ id: 11, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '퀘스트 완료 : 바닷가의 파도소리를 녹음해오세요!', content_type: contentType.TEXT, created_at: '오후 2:28',is_quest: true })
		// chats.push({ id: 12, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://d2ur7st6jjikze.cloudfront.net/offer_photos/102130/556459_large_1613440428.jpg?1613440428', content_type: contentType.IMAGE, created_at: '오후 3:55', lat: 33.502746, lng: 126.96838 })
		// chats.push({ id: 13, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '이 사진 멋진걸? 좋은 추억으로 간직할 수 있도록 보관해둘게!', content_type: contentType.TEXT, created_at: '오후 3:56' })
		// chats.push({ id: 14, writer: writerType.USER, name: '여행이 좋은 사람', content: '우도 정말 재밌었다~! 내일은 어디갈까?', content_type: contentType.TEXT, created_at: '오후 7:49', lat: 33.5149322, lng: 126.90045 })
		// chats.push({ id: 15, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '재밌었다니 다행이야! 내일은 제주도의 서쪽을 가는 것을 추천해. 제주도의 서쪽에는 애월이라는 곳이 있는데, 거기에는 예쁜 카페들이 많아. 여행 중 예쁜 카페에서 잠시 휴식을 취하는 것도 좋지 않을까?', content_type: contentType.TEXT, created_at: '오후 7:49' })
		// chats.push({ id: 16, writer: writerType.USER, name: '여행이 좋은 사람', content: '추천 고마우니깐 내가 오늘 찍었던 사진 몇개 보여줄게!', content_type: contentType.TEXT, created_at: '오후 7:50', lat: 33.5149322, lng: 126.90045 })
		// chats.push({ id: 17, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg', content_type: contentType.IMAGE, created_at: '오후 7:51', lat: 33.5149322, lng: 126.90045 })
		// chats.push({ id: 18, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://cdn.traveltimes.co.kr/news/photo/202207/402243_23181_5717.jpg', content_type: contentType.IMAGE, created_at: '오후 7:51', lat: 33.5151322, lng: 126.90045 })
		// chats.push({ id: 19, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://thumb.mt.co.kr/06/2022/07/2022071213595260752_1.jpg/dims/resize/1200/crop/1200x630!/optimize/', content_type: contentType.IMAGE, created_at: '오후 7:52', lat: 33.5155322, lng: 126.90045 })
		// chats.push({ id: 20, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/56f92153-a78e-4257-a0fc-a08b664c2d44.jpeg', content_type: contentType.IMAGE, created_at: '오후 7:52', lat: 33.5159322, lng: 126.90045 })
		// chats.push({ id: 21, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '이 사진 멋진걸? 좋은 추억으로 간직할 수 있도록 보관해둘게!', content_type: contentType.TEXT, created_at: '오후 7:52' })
		chats = [
			{ id: 1, writer: writerType.USER, name: '여행이 좋은 사람', content: '안녕?', content_type: contentType.TEXT, created_at: '오전 11:05', lat: 33.5282463, lng: 126.7702874 },
			{ id: 2, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '안녕! 어떻게 지내? 여행 계획이나 다른 이야기가 있으면 언제든지 말해줘. 함께 대화하면서 즐거운 시간을 보내자!', content_type: contentType.TEXT, created_at: '오전 11:05' },
			{ id: 3, writer: writerType.USER, name: '여행이 좋은 사람', content: '나는 오늘부터 여행을 가려구! 지금 제주도인데, 어디가 좋을까?', content_type: contentType.TEXT, created_at: '오전 11:08', lat: 33.5282463, lng: 126.7702874 },
			{ id: 4, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '오, 지금 제주도에 있구나! 제주도는 정말 아름다운 곳이야. 여행을 시작하려는데 어디를 추천해줄까? 등산을 좋아한다고 했으니 한라산을 오르는 것을 추천해볼까? 한라산은 제주도의 대표적인 산으로, 멋진 경치와 자연을 즐길 수 있어. 산행을 즐기면서 여행의 첫날을 기분 좋게 시작할 수 있을 것 같아. 다른 관광지로는 성산일출봉, 용눈이오름, 우도, 협재해수욕장 등도 추천해! 어디를 가기로 결정했는지 알려줘, 함께 얘기하며 여행을 즐기자!', content_type: contentType.TEXT, created_at: '오전 11:08' },
			{ id: 5, writer: writerType.USER, name: '여행이 좋은 사람', content: '저번에 성산일출봉 갔어서ㅠㅠ 우도는 어때? 우도 좋을 것 같은데', content_type: contentType.TEXT, created_at: '오전 11:10', lat: 33.528546354, lng: 126.7705874 },
			{ id: 6, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '성산일출봉에 이미 갔다니 아쉽네! 그럼 우도는 좋은 선택일 거야. 우도는 제주도에서 섬으로 가는 작은 섬이고, 그곳에는 아름다운 해변, 청정한 바다, 그리고 독특한 자연 경관이 있어. 우도에서는 자전거를 대여해서 섬을 돌아다니는 것도 추천! 풍경을 감상하며 바다를 바라보고, 유명한 우도 맛집에서 맛있는 음식도 즐길 수 있어. 또한, 섬의 남쪽에 위치한 세연정도 함께 방문해봐. 우도에서 멋진 경치와 여유로운 시간을 보낼 수 있을 거야. 솔직히 제주도에는 너무 많은 곳이 있어서 고민이 될 수도 있어. 하지만 우도는 제주도 여행에서 놓쳐선 안 될 보석 같은 곳이라고 할 수 있어. 어때? 우도로 가보기로 결정했으면, 어떤 계획을 세우고 있는지 알려줘. 함께 얘기하면서 좋은 여행을 만들어보자!', content_type: contentType.TEXT, created_at: '오전 11:10' },
			{ id: 7, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://ak-d.tripcdn.com/images/1i60f22158ewyhvptE933.jpg?proc=source/trip', content_type: contentType.IMAGE, created_at: '오후 1:43', lat: 33.5042977, lng: 126.954048 },
			{ id: 8, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '이 사진 멋진걸? 좋은 추억으로 간직할 수 있도록 보관해둘게!', content_type: contentType.TEXT, created_at: '오후 1:44' },
			{ id: 9, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '퀘스트 : 바닷가의 파도소리를 녹음해오세요!', content_type: contentType.TEXT, created_at: '오후 2:00', is_quest: true },
			{ id: 10, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_sea.m4a', content_type: contentType.VOICE, created_at: '오후 2:27', lat: 33.5144245, lng: 126.9713025 },
			{ id: 11, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '퀘스트 완료 : 바닷가의 파도소리를 녹음해오세요!', content_type: contentType.TEXT, created_at: '오후 2:28',is_quest: true },
			{ id: 12, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://d2ur7st6jjikze.cloudfront.net/offer_photos/102130/556459_large_1613440428.jpg?1613440428', content_type: contentType.IMAGE, created_at: '오후 3:55', lat: 33.502746, lng: 126.96838 },
			{ id: 13, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '이 사진 멋진걸? 좋은 추억으로 간직할 수 있도록 보관해둘게!', content_type: contentType.TEXT, created_at: '오후 3:56' },
			{ id: 14, writer: writerType.USER, name: '여행이 좋은 사람', content: '우도 정말 재밌었다~! 내일은 어디갈까?', content_type: contentType.TEXT, created_at: '오후 7:49', lat: 33.5149322, lng: 126.90045 },
			{ id: 15, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '재밌었다니 다행이야! 내일은 제주도의 서쪽을 가는 것을 추천해. 제주도의 서쪽에는 애월이라는 곳이 있는데, 거기에는 예쁜 카페들이 많아. 여행 중 예쁜 카페에서 잠시 휴식을 취하는 것도 좋지 않을까?', content_type: contentType.TEXT, created_at: '오후 7:49' },
			{ id: 16, writer: writerType.USER, name: '여행이 좋은 사람', content: '추천 고마우니깐 내가 오늘 찍었던 사진 몇개 보여줄게!', content_type: contentType.TEXT, created_at: '오후 7:50', lat: 33.5149322, lng: 126.90045 },
			{ id: 17, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://www.agoda.com/wp-content/uploads/2020/04/Jeju-Island-hotels-things-to-do-in-Jeju-Island-South-Korea.jpg', content_type: contentType.IMAGE, created_at: '오후 7:51', lat: 33.5149322, lng: 126.90045 },
			{ id: 18, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://cdn.traveltimes.co.kr/news/photo/202207/402243_23181_5717.jpg', content_type: contentType.IMAGE, created_at: '오후 7:51', lat: 33.5151322, lng: 126.90045 },
			{ id: 19, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://thumb.mt.co.kr/06/2022/07/2022071213595260752_1.jpg/dims/resize/1200/crop/1200x630!/optimize/', content_type: contentType.IMAGE, created_at: '오후 7:52', lat: 33.5155322, lng: 126.90045 },
			{ id: 20, writer: writerType.USER, name: '여행이 좋은 사람', content: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_2048,w_2048/56f92153-a78e-4257-a0fc-a08b664c2d44.jpeg', content_type: contentType.IMAGE, created_at: '오후 7:52', lat: 33.5159322, lng: 126.90045 },
			{ id: 21, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '이 사진 멋진걸? 좋은 추억으로 간직할 수 있도록 보관해둘게!', content_type: contentType.TEXT, created_at: '오후 7:52' },
		//
		//
		// 	// { id: 3, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
		// 	// { id: 4, writer: writerType.USER, name: 'User name', content: 'https://cdn.drtour.com/MainNew/Recommend/2022/11/f276b510-fd96-41b2-8ea0-12a074177c81.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.02167546922172 },
		// 	// { id: 5, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
		// 	// { id: 6, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.576496070472174, lng: 127.01773165922074 },
		// 	// { id: 7, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '퀘스트 들어간다 입 벌려라;', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113, is_quest: true },
		// 	// { id: 8, writer: writerType.USER, name: 'User name', content: '퀘스트는 나중에 할거라서;; 여행지나 추천해 노예새끼야', content_type: contentType.TEXT, created_at: '오후 10:21', lat: 37.576496070472174, lng: 127.01773165922074 },
		// 	// { id: 9, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
		// 	// { id: 10, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.576496070472174, lng: 127.01773165922074 },
		// 	// { id: 11, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
		// 	// { id: 12, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.436496070472174, lng: 127.04173165922074 },
		// 	// { id: 13, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
		// 	// { id: 14, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.716496070472174, lng: 127.01973165922074 },
		// 	// { id: 15, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
		// 	// { id: 16, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.616496070472174, lng: 127.12473165922074 },
		// 	// { id: 17, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
		// 	// { id: 18, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.526496070472174, lng: 127.21373165922074 },
		// 	// { id: 19, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
		// 	// { id: 20, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.546496070472174, lng: 127.02273165922074 },
		// 	// { id: 21, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 파도소리 녹음해서 보내봐 확 씨', content_type: contentType.TEXT, created_at: '오후 3:49', lat: 37.59093209014804, lng: 127.03068989208113 },
		// 	// { id: 22, writer: writerType.USER, name: 'User name', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/test_record_anything.m4a', content_type: contentType.VOICE, created_at: '오후 10:21', lat: 37.596496070472174, lng: 127.03773165922074 },
		// 	// { id: 23, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
		// 	// { id: 24, writer: writerType.USER, name: 'User name', content: 'https://www.hotelrestaurant.co.kr/data/photos/20220728/art_16575051213065_0f3832.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.02167546922172 },
		// 	// { id: 25, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
		// 	// { id: 26, writer: writerType.USER, name: 'User name', content: 'https://50plus.or.kr/upload/im/2019/01/d3c19df5-37b2-4eab-9a97-51423b7cb419.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.02167546922172 },
		// 	// { id: 27, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
		// 	// { id: 28, writer: writerType.USER, name: 'User name', content: 'https://cdn.drtour.com/MainNew/Recommend/2022/11/f276b510-fd96-41b2-8ea0-12a074177c81.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.01767546922172 },
		// 	// { id: 29, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
		// 	// { id: 30, writer: writerType.USER, name: 'User name', content: 'https://rda.go.kr/webzine/2022/07/images/sub1-2_img01.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.02267546922172 },
		// 	// { id: 31, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
		// 	// { id: 32, writer: writerType.USER, name: 'User name', content: 'https://cdn.drtour.com/MainNew/Recommend/2022/11/f276b510-fd96-41b2-8ea0-12a074177c81.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.56114715566437, lng: 127.04167546922172 },
		// 	// { id: 33, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
		// 	// { id: 34, writer: writerType.USER, name: 'User name', content: 'https://cdn.drtour.com/MainNew/Recommend/2022/11/f276b510-fd96-41b2-8ea0-12a074177c81.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.03467546922172 },
		// 	// { id: 35, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '여행중이야? 사진찍어 보내봐', content_type: contentType.TEXT, created_at: '오전 11:51', lat: 37.59383383861659, lng: 127.01467990148191 },
		// 	// { id: 36, writer: writerType.USER, name: 'User name', content: 'https://rda.go.kr/webzine/2022/07/images/sub1-2_img01.jpg', content_type: contentType.IMAGE, created_at: '오후 1:30', lat: 37.58114715566437, lng: 127.02167546922172 },
		];

		totalChatsCnt = chats.length;
		callback({ success: true, chats });
	},
	dummyPushChat(message, callback) {
		totalChatsCnt++;
		chats.push({ id: totalChatsCnt, writer: writerType.USER, name: '여행이 좋은 사람', content: message, content_type: contentType.TEXT, created_at: '오전 11:43', lat: 33.5282463, lng: 126.7702874 })

		totalChatsCnt++;
		chats.push({ id: totalChatsCnt, writer: writerType.ASSISTANT, name: 'AI Buddy', content: '와, 진짜 멋진 여행이네! 제주도 애월 근처에는 정말 멋진 장소가 많아. 먼저, 한림공원을 방문해보는 건 어때? 자연 풍경이 아름다워서 정말 좋을 거야. 그리고 수월봉도 멋진 해변이 있어. 해수욕하거나 해변을 산책하며 시간 보내기에 딱이야. 마지막으로 말노래방과 카페도 있는 애월해안도로도 추천해! 거기서 멋진 시간 보낼 수 있을 거야. 즐거운 여행되길 바래!', content_type: contentType.TEXT, created_at: '오전 11:43', lat: 33.5282463, lng: 126.7702874 })

		callback({ success: true, chats });
	}
}

export default chatApi;
