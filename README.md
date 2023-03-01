# rpg-calendar
A web component for adding custom calendars to your RPG page.

## Installing
On any page where you want to add a calendar:

1. Include a `<script>` with a `src` attribute linking to the `rpg-calendar.js` file on your site.
2. Add a `<rpg-calendar>` element with any number of child `<rpg-event>` elements.

## \<rpg-calendar\>
The `<rpg-calendar>` element is the container for your calendar. Each `<rpg-calendar>` element represents one month.

`<rpg-calendar>` can take a number of attributes (all optional):

- `name` is the title of your calendar, and will be displayed above it as an `<h2>`.
- `length` is the number of days in the month. Default: 30.
- `week` is the number of days in each week. Default: 7.
- `start` is the day of the week on which the first day of the month falls. Default: 1.
- `days` is a list of names of the days of the week, separated by commas. Example: `"Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday"`

## \<rpg-event\>
The `<rpg-event>` element represents a single event on your calendar. It must be a child of a `<rpg-calendar>` element.

`<rpg-event>` can take a number of attributes:

- `event-name` (required) is the title of your event. It will appear in the tag in the main calendar and as an `<h3>` in the event dialog.
- `day` (required) is the day of the month on which the event occurs.
- `color` (optional) is a CSS-legal color value for the tag in the main calendar. Default: `royalblue`.

The contents of the `<rpg-event>` element are displayed as a modal dialog when the user clicks on the event tag.

## Styling
You can style your calendars using CSS Custom Properties in any element that contains a `<rpg-calendar>` element.

```css
.calendar-holder {
  --rpg-calendar-bg: #333;
  --rpg-calendar-color: #fafafa;
}
```

Thanks to the cascade, these values will filter down to any calendar within that element.

The custom properties for calendars are:
- `--rpg-calendar-bg`: The `background-color` for the calendar. Default: `white`.
- `--rpg-calendar-color`: The `color` for the calendar. Default: `black`.
- `--rpg-calendar-cell-border`: The color of the calendar cell border. Default: `lightgray`.

The custom properties for events are:

- `--rpg-calendar-event-color`: The default `background-color` for event tags. Default: `royalblue`.
- `--rpg-calendar-event-spacing`: Scales the `padding`, `margin`, and `border-radius` values of events. Default: `0.1em`.