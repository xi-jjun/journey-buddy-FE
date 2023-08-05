<template>
	<div class="input-form">
		<label>{{ component.title }}</label>
		<input :placeholder="component.placeholder" :readonly="component.readonly" :type="component.type"/>
	</div>
</template>

<script setup>
const { component } = defineProps(['component']);
</script>

<style scoped lang="css">
.input-form {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.input-form > label {
  font-size: 13px;
  font-weight: 600;
  color: #778088;
}

.input-form > input {
  margin-top: 8px;
  height: 48px;
  border-radius: 4px;
  border-style: solid;
  border-color: #E6E8EB;

  padding-left: 20px;
}

.input-form > input::placeholder {
  font-size: 15px;
  font-weight: 500;
  color: #CCD1D7;
}
</style>
