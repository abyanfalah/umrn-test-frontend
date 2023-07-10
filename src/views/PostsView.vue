<script setup>
import { onMounted, ref } from 'vue';
import postApi from '../services/apis/postApi';
import PostCard from '../components/PostCard.vue';


const posts = ref([]);
const pagination = ref();



onMounted(async () => {
	let response = (await postApi.getAll()).data;

	posts.value = response.data;

	delete response.data;
	pagination.value = response;
});
</script>

<template>
	<section class="flex flex-col space-y-4">
		<div class="flex justify-between items-center">
			<h1 class="inline-block text-5xl">Posts</h1>
			<router-link to="/posts/new"
				class="btn bg-green-500 hover:bg-green-400 text-white">
				Create new post
			</router-link>

			<!-- todo: PAGINATION COMPONENT -->
		</div>

		<div class="flex flex-col space-y-4">
			<post-card v-for="post in posts"
				:post="post" />
		</div>
	</section>
</template>