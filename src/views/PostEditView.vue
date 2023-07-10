<script setup>
import { onBeforeMount, ref } from 'vue';
import postApi from '../services/apis/postApi';
import { useRoute } from 'vue-router';
import ButtonBack from '../components/ButtonBack.vue';
import router from '../router';

const route = useRoute();
const postId = route.params.id;

const post = ref();
const valid = ref({
	title: true,
	author_name: true,
	content: true,
});

async function updatePost() {
	if (!validate()) return;


	try {
		const response = await postApi.update(post.value, post.value.id);
		console.log(response);
		alert("post updated");
		router.push('/posts');
	} catch (e) {
		console.error(e);
		alert('update failed');
	}
}

function validate() {
	const p = post.value;

	valid.value.title = p.title !== '';
	valid.value.author_name = p.author_name !== '';
	valid.value.content = p.content !== '';

	return p.title && p.author_name && p.content;
}

onBeforeMount(async () => {
	post.value = (await postApi.getById(postId)).data;
});
</script>

<template>
	<section v-if="post">

		<div class="flex justify-between items-center">
			<h1 class="inline-block text-5xl">Edit post</h1>
			<button-back />
		</div>

		<form @submit.prevent="updatePost"
			class="flex flex-col mt-10 space-y-4 bg-neutral-100 p-6 max-w-3xl mx-auto rounded">

			<!-- title -->
			<div class="flex justify-between">
				<label for="title">Title</label>
				<div class="flex flex-col">
					<input v-model="post.title"
						name="title"
						type="text"
						id="title"
						class=" border border-neutral-400 w-96 rounded px-4 py-2">
					<p v-show="!valid.title"
						class="text-red-700">This field is required.</p>
				</div>
			</div>

			<!-- author -->
			<div class="flex justify-between">
				<label for="author">Author</label>
				<div class="flex flex-col">
					<input v-model="post.author_name"
						name="author_name"
						type="text"
						id="author"
						class=" border border-neutral-400 w-96 rounded px-4 py-2">
					<p v-show="!valid.author_name"
						class="text-red-700">This field is required.</p>
				</div>
			</div>

			<!-- content -->
			<div class="flex justify-between">
				<label for="content">Content</label>
				<div class="flex flex-col">
					<textarea v-model="post.content"
						name="content"
						id="content"
						cols="30"
						rows="10"
						class=" border border-neutral-400 w-96 rounded px-4 py-2"></textarea>
					<p v-show="!valid.content"
						class="text-red-700">This field is required.</p>
				</div>
			</div>

			<div class="text-end">
				<button type="submit"
					class="btn bg-blue-500 hover:bg-blue-400 text-white">Save</button>
			</div>


		</form>


	</section>
</template>