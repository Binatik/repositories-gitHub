function autocomplited(functionTemplate, renderElement, renderData) {
  renderElement.innerHTML = "";

  renderData.forEach((repositorie) =>
    renderElement.insertAdjacentHTML("beforeend", functionTemplate(repositorie))
  );
}

export { autocomplited };
