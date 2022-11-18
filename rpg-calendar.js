class Calendar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" }); 

        const grid = createElements('div','rpg-calendar');
        const styles = createElement('link',{rel:"stylesheet",href:"rpg-calendar.css"});

        
        this.shadowRoot.append(grid, styles);
    }

}

customElements.define("rpg-calendar",Calendar);


function createElement(element, styles=null, props=null) {
    if (arguments.length == 2 && typeof styles == "object") props = styles;
    const newElement = document.createElement(element);
    if (styles && props != styles) newElement.classList.add(styles.split(' '));
    if (props) {
        for (let [key,value] of Object.entries(props)) {
            newElement.setAttribute(key,value);
        }
    }
    return newElement;
}