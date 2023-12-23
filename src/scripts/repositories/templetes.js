function getAutocomplitedTemplate(element) {
  return `<button
  data-Id=${element.id}
  type="button" 
  class="autocomplited__button 
  autocomplited__button--wide">
  ${element.name}</button>`;
}

function getWindowTemplate(element) {
  return `<div class="list__item">
  <p>Имя репозитория ${element.name}</>
  <p>Владелец ${element.owner.login}</>
  <p>Рейтинг ${element.stargazers_count}</>
  </div>`;
}

export { getAutocomplitedTemplate, getWindowTemplate };
