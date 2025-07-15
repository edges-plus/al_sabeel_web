const handleKeyDown = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();

        const form = e.target.form;
        const elements = Array.from(form.querySelectorAll("input, textarea")).filter(
            (el) =>
                !el.disabled &&
                el.type !== "hidden" &&
                el.offsetParent !== null && // skip visually hidden
                el.getAttribute("aria-hidden") !== "true" &&
                !el.closest('[role="presentation"]') // skip hidden MUI Autocomplete clones
        );

        const index = elements.indexOf(e.target);
        const next = elements[index + 1];
        if (index === elements.length - 1) {
            form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
            return;
        }

        if (next) {
            next.focus();
        }
    }
};

export default handleKeyDown;
