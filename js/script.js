const filterByType = (type, ...values) => values.filter(value => typeof value === type),
  // функция принимает два аргумента тип и значение. фильтрует значение по типу

  hideAllResponseBlocks = () => {
    const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
    responseBlocksArray.forEach(block => block.style.display = 'none');
  },
  // функция перебирает полученный массив и скрывает полученные элементы

  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    hideAllResponseBlocks();
    document.querySelector(blockSelector).style.display = 'block';
    if (spanSelector) {
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  // функция принимает три аргумента. запускает предыдущую функцию и делает видимым переданный аргумент. заменяет текстовое содержание третьего аргумента если он есть.

  showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
  //функция сообщает об ошибке

  showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
  //функция показывает результат

  showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
  //функция сообщает что результата нет

  tryFilterByType = (type, values) => {
    // функция формирует сообщения в зависимости от введенных значений и выбранного параметра
    try {
      // блок для отлова ошибки. если есть, то код будет работать дальше и сообщится об ошибке
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      // результат функции filterByType присваивает в переменную если он соответствует выбранному параметру
      const alertMsg = (valuesArray.length) ?
        `Данные с типом ${type}: ${valuesArray}` :
        `Отсутствуют данные типа ${type}`;
        // формирует сообщение в зависимости от соответствия или нет введенного значения выбранному параметру
      showResults(alertMsg);
      // показывает результат
    } catch (e) {
      showError(`Ошибка: ${e}`);
      // если выполнение кода в фигурных скобках блока try вызовет ошибку, сообщит о ней и позволит выполнится коду далее
    }
  };

const filterButton = document.querySelector('#filter-btn');
// получает по id кнопку в переменную

filterButton.addEventListener('click', e => {
  const typeInput = document.querySelector('#type');
  // получает селектор
  const dataInput = document.querySelector('#data');
  // получает инпут ввода значений
  if (dataInput.value === '') {
    dataInput.setCustomValidity('Поле не должно быть пустым!');
    // если поле не заполнено, говорит заполнить
    showNoResults();
    // показывает, что результата пока нет
  } else {
    dataInput.setCustomValidity('');
    // в противном случае метод setCustomValidity ничего не сообщит
    e.preventDefault();
    // отменяет стандартное поведение браузера
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
    // убирает пробелы в начале и в конце
  }
});

