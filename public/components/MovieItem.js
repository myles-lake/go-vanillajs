export class MovieItem extends HTMLElement {
    constructor(movie) {
        super();

        this.movie = movie;
    }

    connectedCallback() {
        this.innerHTML = `
            <a href="#">
                <article>
                    <img src="${this.movie.poster_url}" alt="">
                    <p>${this.movie.title} (${this.movie.release_year})</p>
                </article>
            </a>
        `;
    }
}

customElements.define("movie-item", MovieItem)