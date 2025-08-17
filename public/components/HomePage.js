import { API } from "../services/API.js";
import { MovieItem } from "./MovieItem.js";

const HomePage = class extends HTMLElement {
    async render() {
        const topMovies = await API.getTopMovies();
        renderMoviesInList(topMovies, this.querySelector("#top-10 ul"))
        const randomMovies = await API.getRandomMovies();
        renderMoviesInList(randomMovies, this.querySelector("#random ul"))

        function renderMoviesInList(movies, ul) {
            if (!movies || !ul) return;  // Add safety check
            ul.innerHTML = "";

            movies.forEach(movie => {
                const li = document.createElement("li");
                li.appendChild(new MovieItem(movie));
                ul.appendChild(li);
            })
        }
    }

    connectedCallback() {
        const template = document.getElementById("template-home");
        const content = template.content.cloneNode(true);
        this.appendChild(content);
        this.render();
    }
}

customElements.define("home-page", HomePage);
export default HomePage;