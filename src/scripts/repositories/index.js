import { autocomplited } from "./renders";
import { getAutocomplitedTemplate, getWindowTemplate } from "./templetes";
import { debounce } from "../helpers";

function repositories() {
  const search = document.querySelector(".autocomplited__search");
  const autocomplitedWindow = document.querySelector(".window");
  const repositoriesList = document.querySelector(".repositories__list");

  let searchState = [];
  let filterSearchState = [];

  function renderWindow() {
    if (searchState.items.length === 0) {
      autocomplitedWindow.classList.remove("autocomplited__window");
      autocomplited(getAutocomplitedTemplate, autocomplitedWindow, searchState.items);
      return;
    }

    autocomplitedWindow.classList.add("autocomplited__window");
    autocomplited(getAutocomplitedTemplate, autocomplitedWindow, searchState.items);
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

      renderWindow();
    }, 250)
  );

  autocomplitedWindow.addEventListener("click", (event) => {
    const id = event.target.dataset.id;
    filterSearchState = filterSearchState.concat(searchState.items.filter((item) => item.id === +id));

    autocomplited(getWindowTemplate, repositoriesList, filterSearchState);
    autocomplited(getAutocomplitedTemplate, autocomplitedWindow, searchState.items);

    search.value = "";
    searchState.items = [];

    renderWindow();
  });
}

export { repositories };
