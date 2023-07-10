<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import postApi from '../services/apis/postApi';
import { useRoute } from 'vue-router';
import ButtonBack from '../components/ButtonBack.vue';
import router from '../router';

const route = useRoute();
const postId = route.params.id;
const post = ref({});

const deleteDialog = ref(false);

async function deletePost() {
	console.log(post.value);
	try {
		await postApi.delete(post.value.id);
		alert("post deleted");
		router.push('/posts');
	} catch (e) {
		console.error(e);
		alert('delete failed');
	}

}

onBeforeMount(async () => {
	post.value = (await postApi.getById(postId)).data;
	console.log(post.value);
});
</script>

<template>
	<section v-if="post">

		<!-- buttons -->
		<div class="flex justify-end">
			<div class="flex items-center space-x-2"
				v-if="deleteDialog">
				<p>Delete this post?</p>

				<button @click="deleteDialog = false"
					class="
					btn
					bg-blue-500
					hover:bg-blue-400
					text-white">No</button>

				<button @click="deletePost"
					class="
					btn
					bg-red-500
					hover:bg-red-400
					text-white">Yes</button>
			</div>

			<div v-else
				class="flex space-x-2 items-center">
				<router-link :to="`/posts/${post.id}/edit`"
					class="btn bg-blue-500 hover:bg-blue-400 text-white">
					Edit
				</router-link>

				<button @click="deleteDialog = true"
					class="btn bg-red-500 hover:bg-red-400 text-white">Delete</button>

				<button-back />
			</div>
		</div>

		<!-- contents -->
		<div class="flex flex-col max-w-3xl mx-auto mt-10">
			<div>
				<h1 class="inline-block text-5xl">{{ post.title }}</h1>

				<p>
					<span class="opacity-50">By: </span>
					<span>{{ post.author_name }}</span>
				</p>

				<p>
					<span class="opacity-50">{{ new Date(post.created_at).toDateString() }}</span>
				</p>


			</div>

			<p class="my-10">{{ post.content }}...</p>
		</div>






	</section>
</template>