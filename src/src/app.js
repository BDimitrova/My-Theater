import { render } from '../node_modules/lit-html/lit-html.js';
import page from '../node_modules/page/page.mjs';

import { logout as apiLogout } from './api/api.js';
import { getUserData } from './utility.js';
import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { profilePage } from './views/profile.js';
import { registerPage } from './views/register.js';

const main = document.querySelector('#content');
setUserNav();
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page('/', decorateContext, homePage);
page('/login', decorateContext, loginPage);
page('/register', decorateContext, registerPage);
page('/create-event', decorateContext, createPage);
page('/details/:id', decorateContext, detailsPage);
page('/edit/:id', decorateContext, editPage);
page('/profile', decorateContext, profilePage);

page.start();


function decorateContext(ctx, next) {
  ctx.render = (content) => render(content, main);
  ctx.setUserNav = setUserNav;
  ctx.user = getUserData();

  next();
}

function setUserNav() {
  const user = getUserData()
  if (user) {
    document.querySelectorAll('.user').forEach(x => x.style.display = 'inline-block');
    document.querySelectorAll('.guest').forEach(x => x.style.display = 'none');
  } else {
    document.querySelectorAll('.user').forEach(x => x.style.display = 'none');
    document.querySelectorAll('.guest').forEach(x => x.style.display = 'inline-block');
  }
}

async function onLogout() {
  await apiLogout();
  setUserNav()
  page.redirect('/');
}