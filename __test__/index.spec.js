/**
 * Test for index.js:
 * - attachFormHandler adds the listener to the form
 */
import { attachFormHandler } from "../src/client/js/index.js";

describe("index.attachFormHandler", () => {
    beforeEach(() => {
        document.body.innerHTML = `
      <form id="url-form"><input id="article-url" /></form>
    `;
    });

    test("adds listener to the form", () => {
        const form = document.getElementById("url-form");
        const spy = jest.spyOn(form, "addEventListener");

        attachFormHandler();

        expect(spy).toHaveBeenCalledWith("submit", expect.any(Function));
    });
});
