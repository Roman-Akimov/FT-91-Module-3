<script setup>
import {ref} from 'vue';
const number = ref(''); // для ввода чисел
const category = ref('trivia'); // для выбора категории
const fact = ref(''); // для хранения факта
const isLoading = ref(false); // для индикатора загрузки
const errorMessage  = ref('') // для сообщения об ошибке


async function fetchFact() {
  if (!number.value){
    errorMessage.value = 'Введите число';
    return;
  }

  isLoading.value = true;
  errorMessage.value = ''; // очищаем

  try {
    const response = await fetch(`http://numbersapi.com/${number.value}/${category.value}?json`)
    const data = await response.json();

    if (data.found){
      fact.value = data.text;
    }
    else {
      fact.value = `${number.value} - скучное число/скучный год`
    }
  }catch (error){
    errorMessage.value = 'Ошибка призагрузке данных. Попробуйте позже!';
  }finally {
    isLoading.value = false;
  }

}

</script>

<template>
  <h1>Случайные факты о числах</h1><br>
  <div class="input-data">
    Введите число:<input type="number" v-model="number" @keyup.enter="fetchFact"/>

    <label>Выберите формат факта ;)</label>
    <select id="selector" v-model="category">
      <option >math</option>
      <option>year</option>
      <option>trivia</option>
    </select><br>
    <button @click="fetchFact">Поиск</button>
  </div>

  <div v-if="isLoading">
    <p>Загрузка...</p>
  </div>

  <div v-if="fact">
    <p>{{fact}}</p>
  </div>

  <div v-if="errorMessage" class="error-message">
    <p>{{errorMessage}}</p>
  </div>
</template>

<style scoped>
h1 {
  color: #333;
}

input, select, button {
  margin: 5px;
  padding: 10px;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

.error-message {
  color: red;
}
</style>
