export class YouTubeEmbed extends HTMLElement {
    static get observerAttributes() {
        return ['data-url'];
    }

    attributeChangedCallback(prop, value) {
        if (prop === "data-url") {
            const url = this.dataset.url;
            const videoId = url.substring(url.indexOf("?v") + 3)
            this.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`
        }
    }
}

customElements.define("youtube-embed", YouTubeEmbed)