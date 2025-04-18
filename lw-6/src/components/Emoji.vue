<script setup>
const props = defineProps({
  emoji: Object
})
</script>

<template>
  <span v-if="emoji" v-html="emoji.htmlCode[0]" class="emoji"></span>
</template>

<style scoped>
.emoji {
  font-size: 1rem;
  display: inline-block;
}
</style>