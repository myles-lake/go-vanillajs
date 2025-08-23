const Store = {
    jwt: null,
    get loggedIn() {
        return this.jwt !== null
    },
}

if (localStorage.getItem("jwt")) {
    Store.jwt = localStorage.getItem("jwt");
}

const proxiedStore = new Proxy(Store, {
    set: (targer, prop, value) => {
        if (prop == "jwt") {
            targer[prop] = value;
            localStorage.setItem("jwt", value);
        }

        return true;
    }
});

export default proxiedStore;