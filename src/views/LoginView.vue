<script setup lang="ts">
import { googleSdkLoaded } from "vue3-google-login";
import { useRouter } from "vue-router";
import { storeToRefs } from 'pinia';
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const { authenticateUser } = useAuthStore();
const { authenticated } = storeToRefs(useAuthStore());

const loginWithGoogleAccount = () => {
	googleSdkLoaded((google) => {
		google.accounts.oauth2.initTokenClient({
			client_id: import.meta.env.VITE_GOOGLE_API_CLIENT_ID,
			scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/contacts.readonly',
			callback: (response) => {
				console.log("Handle the response", response)
				handleApiLogin(response.access_token)
			}
		}).requestAccessToken();
	})
}

const handleApiLogin = async (token: string) => {
	try {
		await authenticateUser(token);
		if (authenticated) {
			router.push('home');
			return;
		} else {
			console.log("Lançar toast")
		}

	} catch (error) {
		console.log(error);
	}
}
</script>

<template>
	<div class="flex h-screen w-full justify-center items-center">
		<div class="flex h-[35vh] w-[1/3] flex-col justify-start items-center p-5">
			<div class="flex items-start justify-evenly w-1/2 p-1">
				<img class="h-[10vh] w-auto" src="../assets/google-logo.png" alt="Google" />
				<div class="h-[10vh] border-r-2 border-black"></div>
				<img class="h-[10vh] w-auto" src="../assets/agenda-logo.png" alt="Agenda" />
			</div>
			<div class="flex flex-col items-center justify-center">
				<span class="my-6 text-lg text-justify">
					Conecte-se com sua conta Google para acessar e gerenciar seus contatos de forma inteligente e
					segura.
				</span>
				<button @click="loginWithGoogleAccount" class="my-2 h-12 w-72 bg-blue-600 text-white rounded-md">
					Entrar com Google
				</button>
			</div>
		</div>
	</div>
</template>
