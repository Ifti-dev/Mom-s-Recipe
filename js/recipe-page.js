const recipe_list = JSON.parse(localStorage.getItem("recipe_list"))

const curr_recipe = JSON.parse(localStorage.getItem("curr_recipe"))

const get_currrent_recipe_data = recipe_list.find(recipe=> recipe.recipe_unique_id==curr_recipe)





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
            <button id="wishlist-btn">Wishlist</button>
            
            <h2>Ingredients</h2>
            <ol id="ingredient_container">
                
            </ol>
            <h2>Instructions</h2>
            <ol id="instruction_container">
                
            </ol>
            </div>`


const wishlist_btn = document.querySelector("#wishlist-btn")
wishlist_btn.addEventListener("click",()=>{
    get_currrent_recipe_data.wishlist_count+=1
    localStorage.setItem("recipe_list",JSON.stringify(recipe_list))
})


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