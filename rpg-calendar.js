class Calendar extends HTMLElement {
  constructor() {
      super()
  }

  connectedCallback() {
      this.attachShadow({ mode: "open" });

      const week = this.getAttribute('week') || 7;
      const length = this.getAttribute('length') || 30;
      const start = this.getAttribute('start') || 1;
      const name = this.getAttribute('name');
      const days = this.getAttribute('days');

      const grid = createElement(
        'div',
        'rpg-calendar',
        { style:`--rpg-calendar-week:${week}` }
      );

      const styles = createElement('style');
      styles.innerText = `
        .rpg-calendar {
          display: grid;
          grid-template-columns: repeat(var(--rpg-calendar-week), calc(100% / var(--rpg-calendar-week)));
          background-color: var(--rpg-calendar-bg, white);
          color: var(--rpg-calendar-color, black);
        }
        
        .rpg-calendar-title {
          text-align: center;
        }
        
        .rpg-calendar-day {
          text-align: center;
        }
        
        .rpg-calendar-cell {
          aspect-ratio: 1 / 1;
          border: 1px dotted var(--rpg-calendar-cell-border, lightgray);
          overflow: scroll;
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .rpg-calendar-cell::-webkit-scrollbar {
          display: none;
        }
        
        .rpg-calendar-first {
          grid-column: var(--rpg-calendar-first-start);
        }
        
        @media screen and (max-device-width: 600px), screen and (max-width: 600px) {
          .rpg-calendar {
            display: block;
          }
          .rpg-calendar-cell {
            aspect-ratio: auto;
          }
          .rpg-calendar-cell:has(rpg-event) {
            display: none;
          }
          .rpg-calendar-day {
            display: none;
          }
        }`

      if (name) {
        const title = createElement('h2','rpg-calendar-title');
        title.innerText = name;
        this.shadowRoot.append(title);
      }
      
      if (days) {
        for (let i = 0; i < week; i++) {
          const dayTitle = createElement('div','rpg-calendar-day');
          if(i < days.split(',').length) 
            dayTitle.innerText = days.split(',')[i].trim();
          grid.append(dayTitle);
        }
      }
      

      const firstCell = createElement(
        'div',
        "rpg-calendar-cell rpg-calendar-first",
        {
          style: `--rpg-calendar-first-start:${start}`,
          day: 1
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
            { day: i + 2 }
          );
          cell.innerText = i+2;
          
          cell.append(createElement(
            'slot',
            { name: `day-${i + 2}` }
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
      
      const event = createElement(
        'div',
        'rpg-calendar-event',
        {
          onclick: "const dialog = this.querySelector('dialog'); if (dialog.open) {dialog.close()} else {dialog.showModal()}"
        }
      );
      if (this.getAttribute('color')) 
        event.setAttribute('style',`--rpg-calendar-event-color:${this.getAttribute('color')}`);

      const eventText = createElement(
        'span',
        'rpg-calendar-event-text',
        {
          role: "button",
          tabindex: 0,
        }
      );
      eventText.innerText = this.getAttribute('event-name');
      
      const dialog = createElement('dialog','rpg-calendar-dialog');
      
      const style = createElement('style');
      style.innerText = `
        .rpg-calendar-event {
          background-color: var(--rpg-calendar-event-color, royalblue);
          padding: 0 calc(var(--rpg-calendar-event-spacing, 0.1em) * 2);
          margin: var(--rpg-calendar-event-spacing, 0.1em);
          border-radius: calc(var(--rpg-calendar-event-spacing, 0.1em) * 2);
          cursor: pointer;
          height: 1.1rem;
          display: flex;
          align-items: center;
        }
        
        .rpg-calendar-event-text {
          font-size: calc(var(--rpg-calendar-event-spacing, 0.1em) * 8);
          padding: var(--rpg-calendar-event-spacing, 0.1em) 0;
          background: inherit;
          background-clip: text;
          color: transparent;
          filter: invert(1) brightness(200%) grayscale(1);
          font-weight: bold;
          white-space: nowrap;
          overflow: hidden;
          width: 100%;
        }
        
        .rpg-calendar-dialog {
          border: 1px solid black;
          max-block-size: min(80vh, calc(100% - 2em));
          max-block-size: min(80dvb, calc(100% - 2em));
          max-inline-size: min(calc(100% - 2em), 60ch);
          box-shadow: 2px 2px 10px 1px #0004;
          cursor: auto;
        }
        
        .rpg-calendar-button {
          float: right;
        }`

      const eventTitle = createElement('h3','rpg-calendar-event-title');
      eventTitle.innerText = this.getAttribute('event-name');
      
      const form = createElement(
        'form',
        { method:'dialog' }
      );
      
      const slot = createElement('slot');
      
      const button = createElement(
        'button',
        'rpg-calendar-button',
        { value:'default' }
      );
      button.innerText = "Close";
      
      form.append(slot,button);
      dialog.append(style, eventTitle,form);
      event.append(eventText, dialog);

      this.shadowRoot.append(event);
  }
}

customElements.define("rpg-calendar", Calendar);
customElements.define("rpg-event", CalendarEvent);


function createElement(element, styles=null, props=null) {
  if (arguments.length == 2 && typeof styles == "object") props = styles;
  const newElement = document.createElement(element);
  if (styles && props != styles) 
    newElement.classList.add(...styles.split(' '));
  if (props) {
    for (let [key,value] of Object.entries(props)) {
      newElement.setAttribute(key,value);
    }
  }
  return newElement;
}