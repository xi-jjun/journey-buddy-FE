const contentType = {
	TEXT: 1, IMAGE: 2, VOICE: 3
}
const writerType = {
	ASSISTANT: 1, USER: 2, SYSTEM: 3
}

const journeyApi = {
	getJourneyDetailById(callback) {
		const journey = {
			id: 1,
			title: '꽃내음과 함께하는 제주도 올레길',
			subtitle: '제주도 투어길',
			address_name: '제주도 서귀포시 123-4',
			total_chat_cnt: 239,
			total_journey_time: 85,
			total_distance: 1353
		};

		callback({ success: true, journey });
	},
	getJourneyFiles(callback) {
		const journeyFiles = [
			{
				file_url: 'https://news.airbnb.com/wp-content/uploads/sites/4/2022/04/VILLA-SANGLUNG.jpeg?fit=1024%2C678',
				content_type: contentType.IMAGE
			},
			{
				file_url: 'https://t1.daumcdn.net/cfile/tistory/126823044C53DFDE7C',
				content_type: contentType.IMAGE
			},
			{
				file_url: 'https://mblogthumb-phinf.pstatic.net/MjAxODA0MTdfMTkg/MDAxNTIzOTYyMDE3NTc4.plSps4q1zuP1FlZlmxCUdPWhDVh-A5uQCxbfkvl79aYg.Yl5IuxM4aBXiechsze5eshi_v1Rt4ZA-66A2aYvpgv8g.PNG.dkcaihong/%EB%B8%94%EB%A1%9C%EA%B7%B8_%EB%B3%B8%EB%AC%B807.png?type=w800',
				content_type: contentType.IMAGE
			},
		]

		callback({ success: true, journeyFiles });
	}
}

export default journeyApi;
