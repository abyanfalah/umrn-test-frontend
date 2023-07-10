<script setup>
const props = defineProps(['post']);
const createDate = new Date(props.post.created_at).toDateString();
</script>

<template>
	<router-link :to="`posts/${post.id}`"
		class="flex flex-col p-4 space-y-1 bg-neutral-100 hover:bg-neutral-200 rounded"
		role="button">
		<h2 class="text-xl font-bold">{{ post.title }}</h2>
		<p>
			<span class="opacity-50">By: </span>
			<span>{{ post.author_name }}</span>
		</p>
		<p>
			<span class="opacity-50">{{ createDate }}</span>
		</p>
		<p>{{ post.content.substring(0, 200) }}...</p>
	</router-link>
</template>