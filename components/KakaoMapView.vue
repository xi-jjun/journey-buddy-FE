<template>
	<section class="kakao-map-component">
		<section id="kakao-map" ref="kakaoRefMap">

		</section>
	</section>
</template>

<script>

export default {
	name: 'KakaoMapView',
	props: ['mapOptions', 'chatList'],
	expose: ['getKakao', 'getKakaoMapInstance'],
	data() {
		return {
			mapInstance: {},
			testMarker: null,
			markers: [],
		};
	},
	mounted() {
		if (window.kakao && window.kakao.maps) {
			this.loadMap();
		} else {
			this.loadScript();
		}
	},
	methods: {
		loadScript() {
			const KAKAO_MAP_API_KEY = '693fe45f8e58590d2ee321fc246ef2d4';
			const script = document.createElement("script");
			script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${KAKAO_MAP_API_KEY}`;
			script.onload = () => window.kakao.maps.load(this.loadMap);

			document.head.appendChild(script);
		},
		loadMap() {
			const kakao = window.kakao;
			const mapContainer = document.getElementById("kakao-map");

			const { center, level } = this.mapOptions;
			this.mapInstance = new kakao.maps.Map(mapContainer, {
				center: new kakao.maps.LatLng(center.lat, center.lng),
				level: level
			});

			this.chatList.forEach(chat => {
				const position = new kakao.maps.LatLng(chat.lat, chat.lng);

				const markerImageUrl = this.getMarkerImageUrl(chat.content_type);
				const imageMarker = this.createImageMarker(markerImageUrl, position);
				// show marker on kakao map
				imageMarker.setMap(this.mapInstance);

				kakao.maps.event.addListener(imageMarker, 'click', () => {
					console.log("chat : ", chat);
				});
			});
		},
		getMarkerImageUrl(contentType) {
			const markerImageUrls = [
				"none",
				"https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/__chat.png",
				"https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/__image.png",
				"https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/__voice.png",
			];

			return markerImageUrls[contentType];
		},
		createImageMarker(markerImageUrl, position) {
			const kakao = window.kakao;
			const customMarkerImage = new kakao.maps.MarkerImage(
					markerImageUrl,
					new kakao.maps.Size(42, 51),
					// new kakao.maps.Size(55, 64),
					{
						spriteOrigin: new kakao.maps.Point(0, 0),
						spriteSize: new kakao.maps.Size(42, 51)
					}
			);

			return new kakao.maps.Marker({
				position: position,
				image: customMarkerImage
			})
		},
	},
}

</script>

<style scoped lang="css">
.kakao-map-component {
	margin: 20px 12px;
  height: 36vh;
  border-radius: 4px;
  border: 2px solid #778088;
}

#kakao-map {
  width: 100%;
  height: 100%;
}
</style>
