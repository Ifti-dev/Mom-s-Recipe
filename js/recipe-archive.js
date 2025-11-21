const recipe_list = JSON.parse(localStorage.getItem("recipe_list"))
const user_list = JSON.parse(localStorage.getItem("user_list"))

const recipe_card_container = document.querySelector(".recipe-card-container")

const recipe_owner = (user_name)=>{
    return user_list.find((user)=>user.user_name==user_name)
}

//Recipe list checker
let recipe_show_list
if(document.body.id=="creator-profile-page"){
    let pram = new URLSearchParams(window.location.search)
    let slug = pram.get("slug")
    recipe_show_list = recipe_list.filter(recipe=>recipe.user == slug) 
}
else{
    recipe_show_list = recipe_list
}
    


//clicking on recipe card
recipe_card_container.addEventListener("click",(e)=>{
    let card = e.target.closest(".recipe-card")
    if(card)
        console.log(card)
        localStorage.setItem("curr_recipe",JSON.stringify(card.dataset.unique_id))
    
})

// added new a tag for redirecting in new page
recipe_show_list.forEach(recipe => {
    let recipe_card = `<div class="recipe-card" data-unique_id ="${recipe.recipe_unique_id}">
                    <div class="recipe-card-img-container">
                        <img src="${recipe.img}" alt="">
                    </div>
                    <div class="recipe-card-body">
                        <h3><a href="recipe-page.html?slug=${recipe.slug}">${recipe.title}</a></h3>
                        <div class="recipe-card-user">
                            <div class="recipe-card-user-img-cont">
                                <p class="profile-pic-default">I</p>
                                <img src="${recipe_owner(recipe.user).profile_pic}" alt="" class="profile-pic">
                            </div>
                            <p class="recipe-card-user-fullname"><a href="profile.html?slug=${recipe.user}">${recipe_owner(recipe.user).full_name}</a></p>
                        </div>
                    </div>
                </div>`
    console.log(recipe.user)
    //we bought this at top because initially there is no card so there is nothing to update
    recipe_card_container.innerHTML += recipe_card

    //if we directly use document.q... to the pic or default pic it will select all cards and as we can't use id to get the specific card, 
    //we take the last card of the container which is added at the previous line(eg. latest card)and update that cards elements
    const curr_card = recipe_card_container.lastElementChild
    
    const profile_pic = curr_card.querySelector(".profile-pic")
    const profile_pic_default = curr_card.querySelector(".profile-pic-default")

    if(recipe_owner(recipe.user).profile_pic !=""){
        profile_pic.src = recipe_owner(recipe.user).profile_pic
        profile_pic.style.display = "block"
        profile_pic_default.style.display = "none"
        console.log("ooo")    
    }

    else{
        profile_pic_default.textContent = recipe_owner(recipe.user).user_name[0]
        profile_pic.style.display = "none"
        profile_pic_default.style.display = "block"
    }
});
