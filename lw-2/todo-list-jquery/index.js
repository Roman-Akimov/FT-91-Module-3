const tasks = [];

function addTask() {
  const newTask = $('#new-task').val();
  if (newTask.trim() !== '') {
    tasks.push({ text: newTask, completed: false });
    const listItem = $('<li class="todo-item"></li>');
    const container_btn = $('<div class="cont-btn"></div>') //создал контейнер, чтобы кнопки были рядом
    const taskText = $('<span></span>').text(newTask);
    const deleteBtn = $('<button class="delete-btn">❌</button>')
    const changeBtn = $('<button class="change-btn">✏</button>')
    $(listItem).append(taskText);
    $(container_btn).append(changeBtn);
    $(container_btn).append(deleteBtn);
    $(listItem).append(container_btn);


    $(listItem).on('click', function () {
      const index = $(this).index();
      tasks[index].completed = !tasks[index].completed;
      $(this).toggleClass('completed');
    });
    
    $(deleteBtn).on('click', function (){
      e.stopPropagation();
      const index = $(listItem).index();
      tasks.splice(index, 1); // удаляю из массива
      $(listItem).remove(); // удаляю из разметки
    })

    $(changeBtn).on('click', (event) => {
      event.stopPropagation(); // останавливаем всплытие события
    
      let newName = prompt("Измените заметку");
      if (newName?.trim()) {
        const index = $(listItem).index();
        tasks[index].text = newName;  // обновляем задачу в массиве
    
        $(taskText).text(newName); // обновляем текст заметки
        $(listItem)
          .off('click') // отключаем старый обработчик
          .on('click', () => { // новый обработчик
            tasks[index].completed = !tasks[index].completed;
            $(listItem).toggleClass('completed', tasks[index].completed);
          })
          .toggleClass('completed', tasks[index].completed); // обновляем класс сразу
      }
    });

    $('#todo-list').append(listItem);
    $('#new-task').val('');
  }
}

$('form').on('submit', function (e) {
  e.preventDefault();
  addTask();
});
