import { html } from "../../node_modules/lit-html/lit-html.js"

import { login } from "../api/data.js";

const template = (onSubmit) => html`
<section id="loginaPage">
    <form @submit=${onSubmit} class="loginForm">
        <h2>Login</h2>
        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>
        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>
        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </form>
</section>`

export async function loginPage(ctx) {
    ctx.render(template(onSubmit))

    async function onSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const email = formData.get('email')
        const password = formData.get('password')

        if (email == '' || password == '') {
            return window.alert('All fields are required!');
        }

        await login(email, password)

        ctx.setUserNav()
        ctx.page.redirect('/')
    }
}