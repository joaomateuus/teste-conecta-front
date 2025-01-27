import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const app = createApp(App)
app.use(createPinia())
app.use(router)

const vuetify = createVuetify({
	components,
	directives,
	icons: {
		defaultSet: 'mdi', // Define a fonte de ícones padrão
	},
})
app.use(vuetify)

app.mount('#app')
