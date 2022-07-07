import * as api from './api.js';

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

// Application-specific request
// get all ads
export async function getAllTheaters() {
    return await api.get(host + '/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

// get ad by id
export async function getTheaterById(id) {
    return await api.get(host + `/data/theaters/${id}`);
}

// create ad
export async function createTheater(listing) {
    return await api.post(host + '/data/theaters', listing);
}

// edit ad by id
export async function editTheaterById(id, listing) {
    return await api.put(host + `/data/theaters/${id}`, listing);
}

// delete ad by id
export async function deleteTheaterById(id) {
    return await api.del(host + `/data/theaters/${id}`)
}

// get my ads
export async function getMyTheater(userId) {
    return await api.get(host + `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function likeTheater(theaterId) {
    return await api.post(host + `/data/likes`, theaterId);
}

export async function getTotalLikesCount(theaterId){
    return await api.get(host + `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}


export async function didUserLikeTheater(theaterId, userId){
    return await api.get(host + `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}