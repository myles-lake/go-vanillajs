import { routes } from "./Routes.js";

export const Router = {
    init: () => {
        addEventListener("popstate", () => {
            Router.go(location.pathname, false);
        });

        document.querySelectorAll("a.navlink").forEach(a => {
            a.addEventListener("click", event => {
                event.preventDefault();
                const href = a.getAttribute("href");
                Router.go(href);
            });
        });
        Router.go(location.pathname + location.search);
    },
    go: (route, addToHistory = true) => {
        if (addToHistory) {
            history.pushState(null, "", route);
        }

        let pageElement = null;
        const routePath = route.includes("?") ? route.split("?")[0] : route;
        let needsLogin = false;

        for (const r of routes) {
            if (typeof r.path === "string" && r.path === routePath) {
                pageElement = new r.component();
                needsLogin = r.loggedIn == true;
                break;
            } else if (r.path instanceof RegExp) {
                const match = r.path.exec(route);
                if (match) {
                    pageElement = new r.component();
                    const params = match.slice(1);
                    pageElement.params = params;
                    needsLogin = r.loggedIn == true;
                    break;
                }
            }

        }

        if (pageElement) {
            if (needsLogin && app.Store.loggedIn == false) {
                app.Router.go("/account/login");
            }
        }

        if (pageElement == null) {
            pageElement = document.createElement("h1");
            pageElement.textContent = "Page not found";
        }

        // Clear and append the new page
        const main = document.querySelector("main");
        main.innerHTML = "";
        main.appendChild(pageElement);
    }
}