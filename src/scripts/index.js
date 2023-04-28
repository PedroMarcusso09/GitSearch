async function searchUser() {
  const usernameInput = document.getElementById("usernameInput");

  if (!usernameInput) {
    console.error("Input element not found");
    return;
  }

  const username = usernameInput.value;

  fetch(`https://api.github.com/users/${username}`)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Usuário não encontrado");
      }
      const userData = await response.json();
      localStorage.setItem("userData", JSON.stringify(userData));
      window.location.href = "src/pages/profile.html";
    })
    .catch((error) => {
      console.error(error.message);
      window.location.href = "src/pages/error.html";
    });
}

document.getElementById("searchButton").addEventListener("click", searchUser);