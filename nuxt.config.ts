export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['aos/dist/aos.css'],
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      title: 'My Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  }
});
