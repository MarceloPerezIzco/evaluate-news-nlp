/**
 * Test for handleSubmit:
 * - Validates empty URL -> displays error
 * - Response OK -> Updates the DOM
 */
import { handleSubmit } from "../src/client/js/formHandler.js";

// Helpers DOM
function setDOM() {
    document.body.innerHTML = `
    <form id="url-form">
      <input id="article-url" />
      <button type="submit">Submit</button>
    </form>
    <section id="results">
      <h2>Analysis</h2>
      <p><strong>Sentiment:</strong> <span id="sentiment">—</span></p>
      <p><strong>Content type:</strong> <span id="contentType">—</span></p>
      <p><strong>Preview:</strong> <span id="preview">—</span></p>
      <div id="error" role="alert" style="display:none;"></div>
    </section>
  `;
}

describe("formHandler.handleSubmit", () => {
    beforeEach(() => {
        setDOM();
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    test("displays error when URL is empty", async () => {
        const form = document.getElementById("url-form");
        const input = document.getElementById("article-url");
        const errorEl = document.getElementById("error");

        input.value = "   ";

        const fakeEvent = { preventDefault: jest.fn() };
        await handleSubmit(fakeEvent);

        expect(fakeEvent.preventDefault).toHaveBeenCalled();
        expect(errorEl.style.display).toBe("block");
        expect(errorEl.textContent).toMatch(/valid url/i);
    });

    test("renderiza datos cuando la API responde OK", async () => {
        const input = document.getElementById("article-url");
        input.value = "https://example.com/article";

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                sentiment: "POSITIVE",
                text: "Hello World",
                subjectivity: "SUBJECTIVE",
            }),
        });

        const fakeEvent = { preventDefault: jest.fn() };
        await handleSubmit(fakeEvent);

        expect(global.fetch).toHaveBeenCalledWith("http://localhost:3000/analyse", expect.objectContaining({ method: "POST" }));

        expect(document.getElementById("sentiment").textContent).toBe("POSITIVE");
        expect(document.getElementById("preview").textContent).toBe("Hello World");
    });
});
