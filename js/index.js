import templates from "./meme-templates.js";

const canvas = new fabric.Canvas("canvas");
const selectorsContainer = document.getElementById("template-selectors");

for (const template of templates) {
    const selector = createSelector(template);
    selectorsContainer.appendChild(selector);
}

selectorsContainer.firstChild.classList.add("selected-template");
renderTemplate(templates[0]);

const downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", () => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = `meme-generator-${new Date().getTime()}.png`;
    link.click();
});

function createSelector(template) {
    const selector = document.createElement("button");

    selector.innerText = template.name;
    selector.onclick = function () {
        document
            .querySelector(".selected-template")
            .classList.remove("selected-template");
        this.classList.add("selected-template");
        renderTemplate(template);
    };

    return selector;
}

function renderTemplate(template) {
    const { width, height, backgroundUrl, textFields } = template;

    canvas.clear();

    canvas.setDimensions({ width, height });
    canvas.setBackgroundImage(backgroundUrl, canvas.renderAll.bind(canvas));

    const iTextFields = textFields.map(
        ({ text, ...options }) => new fabric.IText(text, options)
    );
    canvas.add(...iTextFields);
}
