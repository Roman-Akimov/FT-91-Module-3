<script setup>
import {reactive} from 'vue';
import {ref} from 'vue';

const formDate = reactive({
  firstName: "",
  lastName: "",
  gender: "",
  password: "",
  sPassword: "",

});

const showPassword = ref(false);

function viewConsole() {
  console.log('Имя:', formDate.firstName);
  console.log('Фамилия:', formDate.lastName);
  console.log('Пол:', formDate.gender);
  console.log('Пароль:', formDate.password);
  console.log('Пароль:', formDate.sPassword);
}
</script>

<template>

  <form>
    Имя: <input type="text" v-model="formDate.firstName"><br>
    Фамилия: <input type="text" v-model="formDate.lastName"><br>
    <label>Пол: </label>
    <label><input type="radio" value="М" v-model="formDate.gender"/>М</label>
    <label><input type="radio" value="Ж" v-model="formDate.gender"/>Ж</label><br>

    Пароль: <input :type="showPassword ? 'text' : 'password'" v-model="formDate.password"><br>
    Повторите: <input :type="showPassword ? 'text' : 'password'" v-model="formDate.sPassword"><br>
    <button
        type="button"
        @mousedown="showPassword = true"
        @mouseup="showPassword = false"
        @mouseleave="showPassword = false"
    >Показать пароль
    </button>
    <br>

    <button type="button" :disabled="formDate.password !== formDate.sPassword" @click="viewConsole">
      Зарегистрироваться!
    </button>
  </form><br>
  <p>Пользователь: {{ formDate.firstName }} {{ formDate.lastName }}</p><br>
  <p>Пол: {{ formDate.gender == "М" ? "Мужской" : "Женский" }}</p><br>
  <p v-if="formDate.password !== formDate.sPassword">Пароли не совпадают!</p>
</template>

<style scoped>

form {
  border-radius: 4px;
  border: #00bd7e;
  background-color: #00bd7e;
  color: #181818;
  padding: 1rem;
}

button {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
}
</style>
