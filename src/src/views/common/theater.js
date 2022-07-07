import { html } from '../../../node_modules/lit-html/lit-html.js';

export const theaterTamplate = (theater) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src="${theater.imageUrl}">
        <h2>${theater.title}</h2>
        <h6>${theater.date}</h6>
        <a href="/details/${theater._id}" class="details-button">Details</a>
    </div>
</div>
`;