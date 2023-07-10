<script setup>
import { onMounted, ref } from 'vue';
import postApi from '../services/apis/postApi';
import PostCard from '../components/PostCard.vue';
import Pagination from '../components/Pagination.vue';

const posts = ref([]);
const paginationDetails = ref();


async function changePage(pageUrl) {
	let response = (await postApi.getPaginated(pageUrl)).data;
	posts.value = response.data;

	delete response.data;
	paginationDetails.value = response;
}


onMounted(async () => {
	let response = (await postApi.getPaginated()).data;

	posts.value = response.data;

	delete response.data;
	paginationDetails.value = response;
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

		<div class="flex flex-col space-y-4 max-w-3xl mx-auto">
			<post-card v-for="post in posts"
				:post="post" />

			<div class="flex justify-center">
				<pagination :pagination="paginationDetails"
					@changePage="changePage" />
			</div>

		</div>
	</section>
</template>