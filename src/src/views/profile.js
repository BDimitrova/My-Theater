import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMyTheater } from '../api/data.js';
import { theaterTamplate } from './common/theater.js';

const profileTamplate = (theater, email) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${email}</h2>
    </div>
    <div class="board">
        <!--If there are event-->
        ${theater.length == 0 ? html `<div class="no-events">
            <p>This user has no events yet!</p>
        </div>` : theater.map(theaterTamplate)}
    </div>
</section>
`;

export async function profilePage(ctx) {
    const user = ctx.user._id;
    const theater = await getMyTheater(user);
    console.log(theater);
    const email = ctx.user.email;
    ctx.render(profileTamplate(theater, email))
}