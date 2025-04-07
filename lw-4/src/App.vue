<script setup>
import { ref, computed } from 'vue';

// История операций
const history = ref([]);

// Рактивные переменные для формы
const title = ref('');
const amount = ref(0);

// Добавление новой записи в историю
const addTransaction = () => {
  if (title.value.trim() === '' || amount.value === 0) {
    return; // Не добавляем пустые записи
  }

  const newTransaction = {
    text: title.value.trim(),
    amount: Number(amount.value),
    id: Date.now(), // Генерируем уникальный ID
  };
  history.value.push(newTransaction);

  // Очистка полей
  title.value = '';
  amount.value = 0;
};

// Вычисление общей суммы доходов
const incomeBalance = computed(() => {
  return history.value.filter(item => item.amount > 0).reduce((sum, item) => sum + item.amount, 0);
});

// Вычисление общей суммы расходов
const outcomeBalance = computed(() => {
  return history.value.filter(item => item.amount < 0).reduce((sum, item) => sum + item.amount, 0);
});

// Вычисление общего баланса
const totalBalance = computed(() => {
  return incomeBalance.value + outcomeBalance.value;
});
</script>

<template>
  <h1>Учёт расходов</h1>

  <!-- Форма добавления операции -->
  <div>
    <input
        v-model.trim="title"
        type="text"
        placeholder="Название операции"
    />
    <input
        v-model.number="amount"
        type="number"
        placeholder="Сумма"
    />
    <button @click="addTransaction">Добавить операцию</button>
  </div>

  <!-- История операций -->
  <div v-if="history.length > 0">
    <h2>История операций:</h2>
    <ul>
      <li v-for="item in history" :key="item.id">
        {{ item.text }}: {{ item.amount }}
      </li>
    </ul>

    <div>
      <h3>Баланс</h3>
      <p v-if="incomeBalance > 0">Доходы: {{ incomeBalance }}</p>
      <p v-if="outcomeBalance < 0">Расходы: {{ outcomeBalance }}</p>
      <p v-if="totalBalance !== 0">Общий баланс: {{ totalBalance }}</p>
    </div>
  </div>

  <div v-else>
    <p>Вы не совершали финансовых операций</p>
  </div>
</template>

<style scoped>
h1 {
  color: #333;
}

input {
  margin: 5px;
  padding: 10px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
}
</style>
