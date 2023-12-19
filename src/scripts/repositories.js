function repositories() {
  const search = document.querySelector(".autocomplited__search");
  const autocomplitedWindow = document.querySelector(".window");

  function template(repositorie) {
    return `<button
    data-Id=${repositorie.id}
    type="button" 
    class="autocomplited__button 
    autocomplited__button--wide">
    ${repositorie.repositorieName}</button>`;
  }

  function render(mokData) {
    autocomplitedWindow.innerHTML = "";

    mokData.forEach((repositorie, index) =>
      autocomplitedWindow.insertAdjacentHTML(
        "beforeend",
        template(repositorie, index)
      )
    );
  }

  search.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase();
    //Типа ответ с сервера временно!
    const mokData = [
      {
        id: 1,
        repositorieName: "r2",
        link: {
          name: "redux",
          owner: "vk",
          stars: 12414,
        },
      },
      {
        id: 2,
        repositorieName: "R2",
        link: {
          name: "redux2",
          owner: "vk2",
          stars: 12414,
        },
      },
    ];

    const filterData = mokData.filter(
      (item) => item.repositorieName.toLowerCase() === value
    );

    //проблемный код!
    if (filterData.length === 0) {
      autocomplitedWindow.classList.remove("autocomplited__window");
      render(filterData);
      return;
    }

    autocomplitedWindow.classList.add("autocomplited__window");
    render(filterData);
  });
}

export { repositories };
