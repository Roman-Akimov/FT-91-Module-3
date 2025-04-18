<script setup>
import EmojiList from './components/EmojiList.vue'
import EmojiMixer from './components/EmojiMixer.vue'
import { onMounted, ref } from 'vue'

const emojis = ref([])
const selectedSmiles = ref([null, null])

async function fetchEmojis() {
  try {
    const res = await fetch('https://emojihub.yurace.pro/api/all')
    emojis.value = await res.json()
  } catch (error) {
    console.error('Error fetching emojis:', error)
  }
}

onMounted(fetchEmojis)

function setFirst(emoji) {
  selectedSmiles.value = [emoji, selectedSmiles.value[1]]
}

function setSecond(emoji) {
  selectedSmiles.value = [selectedSmiles.value[0], emoji]
}
</script>

<template>
  <div class="container">
    <h1>Emoji Kitchen</h1>

    <div v-if="emojis.length" class="selection-area">
      <div class="selection-column">
        <h2>Выберите первый смайлик:</h2>
        <EmojiList
            :emojis="emojis"
            @selectEmoji="setFirst"
            :selectedEmoji="selectedSmiles[0]"
        />
      </div>

      <div class="selection-column">
        <h2>Выберите второй смайлик:</h2>
        <EmojiList
            :emojis="emojis"
            @selectEmoji="setSecond"
            :selectedEmoji="selectedSmiles[1]"
        />
      </div>
    </div>

    <div v-else class="loading">
      Загрузка эмодзи...
    </div>

    <EmojiMixer
        v-if="selectedSmiles[0] && selectedSmiles[1]"
        :firstEmoji="selectedSmiles[0]"
        :secondEmoji="selectedSmiles[1]"
    />
  </div>
</template>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.selection-area {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
}

.selection-column {
  flex: 1;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
}
</style>