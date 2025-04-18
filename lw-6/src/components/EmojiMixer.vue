<script setup>
import { computed } from 'vue'
import Emoji from './Emoji.vue'

const props = defineProps({
  firstEmoji: Object,
  secondEmoji: Object
})

const kitchenEmoji = computed(() => {
  if (props.firstEmoji && props.secondEmoji) {
    const unicodeFirst = props.firstEmoji.unicode[0].replace('U+', '').toLowerCase()
    const unicodeSecond = props.secondEmoji.unicode[0].replace('U+', '').toLowerCase()
    return `https://emk.vercel.app/s/${unicodeFirst}_${unicodeSecond}?size=96`
  }
  return null
})
</script>

<template>
  <div class="mixer-container">
    <h2>Результат смешивания:</h2>
    <div class="mixer-content">
      <div class="source-emojis">
        <Emoji :emoji="firstEmoji" />
        <span class="plus">+</span>
        <Emoji :emoji="secondEmoji" />
        <span class="equals">=</span>
      </div>
      <div class="result">
        <img :src="kitchenEmoji" alt="Смешанный смайл" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mixer-container {
  margin-top: 30px;
  text-align: center;
}

.mixer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-top: 15px;
}

.source-emojis {
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 2rem;
}

.plus, .equals {
  font-size: 1.5rem;
  color: #666;
}

.result img {
  width: 96px;
  height: 96px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>