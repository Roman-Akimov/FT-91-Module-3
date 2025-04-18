<script setup>
import Emoji from './Emoji.vue'

const props = defineProps({
  emojis: Array,
  selectedEmoji: Object
})

const emit = defineEmits(['selectEmoji'])

function handleClick(emoji) {
  emit('selectEmoji', emoji)
}
</script>

<template>
  <div class="emoji-list">
    <div
        v-for="(emoji, i) in emojis"
        :key="i"
        class="emoji-item"
        :class="{ selected: emoji === selectedEmoji }"
        @click="handleClick(emoji)"
    >
      <Emoji :emoji="emoji" />
    </div>
  </div>
</template>

<style scoped>
.emoji-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
  background: #f5f5f5;
  border-radius: 8px;
}

.emoji-item {
  cursor: pointer;
  transition: all 0.2s;
  padding: 5px;
  border-radius: 4px;
}

.emoji-item:hover {
  transform: scale(1.2);
  background: #e0e0e0;
}

.emoji-item.selected {
  background: #bbdefb;
  box-shadow: 0 0 0 2px #2196f3;
}
</style>