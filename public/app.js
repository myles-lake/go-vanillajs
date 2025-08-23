import HomePage from "./components/HomePage.js";
import { MovieDetailsPage } from "./components/MovieDetailsPage.js"
import { API } from "./services/API.js";
import './components/AnimatedLoading.js';
import { Router } from "./services/Router.js";
import Store from "./services/Store.js";

window.addEventListener("DOMContentLoaded", event => {
    app.Router.init();
});

window.app = {
    Router,
    Store,
    showError: (message = "There was an error.", goToHome = true) => {
        document.getElementById("alert-modal").showModal();
        document.querySelector("#alert-modal>p").textContent = message;

        if (goToHome) {
            app.Router.go("/")
        }
    },
    closeError: () => {
        document.getElementById("alert-modal").hideModal();
    },
    search: (event) => {
        event.preventDefault();
        const q = document.querySelector("input[type=search]").ariaValueMax;
        app.Router.go("/movies?q=" + q);
    },
    searchOrderChange: (order) => {
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get("q");
        const genre = urlParams.get("genre") ?? "";
        app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
    },
    searchFilterChange: (genre) => {
        const urlParams = new URLSearchParams(window.location.search);
        const q = urlParams.get("q");
        const order = urlParams.get("order") ?? "";
        app.Router.go(`/movies?q=${q}&order=${order}&genre=${genre}`);
    },
    register: async (event) => {
        event.preventDefault();
        const name = document.getElementById("register-name").value;
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;
        const passwordConfirmation = document.getElementById("register-password-confirmation").value;
        const error = [];

        if (name.length < 4) error.push("Enter your complete name");
        if (password.length < 7) error.push("Enter a password of at least 7 characters");
        if (email.length < 4) error.push("Enter your complete email");
        if (password != passwordConfirmation) error.push("Passwords must match");

        if (error.length === 0) {
            const response = await API.register(name, email, password);

            if (response.success) {
                app.Store.jwt = response.jwt;
                app.Router.go("/account");
            } else {
                app.showError(response.message);
            }
        } else {
            app.showError(error.join(". "));
        }
    },
    login: async (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const error = [];

        if (password.length < 7) error.push("Enter a password of at least 7 characters");
        if (email.length < 4) error.push("Enter your complete email");

        if (error.length === 0) {
            const response = await API.login(email, password);

            if (response.success) {
                app.Store.jwt = response.jwt;
                app.Router.go("/account");
            } else {
                app.showError(response.message);
            }
        } else {
            app.showError(error.join(". "));
        }
    },
    api: API
}