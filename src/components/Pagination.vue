<script setup>
import { onMounted } from 'vue';

const props = defineProps(['pagination']);
const emits = defineEmits(['changePage', 'changeCount']);

function getPaginatedPosts(pageUrl) {
	emits('changePage', pageUrl);
}



</script>

<template>
	<div v-if="pagination"
		class="flex flex-col justify-center items-center space-y-1">

		<div class="flex space-x-2">
			<button v-for="link in pagination.links"
				@click="getPaginatedPosts(link.url)"
				class="py-2 px-4  hover:bg-neutral-300 rounded"
				:class="{ 'opacity-25': link.url == null, 'bg-neutral-200': link.active }"
				:disabled="link.url == null"
				v-html="link.label">
			</button>
		</div>


		<!-- count changer -->
		<div class="hidden items-center space-x-2">
			<span class="text-neutral-400">Data per page</span>
			<select class="p-2 rounded">
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="20">20</option>
			</select>
		</div>

		<p class="text-neutral-400">{{ pagination.from }} to {{ pagination.to }} from total {{ pagination.total }}
			data </p>



	</div>
</template>