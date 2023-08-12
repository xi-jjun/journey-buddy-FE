// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            title: 'Journey-Buddy',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no'},
                {name: 'description', content: 'AI동행 서비스 져니버디입니다.'},
                {property: 'og:description', content: '홀로 여행족들을 위한 AI 여행 동행 서비스! 져니버디입니다.'},
                {property: 'og:image', content: 'https://journey-buddy-bucket-local.s3.ap-northeast-2.amazonaws.com/journey-buddy-logo.png'},
            ]
        }
    },
    devtools: {enabled: false},
    devServer: {
        port: 5001
    },
    runtimeConfig: {
        // Keys within public, will be also exposed to the client-side
        public: {
            API_BASE_URL: process.env.API_BASE_URL,
            KAKAOMAP_API_KEY: process.env.KAKAOMAP_API_KEY,
        }
    }
})
