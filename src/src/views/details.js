import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteTheaterById, getTheaterById, getTotalLikesCount, likeTheater, didUserLikeTheater } from '../api/data.js';

const tamplate = (theatr, isOwner, onDelete, isLoggedIn, totalLikesCount, onClickLike, didUserLike) => html`
<section id="detailsPage">
    <div id="detailsBox">
        <div class="detailsInfo">
            <h1>Title: ${theatr.title}</h1>
            <div>
                <img src="${theatr.imageUrl}" />
            </div>
        </div>

        <div class="details">
            <h3>Theater Description</h3>
            <p>${theatr.description}</p>
            <h4>Date: ${theatr.date}</h4>
            <h4>Author: ${theatr.author}</h4>
            <div class="buttons">
                ${isOwner ? 
                html `<a class="btn-delete" @click=${onDelete} href="javascript:void(0)">Delete</a>
                <a class="btn-edit" href="/edit/${theatr._id}">Edit</a>` : ''}
            
                ${(() => {
                if (didUserLike == 0) {
                    if (isLoggedIn && !isOwner) {        
                        return html`<a class="btn-like" @click=${onClickLike} href="javascript:void(0)">Like</a>`
                    }
                }
            })()}
                <span class="likes">Likes: ${totalLikesCount}</span>
            </div>
        </div>
    </div>
</section>
`;


export async function detailsPage(ctx) {
    const theaterId = ctx.params.id;
    const theatr = await getTheaterById(theaterId);
    const user = ctx.user;

    let userId;
    let totalLikesCount;
    let didUserLike;

    if (user != null) {
        userId = user._id
        didUserLike = await didUserLikeTheater(theaterId, userId);
    }
    console.log(userId);
    const isOwner = user && theatr._ownerId == user._id;
    const isLoggedIn = user !== undefined;

    totalLikesCount = await getTotalLikesCount(theaterId);
    update();

    async function onClickLike() {

        const like = {
            theaterId,
        }

        await likeTheater(like);

        totalLikesCount = await getTotalLikesCount(theaterId);
        didUserLike = await didUserLikeTheater(theaterId, userId);
        update()
    }

    async function update() {
        ctx.render(tamplate(theatr, isOwner, onDelete, isLoggedIn, totalLikesCount, onClickLike, didUserLike))
    }

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if (confirmed) {
            await deleteTheaterById(theaterId);
            ctx.page.redirect('/');
        }
    }
}