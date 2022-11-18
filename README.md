# rpg-calendar
A web component for adding custom calendars to your RPG page.

## Installing
Once you have the files, change line 1 of `rpg-calendar.js` so that the value of `CSSPATH` is the location of the `rpg-calendar.css` file on your site.

On any page where you want to add a calendar, you must:

1. Include a `<script>` with a `src` attribute linking to the `rpg-calendar.js` file on your site.
2. Add a `<rpg-calendar>` element with any number of child `<rpg-event>` elements.

## rpg-calendar
The `<rpg-calendar>` element is the container for your calendar. Each `<rpg-calendar>` element represents one month.

`<rpg-calendar>` can take a number of attributes (all optional):

- `name` is the title of your calendar, and will be displayed above it as an `<h2>`.
- `length` is the number of days in the month. Default: 30.
- `week` is the number of days in each week. Default: 7.
- `start` is the day of the week on which the first day of the month falls. Default: 1.
- `days` is a list of names of the days of the week, separated by commas. Example: `"Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday"`

## rpg-event
The `<rpg-event>` element represents a single event on your calendar. It must be a child of a `<rpg-calendar>` element.

`<rpg-event>` can take a number of attributes:

- `event-name` (required) is the title of your event. It will appear in the tag in the main calendar and as an `<h3>` in the event dialog.
- `day` (required) is the day of the month on which the event occurs.
- `color` (optional) is a CSS-legal color value for the tag in the main calendar. Default: `royalblue`.

The contents of the `<rpg-event>` element are displayed as a modal dialog when the user clicks on the event tag.