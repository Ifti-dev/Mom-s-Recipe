const recipe_list = JSON.parse(localStorage.getItem("recipe_list"))
const user_list = JSON.parse(localStorage.getItem("user_list"))

const recipe_card_container = document.querySelector(".recipe-card-container")

const recipe_owner = (user_name)=>{
    return user_list.find((user)=>user.user_id==user_name)
}

//clicking on recipe card
recipe_card_container.addEventListener("click",(e)=>{
    let card = e.target.closest(".recipe-card")
    if(card)
        console.log(card)
        localStorage.setItem("curr_recipe",JSON.stringify(card.dataset.unique_id))
    
})

// added new a tag for redirecting in new page
recipe_list.forEach(recipe => {
    let recipe_card = `<div class="recipe-card" data-unique_id ="${recipe.recipe_unique_id}">
                    <div class="recipe-card-img-container">
                        <img src="${recipe.img}" alt="">
                    </div>
                    <div class="recipe-card-body">
                        <h3><a href="recipe-page.html?slug=${recipe.slug}">${recipe.title}</a></h3>
                        <div class="recipe-card-user">
                            <img src="assets/icons/user-placeholder.webp" alt="">
                            <p class="recipe-card-user-fullname">${recipe_owner(recipe.user_name).full_name}</p>
                        </div>
                    </div>
                </div>`
    console.log(recipe.recipe_unique_id)
    recipe_card_container.innerHTML += recipe_card
});

