const recipe_list = JSON.parse(localStorage.getItem("recipe_list"))
const user_list = JSON.parse(localStorage.getItem("user_list"))

const recipe_card_container = document.querySelector(".recipe-card-container")

const recipe_owner = (user_name)=>{
    return user_list.find((user)=>user.user_id==user_name)
}


recipe_list.forEach(recipe => {
    let recipe_card = `<div class="recipe-card" data-unique_id ="${recipe.recipe_unique_id}">
                    <div class="recipe-card-img-container">
                        <img src="${recipe.img}" alt="">
                    </div>
                    <div class="recipe-card-body">
                        <h3>${recipe.title}</h3>
                        <div class="recipe-card-user">
                            <img src="assets/icons/user-placeholder.webp" alt="">
                            <p class="recipe-card-user-fullname">${recipe_owner(recipe.user_name).full_name}</p>
                        </div>
                    </div>
                </div>`
    console.log(recipe.recipe_unique_id)
    recipe_card_container.innerHTML += recipe_card
});