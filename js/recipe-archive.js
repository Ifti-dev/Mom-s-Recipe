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
                            <img src="assets/icons/user-placeholder.webp" alt="">
                            <p class="recipe-card-user-fullname"><a href="profile.html?slug=${recipe.user}">${recipe_owner(recipe.user).full_name}</a></p>
                        </div>
                    </div>
                </div>`
    console.log(recipe.user)
    recipe_card_container.innerHTML += recipe_card
});

