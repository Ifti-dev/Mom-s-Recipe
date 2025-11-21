
let pram = new URLSearchParams(window.location.search)
let slug = pram.get("slug")
//user_list is already declared at recipe-archive.js
const creator = user_list.find(user=>user.user_name == slug)

const creator_profile_fullname = document.querySelector("#creator-profile-fullname")
const creator_profile_img = document.querySelector("#creator-profile-img")
const creator_profile_pic_default = document.querySelector(".creator-profile-pic-default")

creator_profile_fullname.textContent = creator.full_name
creator_profile_img.src = creator.profile_pic

if(creator.profile_pic !=""){
        creator_profile_img.src = creator.profile_pic
        creator_profile_img.style.display = "block"
        creator_profile_pic_default.style.display = "none"
        
    }

else{
    console.log("ooo")    
    creator_profile_pic_default.textContent = creator.user_name[0]
    creator_profile_img.style.display = "none"
    creator_profile_pic_default.style.display = "block"
}