class Calendar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        const week = this.getAttribute('week') || 7;
        const length = this.getAttribute('length');

        const grid = createElement('div','rpg-calendar',{style:`--week:${week}`});
        const styles = createElement('link',{rel:"stylesheet",href:"rpg-calendar.css"});

        const firstCell = createElement('div',"rpg-calendar-cell rpg-calendar-first");
        firstCell.innerText = "1";
        grid.append(firstCell);

        if (length>1) {
            for (let i = 0; i < length-1; i++) {
                const cell = createElement('div','rpg-calendar-cell');
                cell.innerText = i+2;
                grid.append(cell);
            }
        }

        
        this.shadowRoot.append(grid, styles);
    }

}

customElements.define("rpg-calendar",Calendar);


function createElement(element, styles=null, props=null) {
    if (arguments.length == 2 && typeof styles == "object") props = styles;
    const newElement = document.createElement(element);
    if (styles && props != styles) newElement.classList.add(...styles.split(' '));
    if (props) {
        for (let [key,value] of Object.entries(props)) {
            newElement.setAttribute(key,value);
        }
    }
    return newElement;
}