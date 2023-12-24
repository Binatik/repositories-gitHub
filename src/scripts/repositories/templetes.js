function getAutocomplitedTemplate(element) {
  return `<button
  data-Id=${element.id}
  type="button" 
  class="autocomplited__button 
  autocomplited__button--wide">
  ${element.name}</button>`;
}

function getTodoTemplate(element) {
  return `<div class="todo__item">
  <p>Имя репозитория ${element.name}</p>
  <p>Владелец ${element.owner.login}</p>
  <p>Рейтинг ${element.stargazers_count}</p>
  <button data-id=${element.id} type="button">Удалить репозиторий</button>
  </div>`;
}

export { getAutocomplitedTemplate, getTodoTemplate };
