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
      autocomplitedList.classList.remove("autocomplited__list--on");
      autocomplitedList.classList.add("autocomplited__list--off");
      autocomplited(getAutocomplitedTemplate, autocomplitedList, searchState.items);
      return;
    }

    autocomplitedList.classList.add("autocomplited__list--on");
    autocomplitedList.classList.remove("autocomplited__list--off");
    autocomplited(getAutocomplitedTemplate, autocomplitedList, searchState.items);
  }

  search.addEventListener(
    "input",
    debounce(async (event) => {
      const value = event.target.value;

      if (value !== "") {
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

      renderList()
    }, 250)
  );

  autocomplitedList.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    filterSearchState = filterSearchState.concat(searchState.items.filter((item) => item.id === +id));

    autocomplited(getTodoTemplate, todo, filterSearchState);
    autocomplited(getAutocomplitedTemplate, autocomplitedList, searchState.items);

    search.value = "";
    searchState.items = [];

    renderList()
  });
}

export { repositories };
