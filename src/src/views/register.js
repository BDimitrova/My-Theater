import { html } from "../../node_modules/lit-html/lit-html.js"

import { register } from "../api/data.js";

const template = (onSubmit) => html`
<section id="registerPage">
    <form @submit=${onSubmit} class="registerForm">
        <h2>Register</h2>
        <div class="on-dark">
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>

        <div class="on-dark">
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <div class="on-dark">
            <label for="repeatPassword">Repeat Password:</label>
            <input id="repeatPassword" name="repeatPassword" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Register</button>

        <p class="field">
            <span>If you have profile click <a href="/login">here</a></span>
        </p>
    </form>
</section>`

export async function registerPage(ctx) {
    ctx.render(template(onSubmit))

    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPass = formData.get('repeatPassword');

        if (repeatPass != password) {
            return window.alert('Password are not the same!');
        }
        if (repeatPass == '' || password == '' || email == '') {
            return window.alert('All fields are required!');
        }

        await register(email, password)

        ctx.setUserNav()
        ctx.page.redirect('/')
    }
}