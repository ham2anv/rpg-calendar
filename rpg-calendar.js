class Calendar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        const week = this.getAttribute('week') || 7;
        const length = this.getAttribute('length');
        const start = this.getAttribute('start')||1;

        const grid = createElement('div','rpg-calendar',{style:`--week:${week}`});
        const styles = createElement('link',{rel:"stylesheet",href:"rpg-calendar.css"});

        const firstCell = createElement('div',"rpg-calendar-cell rpg-calendar-first",{style:`--start:${start}`,day:1});
        firstCell.innerText = "1";
        const template = createElement('template');
        template.append(createElement('slot',{name:`day-1`}))
        firstCell.append(template);
        grid.append(firstCell);

        if (length>1) {
            for (let i = 0; i < length-1; i++) {
                const cell = createElement('div','rpg-calendar-cell',{day:i+2});
                cell.innerText = i+2;
                const temp = createElement('slot',{name:`day-${i+2}`});
        
                cell.append(temp);
                grid.append(cell);
            }
        }


        this.querySelectorAll('rpg-event').forEach(ev => {
            console.log("Beep");
            const day = ev.getAttribute('day');
            this.querySelector(`[day='${day}']`).append(ev);
        })

        
        this.shadowRoot.append(grid, styles);

    }

}

class CalendarEvent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});

        const day = this.getAttribute('day');
        this.setAttribute('slot',`day-${day}`)
        
        const event = createElement('div','rpg-calendar-event');
        event.innerHTML = `<span onclick="this.parentElement.querySelector('dialog').showModal()">${this.getAttribute('event-name')}</span>`;
        const dialog = createElement('dialog');
        const slot = createElement('slot');
        const form = createElement('form',{method:'dialog'});
        const button = createElement('button',{value:'default'})
        button.innerText = "Close";
        form.append(slot,button);
        dialog.append(form);
        
        
        event.append(dialog);

        this.shadowRoot.append(event);
    }
}

customElements.define("rpg-calendar",Calendar);
customElements.define("rpg-event",CalendarEvent);


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