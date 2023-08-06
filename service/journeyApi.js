const contentType = {
	TEXT: 1, IMAGE: 2, VOICE: 3
}
const writerType = {
	ASSISTANT: 1, USER: 2, SYSTEM: 3
}

const journeyApi = {
	all(callback) {
		// TODO : 서버에서 journey 테이블 컬럼에 image_url(대표 이미지) 추가해야함
		const journeyList = [
			{ id: 1, title: '제주도 여행!', status: 3, image_url: 'https://a.cdn-hotels.com/gdcs/production116/d1405/6b34e4da-8105-4ee4-bcd9-cfb67fdf23af.jpg?impolicy=fcrop&w=800&h=533&q=medium', created_at: '2023.01.31' },
			{ id: 2, title: '니뽄 여행!', status: 3, image_url: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/271C/production/_126821001_gettyimages-1198681116.jpg', created_at: '2023.01.31' },
			{ id: 3, title: '새보다 높은 여행!', status: 3, image_url: 'https://paragliding-interlaken.ch/wp-content/uploads/2022/01/%E1%84%89%E1%85%B3%E1%84%8B%E1%85%B1%E1%84%89%E1%85%B3-%E1%84%8B%E1%85%A7%E1%84%92%E1%85%A2%E1%86%BC%E1%84%8F%E1%85%A9%E1%84%89%E1%85%B3-scaled.jpg', created_at: '2023.01.31' },
			{ id: 4, title: '근본 북촌한옥여행', status: 2, image_url: 'https://www.agoda.com/wp-content/uploads/2019/05/Seoul-itinerary-Seoul-Bukchon-Hanok-Village.jpg', created_at: '2023.01.31' },
			{ id: 1, title: '제주도 여행!', status: 3, image_url: 'https://a.cdn-hotels.com/gdcs/production116/d1405/6b34e4da-8105-4ee4-bcd9-cfb67fdf23af.jpg?impolicy=fcrop&w=800&h=533&q=medium', created_at: '2023.01.31' },
			{ id: 2, title: '니뽄 여행!', status: 3, image_url: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/271C/production/_126821001_gettyimages-1198681116.jpg', created_at: '2023.01.31' },
			{ id: 3, title: '새보다 높은 여행!', status: 3, image_url: 'https://paragliding-interlaken.ch/wp-content/uploads/2022/01/%E1%84%89%E1%85%B3%E1%84%8B%E1%85%B1%E1%84%89%E1%85%B3-%E1%84%8B%E1%85%A7%E1%84%92%E1%85%A2%E1%86%BC%E1%84%8F%E1%85%A9%E1%84%89%E1%85%B3-scaled.jpg', created_at: '2023.01.31' },
			{ id: 4, title: '근본 북촌한옥여행', status: 1, image_url: 'https://www.agoda.com/wp-content/uploads/2019/05/Seoul-itinerary-Seoul-Bukchon-Hanok-Village.jpg', created_at: '2023.01.31' },
			{ id: 1, title: '제주도 여행!', status: 3, image_url: 'https://a.cdn-hotels.com/gdcs/production116/d1405/6b34e4da-8105-4ee4-bcd9-cfb67fdf23af.jpg?impolicy=fcrop&w=800&h=533&q=medium', created_at: '2023.01.31' },
			{ id: 2, title: '니뽄 여행!', status: 3, image_url: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/271C/production/_126821001_gettyimages-1198681116.jpg', created_at: '2023.01.31' },
			{ id: 3, title: '새보다 높은 여행!', status: 3, image_url: 'https://paragliding-interlaken.ch/wp-content/uploads/2022/01/%E1%84%89%E1%85%B3%E1%84%8B%E1%85%B1%E1%84%89%E1%85%B3-%E1%84%8B%E1%85%A7%E1%84%92%E1%85%A2%E1%86%BC%E1%84%8F%E1%85%A9%E1%84%89%E1%85%B3-scaled.jpg', created_at: '2023.01.31' },
			{ id: 4, title: '근본 북촌한옥여행', status: 1, image_url: 'https://www.agoda.com/wp-content/uploads/2019/05/Seoul-itinerary-Seoul-Bukchon-Hanok-Village.jpg', created_at: '2023.01.31' },
			{ id: 1, title: '제주도 여행!', status: 3, image_url: 'https://a.cdn-hotels.com/gdcs/production116/d1405/6b34e4da-8105-4ee4-bcd9-cfb67fdf23af.jpg?impolicy=fcrop&w=800&h=533&q=medium', created_at: '2023.01.31' },
			{ id: 2, title: '니뽄 여행!', status: 3, image_url: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/271C/production/_126821001_gettyimages-1198681116.jpg', created_at: '2023.01.31' },
			{ id: 3, title: '새보다 높은 여행!', status: 3, image_url: 'https://paragliding-interlaken.ch/wp-content/uploads/2022/01/%E1%84%89%E1%85%B3%E1%84%8B%E1%85%B1%E1%84%89%E1%85%B3-%E1%84%8B%E1%85%A7%E1%84%92%E1%85%A2%E1%86%BC%E1%84%8F%E1%85%A9%E1%84%89%E1%85%B3-scaled.jpg', created_at: '2023.01.31' },
			{ id: 4, title: '근본 북촌한옥여행', status: 1, image_url: 'https://www.agoda.com/wp-content/uploads/2019/05/Seoul-itinerary-Seoul-Bukchon-Hanok-Village.jpg', created_at: '2023.01.31' },
			{ id: 1, title: '제주도 여행!', status: 3, image_url: 'https://a.cdn-hotels.com/gdcs/production116/d1405/6b34e4da-8105-4ee4-bcd9-cfb67fdf23af.jpg?impolicy=fcrop&w=800&h=533&q=medium', created_at: '2023.01.31' },
			{ id: 2, title: '니뽄 여행!', status: 3, image_url: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/271C/production/_126821001_gettyimages-1198681116.jpg', created_at: '2023.01.31' },
			{ id: 3, title: '새보다 높은 여행!', status: 3, image_url: 'https://paragliding-interlaken.ch/wp-content/uploads/2022/01/%E1%84%89%E1%85%B3%E1%84%8B%E1%85%B1%E1%84%89%E1%85%B3-%E1%84%8B%E1%85%A7%E1%84%92%E1%85%A2%E1%86%BC%E1%84%8F%E1%85%A9%E1%84%89%E1%85%B3-scaled.jpg', created_at: '2023.01.31' },
			{ id: 4, title: '근본 북촌한옥여행', status: 1, image_url: 'https://www.agoda.com/wp-content/uploads/2019/05/Seoul-itinerary-Seoul-Bukchon-Hanok-Village.jpg', created_at: '2023.01.31' },
			{ id: 1, title: '제주도 여행!', status: 3, image_url: 'https://a.cdn-hotels.com/gdcs/production116/d1405/6b34e4da-8105-4ee4-bcd9-cfb67fdf23af.jpg?impolicy=fcrop&w=800&h=533&q=medium', created_at: '2023.01.31' },
			{ id: 2, title: '니뽄 여행!', status: 3, image_url: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/271C/production/_126821001_gettyimages-1198681116.jpg', created_at: '2023.01.31' },
			{ id: 3, title: '새보다 높은 여행!', status: 3, image_url: 'https://paragliding-interlaken.ch/wp-content/uploads/2022/01/%E1%84%89%E1%85%B3%E1%84%8B%E1%85%B1%E1%84%89%E1%85%B3-%E1%84%8B%E1%85%A7%E1%84%92%E1%85%A2%E1%86%BC%E1%84%8F%E1%85%A9%E1%84%89%E1%85%B3-scaled.jpg', created_at: '2023.01.31' },
			{ id: 4, title: '근본 북촌한옥여행', status: 1, image_url: 'https://www.agoda.com/wp-content/uploads/2019/05/Seoul-itinerary-Seoul-Bukchon-Hanok-Village.jpg', created_at: '2023.01.31' },
		];

		callback({ success: true, journeyList });
	},
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
