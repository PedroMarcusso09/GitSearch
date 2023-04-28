document.addEventListener("DOMContentLoaded", function () {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const userDetails = document.getElementById("userDetails");
  const reposList = document.getElementById("reposList");

  if (!userData || !userDetails || !reposList) {
    console.error("Dados do usuário ou elementos não encontrados");
    return;
  }

  userDetails.innerHTML = `
    <img src="${userData.avatar_url}" alt="${userData.login}">
    <h1>${userData.name || userData.login}</h1>
    <button id="changeUserButton">Trocar de usuário</button>
  `;

  const changeUserButton = document.getElementById("changeUserButton");
  if (changeUserButton) {
    changeUserButton.addEventListener("click", function () {
      window.location.href = "../../index.html";
    });
  }

  fetch(`https://api.github.com/users/${userData.login}/repos`)
    .then(async (response) => {
      const repos = await response.json();
      repos.forEach((repo) => {
        const repoCard = document.createElement('div');
        repoCard.classList.add('repo-card');
        repoCard.innerHTML = `
          <div class="repo-content">
          <h3>${repo.name}</h3>
          <p>${repo.description}</p>
          <button onclick="window.open('${repo.html_url}', '_blank')">Repositório</button>
          <div/>
        `;
        reposList.appendChild(repoCard);
      });
    })
    .catch((error) => {
      console.error('Erro ao carregar os repositórios', error);
    });
});