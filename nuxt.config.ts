// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            charset: 'utf-8',
            title: 'Journey-Buddy',
            meta: [
                {charset: 'utf-8'},
                {name: 'viewport', content: 'width=device-width, initial-scale=1.0, user-scalable=no'}
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
