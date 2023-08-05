<template>
	<header class="back-navbar-view">
		<img src="/images/login/back_icon_navbar.svg">

		<span>{{ navbarTitle }}</span>
  </header>
</template>

<script setup>
const {navbarTitle} = defineProps(['navbar-title']);

</script>

<style scoped lang="css">
.back-navbar-view {
  width: 100%;
  height: 56px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: 600;
  font-size: 16px;
  color: black;

  position: relative;
}

.back-navbar-view img {
  width: 24px;
  height: 24px;

  position: absolute;
  top: 16px;
  left: 12px;
}
</style>
