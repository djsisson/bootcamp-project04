const db = import.meta.env.VITE_DATABASE_URL;

const themesEle = document.querySelector(".themes");

async function getThemes() {
  const response = await fetch(`${db}themes`);
  const themes = await response.json();
  console.log(themes);

  // put the games onto the page
  themes.forEach(function (theme) {
    // DOM manipulation to put the games onto the html
    const h2 = document.createElement("h2");

    h2.textContent = theme.theme;
    h2.style.color = theme.theme;

    themesEle.appendChild(h2);
  });
}

getThemes();
