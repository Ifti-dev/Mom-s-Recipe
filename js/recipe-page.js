const recipe_list = JSON.parse(localStorage.getItem("recipe_list"))
const curr_recipe = JSON.parse(localStorage.getItem("curr_recipe"))
const get_currrent_recipe_data = recipe_list.find(recipe=> recipe.recipe_unique_id==curr_recipe)

const user_list = JSON.parse(localStorage.getItem("user_list"))
const logged_in_user = JSON.parse(localStorage.getItem("user_login_data"))
const get_currrent_user_data = user_list.find(user=> user.user_name==logged_in_user.user_name)


const single_recipe_wrapper = document.querySelector(".single-recipe-wrapper")
single_recipe_wrapper.innerHTML = `<h1>${get_currrent_recipe_data.title}</h1>
            <div class="img_container">
                <img src="${get_currrent_recipe_data.img}" alt="">
            </div>
            <div class="recipe-page-body"> 
            
            <p>Total Serving: ${get_currrent_recipe_data.total_serving}</p>
            <p>Cook Hour: ${get_currrent_recipe_data.cook_hour}</p>
            <p>Cook Minute: ${get_currrent_recipe_data.cook_min}</p>
            <p>${get_currrent_recipe_data.desc}</p>
            
            <div class="wishlist-btn-container">
                <button id="wishlist-btn">Wishlist</button>
                <div class="must-log-in-pop-up">
                    <h3>Wishlist this recipe?</h3>
                    <p>Sign in to make your wishlist count</p>
                    <a href="login.html">Sign in</a>
                </div>
            </div>
            
            <h2>Ingredients</h2>
            <ol id="ingredient_container">
                
            </ol>
            <h2>Instructions</h2>
            <ol id="instruction_container">
                
            </ol>
            </div>`

//For Wishlist functionality
const wishlist_btn = document.querySelector("#wishlist-btn")
const wishlist_pop_up = document.querySelector(".must-log-in-pop-up")


const body = document.querySelector("body")
wishlist_btn.addEventListener("click",()=>{
    if(logged_in_user){
        //Updating the recipe wishlist count
        get_currrent_recipe_data.wishlist_count+=1
        localStorage.setItem("recipe_list",JSON.stringify(recipe_list))
        
        //Adding the wishlisted recipe in user wishlist
        get_currrent_user_data.wishlist.push(get_currrent_recipe_data.recipe_unique_id)
        localStorage.setItem("user_list",JSON.stringify(user_list))
    }
    else{
        wishlist_pop_up.style.display = "flex"
    }   
})

body.addEventListener("click",(e)=>{
    
    if(!e.target.closest(".must-log-in-pop-up") && e.target.id !== "wishlist-btn"){
        wishlist_pop_up.style.display = "none"
        console.log("llllll")
    }
})



//For ingredient and instruction step creation
const to_do_list_creation = (list,container)=>{
    list.forEach(element => {
        
        const new_li = document.createElement("li")
        new_li.textContent = element
        
        container.appendChild(new_li)
    });
}     
const ingredient_container = document.getElementById("ingredient_container")
const instruction_container= document.getElementById("instruction_container")
to_do_list_creation(get_currrent_recipe_data.ingredient_list_data,ingredient_container)
to_do_list_creation(get_currrent_recipe_data.instruction_list_data,instruction_container)       

//For ingredient and instruction step to do functionality like cross the step after fulfilled
const to_do_list_functionality=(cont)=>{
    cont.addEventListener("click",(e)=>{
        if(e.target.tagName == "LI"){
            console.log(e.target)
            e.target.classList.toggle("strike")
        }
    })
}

to_do_list_functionality(ingredient_container)
to_do_list_functionality(instruction_container)