import { autocomplited } from "./renders";
import { getAutocomplitedTemplate, getTodoTemplate } from "./templetes";
import { debounce } from "../helpers";

function repositories() {
  const search = document.querySelector(".autocomplited__search");
  const autocomplitedList = document.querySelector(".autocomplited__list");
  const todo = document.querySelector(".todo");

  let searchState = [];
  let filterSearchState = [];

  function renderList() {
    if (searchState.items.length === 0) {
      autocomplitedList.classList.add("autocomplited__list--hidden");
      autocomplited(getAutocomplitedTemplate, autocomplitedList, searchState.items);
      return;
    }

    autocomplitedList.classList.remove("autocomplited__list--hidden");
    autocomplited(getAutocomplitedTemplate, autocomplitedList, searchState.items);
  }

  search.addEventListener(
    "input",
    debounce(async (event) => {
      const value = event.target.value;

      if (value.trim() !== '') {
        const request = `https://api.github.com/search/repositories?q=${value}&per_page=5`;

        async function getSearchData() {
          try {
            const response = await fetch(request);
            return await response.json();
          } catch (error) {
            if (error instanceof Error) {
              console.log(error.message);
              console.log(error.stack);
            }
          }
        }

        const data = await getSearchData();
        searchState = data;
      }

      if (value === "") {
        searchState.items = [];
      }

      renderList();
    }, 400)
  );

  autocomplitedList.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    filterSearchState = filterSearchState.concat(searchState.items.filter((item) => item.id === +id));

    if (!id) {
      return;
    }

    autocomplited(getTodoTemplate, todo, filterSearchState);
    autocomplited(getAutocomplitedTemplate, autocomplitedList, searchState.items);

    search.value = "";
    searchState.items = [];

    renderList();
  });

  todo.addEventListener("click", (event) => {
    const id = event.target.dataset.id;

    filterSearchState = filterSearchState.filter((item) => item.id !== +id);
    autocomplited(getTodoTemplate, todo, filterSearchState);
  });
}

export { repositories };
