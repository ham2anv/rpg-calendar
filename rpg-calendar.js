class Calendar extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.attachShadow({ mode: "open" });

        const week = this.getAttribute('week') || 7;
        const length = this.getAttribute('length');
        const start = this.getAttribute('start') || 1;
        const name = this.getAttribute('name');
        const days = this.getAttribute('days');

        const grid = createElement(
            'div',
            'rpg-calendar',
            {
                style:`--week:${week}`
            }
        );

        const styles = createElement(
            'link',
            {
                rel:"stylesheet",
                href:"rpg-calendar.css"
            }
        );

        if (name) {
            const title = createElement('h2','rpg-calendar-title');
            title.innerText = name;
            this.shadowRoot.append(title);
        }
        
        if (days) {
            for (let i = 0; i < week; i++) {
                console.log(i);
                const dayTitle = createElement('div','rpg-calendar-day');
                if(i < days.split(',').length) {
                    dayTitle.innerText = days.split(',')[i].trim();
                }
                grid.append(dayTitle);
            }
        }
        

        const firstCell = createElement(
            'div',
            "rpg-calendar-cell rpg-calendar-first",
            {
                style:`--start:${start}`,day:1
            }
        );
        firstCell.innerText = "1";

        const template = createElement('template');
        template.append(createElement('slot',{name:`day-1`}))
        
        firstCell.append(template);
        grid.append(firstCell);

        if (length>1) {
            for (let i = 0; i < length-1; i++) {
                const cell = createElement(
                    'div',
                    'rpg-calendar-cell',
                    {
                        day:i+2
                    }
                );
                cell.innerText = i+2;
                
                cell.append(createElement(
                    'slot',
                    {
                        name:`day-${i+2}`
                    }
                ));
                grid.append(cell);
            }
        }
        
        this.shadowRoot.append(grid, styles);

    }

}

class CalendarEvent extends HTMLElement {
    constructor() {
        super()
    }

    connectedCallback() {
        this.attachShadow({mode: 'open'});

        this.setAttribute('slot',`day-${this.getAttribute('day')}`)
        
        const event = createElement('div','rpg-calendar-event');
        if (this.getAttribute('color')) {
            event.setAttribute('style',`--event-color:${this.getAttribute('color')}`)
        }

        const eventText = createElement(
            'span',
            'rpg-calendar-event-text',
            {
                role: "button",
                tabindex: 0,
                onclick: "this.parentElement.querySelector('dialog').showModal()"
            }
        );
        eventText.innerText = this.getAttribute('event-name');
        
        const dialog = createElement('dialog','rpg-calendar-dialog');
        
        const style = createElement(
            'link',
            {
                rel:'stylesheet',
                href:'rpg-calendar.css'
            }
        );

        const eventTitle = createElement('h3','rpg-calendar-event-title');
        eventTitle.innerText = this.getAttribute('event-name');
        
        const form = createElement(
            'form',
            {
                method:'dialog'
            }
        );
        
        const slot = createElement('slot');
        
        const button = createElement(
            'button',
            'rpg-calendar-button',
            {
              value:'default'
            }
        );
        button.innerText = "Close";
        
        form.append(slot,button);
        dialog.append(style, eventTitle,form);
        event.append(eventText, dialog);

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