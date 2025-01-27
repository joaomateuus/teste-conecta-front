<script setup lang="ts">
import { getContactsByDomainService } from '@/services/contacts';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Tipagem para os contatos
interface Contact {
	email: string;
	name: string;
}

interface ContactsByDomain {
	domain: string;
	emails: Contact[];
}

const { logUserOut } = useAuthStore();
const { user } = storeToRefs(useAuthStore());
const router = useRouter();

// const getUser = async () => {
// 	await JSON.parse(localStorage.getItem('user'))
// }
const fetchContactsByDomain = async () => {
	try {
		console.log(user.value)
		const response = await getContactsByDomainService(user.value!.google_resource_name);
		if (response.data) {
			contacts.value = response.data as ContactsByDomain[];
			selectedDomain.value = contacts.value[0].domain;
		}

	} catch (error) {
		console.log(error);
	}
}


onMounted(async () => {
	fetchContactsByDomain();
})

// Dados mockados
const contacts = ref<ContactsByDomain[]>([]);

// Aba selecionada
const selectedDomain = ref<string | null>(null);

// Definir a aba inicial



const filteredContacts = computed(() => {
	return contacts.value.find((c) => c.domain === selectedDomain.value)?.emails || [];
});

const logoutUser = () => {
	logUserOut();
	router.push("/")
}

// Controle de drawer e paginação
const drawer = ref(false);
const page = ref(1);

const itemsNav = ref([
	{
		title: 'Contatos por Dominio',
		value: 'foo',
	},
	// {
	// 	title: 'Contatos',
	// 	value: 'bar',
	// },
	// {
	// 	title: 'Minha Conta',
	// 	value: 'fizz',
	// },
	{
		title: 'Logout',
		value: 'buzz',
		callback: logoutUser
	},
]);
</script>


<template>
	<div class="flex items-center justify-center h-full w-full">
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
				<v-list>
					<v-list-item v-for="(item, index) in itemsNav" :key="index" @click="item.callback">
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item>
				</v-list>
			</v-navigation-drawer>
		</v-layout>

		<div class="flex flex-col items-center justify-center h-full w-full p-12 mt-16">
			<div class="flex items-center justify-start w-4/6 mb-4">
				<span class="text-4xl">Contatos por Domínio</span>
			</div>

			<div class="flex flex-col items-start justify-start h-full w-4/6 mt-6">
				<v-card class="w-full">
					<v-tabs v-model="selectedDomain" class="bg-white text-black" show-arrows touchless>
						<v-tab v-for="contact in contacts" :key="contact.domain" :value="contact.domain"
							class="w-32 hover:border-b-2 hover:border-blue-300">
							{{ contact.domain }}
						</v-tab>
					</v-tabs>
				</v-card>

				<div class="p-8" v-if="selectedDomain">
					<v-data-iterator :items="filteredContacts" :page="page">
						<template v-slot:default="{ items }">
							<template v-for="(item) in items" :key="item.raw.email">
								<v-card class="w-64 h-42 mb-4 p-12 w-full">
									<v-card-title>{{ item.raw.name }}</v-card-title>
									<v-card-subtitle>{{ item.raw.email }}</v-card-subtitle>
								</v-card>
							</template>
						</template>
					</v-data-iterator>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="css"></style>
