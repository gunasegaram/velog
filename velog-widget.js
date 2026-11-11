class VeLogWidget extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        .widget {
          position: fixed;
          right: 24px;
          bottom: 24px;
          z-index: 100;
          font: 14px/1.5 system-ui, sans-serif;
        }

        button {
          width: 54px;
          height: 54px;
          border: 0;
          border-radius: 50%;
          background: #8e2f2b;
          color: white;
          font-size: 22px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 5px 18px #21253630;
        }

        .panel {
          width: min(300px, calc(100vw - 32px));
          margin-bottom: 12px;
          padding: 18px;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          background: white;
          color: #232735;
          box-shadow: 0 8px 28px #21253620;
        }

        .panel h2 {
          margin: 0 0 8px;
          font-size: 16px;
        }

        .panel p {
          margin: 0 0 14px;
          color: #727785;
        }

        .panel a {
          color: #8e2f2b;
          font-weight: 700;
          text-decoration: none;
        }

        button:focus-visible,
        a:focus-visible {
          outline: 3px solid #bd7774;
          outline-offset: 3px;
        }

        @media (max-width: 600px) {
          .widget {
            right: 16px;
            bottom: 16px;
          }
        }
      </style>

      <div class="widget">
        <section class="panel" id="panel" aria-labelledby="title" hidden>
          <h2 id="title">Brauchst du Hilfe?</h2>
          <p>Bei Fragen erreichst du uns über den Kommunikationsbereich.</p>
          <a href="kommunikation.html">Kommunikation öffnen →</a>
        </section>
        <button type="button" aria-label="Hilfe öffnen" aria-expanded="false">
          ?
        </button>
      </div>
    `;

    const button = this.shadowRoot.querySelector("button");
    const panel = this.shadowRoot.querySelector("#panel");

    button.addEventListener("click", () => {
      const isOpen = !panel.hidden;
      panel.hidden = isOpen;
      button.setAttribute("aria-expanded", String(!isOpen));
      button.setAttribute("aria-label", isOpen ? "Hilfe öffnen" : "Hilfe schließen");
    });
  }
}

customElements.define("ve-log-widget", VeLogWidget);
