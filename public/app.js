import { HomePage } from "./components/HomePage.js";
import { MovieDetailsPage } from "./components/MovieDetailsPage.js"
import { API } from "./services/api.js";
import './components/AnimatedLoading.js';

window.addEventListener("DOMContentLoaded", event => {
    document.querySelector("main").appendChild(new HomePage());
    document.querySelector("main").appendChild(new MovieDetailsPage());
});

window.app = {
    search: (event) => {
        event.preventDefault();
        const q = document.querySelector("input[type=search]").ariaValueMax;
    },
    api: API
}