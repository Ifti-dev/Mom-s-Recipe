
let pram = new URLSearchParams(window.location.search)
let slug = pram.get("slug")
//user_list is already declared at recipe-archive.js
const creator = user_list.find(user=>user.user_name == slug)

const creator_profile_fullname = document.querySelector("#creator-profile-fullname")

creator_profile_fullname.textContent = creator.full_name