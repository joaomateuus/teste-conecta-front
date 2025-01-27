<script setup lang="ts">
import { ref } from 'vue'

const page = ref(1)
const items = Array.from({ length: 15 }, (k, v) => ({
	title: 'Item ' + v + 1,
	text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
}))

const drawer = ref(false);
const itemsNav = ref([
	{
		title: 'Foo',
		value: 'foo',
	},
	{
		title: 'Bar',
		value: 'bar',
	},
	{
		title: 'Fizz',
		value: 'fizz',
	},
	{
		title: 'Buzz',
		value: 'buzz',
	},
])
</script>

<template>
	<div class="h-full w-full items-start justify-start">
		<v-layout>
			<v-app-bar color="primary" prominent>
				<v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

				<v-toolbar-title>Super OrgContact - ORGANIZAÇÃO DE CONTATOS</v-toolbar-title>

				<v-spacer></v-spacer>

				<template v-if="$vuetify.display.mdAndUp">
					<v-btn icon="mdi-magnify" variant="text"></v-btn>

					<v-btn icon="mdi-filter" variant="text"></v-btn>
				</template>

				<v-btn icon="mdi-dots-vertical" variant="text"></v-btn>
			</v-app-bar>

			<v-navigation-drawer v-model="drawer" :location="$vuetify.display.mobile ? 'bottom' : undefined" temporary>
				<v-list :items="itemsNav"></v-list>
			</v-navigation-drawer>
		</v-layout>

		<div class="flex flex-col items-center justify-center h-full p-12 m-12">
			<div class="flex items-center justify-start w-full mb-4">
				<span class="text-4xl">Contatos por Dominio</span>
			</div>
			<div class="flex flex-col items-start justify-start h-full w-full mt-6">
				<v-card>
					<v-tabs bg-color="teal-darken-3" slider-color="teal-lighten-3" show-arrows>
						<v-tab class="w-32" v-for="i in 5" :key="i" :text="'Item ' + i" :value="'tab-' + i"></v-tab>
					</v-tabs>
				</v-card>
				<div class="flex flex-col items-center justify-center h-full w-4/5">
					<v-data-iterator :items="items" :page="page">
						<template v-slot:default="{ items }">
							<template v-for="(item, i) in items" :key="i">
								<v-card v-bind="item.raw"></v-card>

								<br>
							</template>
						</template>
					</v-data-iterator>
				</div>
			</div>
		</div>
	</div>
</template>
