<template>
	<div class="app-container">
		<NavBar />
		<main>
			<router-view />
		</main>
	</div>
</template>

<script>
import NavBar from './components/NavBar.vue';

export default {
	name: 'app',
	components: {
		NavBar
	}
}
</script>

<style scoped>
.app-container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 45px;
	align-items: center;
	max-width: 1440px;
	height: 100vh;
	margin: 0 auto;
}

.app-container main {
	background-color: lightgray;
	width: 80%;
	border-radius: 8px;
	padding: 20px;
}
</style>