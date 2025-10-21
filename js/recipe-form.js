const add_ingredient_btn = document.querySelector("#add-ingredient-btn")
const add_instruction_btn = document.querySelector("#add-instruction-btn")
const add_ingredient_list = document.querySelector(".ingredient-list")
const add_instruction_list = document.querySelector(".instruction-list")


const create_new_li = (ul_container)=>{
    const new_li = document.createElement("li")

    const new_li_input = document.createElement("input")
    new_li_input.type = "text"

    const new_li_delete = document.createElement("input")
    new_li_delete.type = "button"
    new_li_delete.value = "X"

    new_li.appendChild(new_li_input)
    new_li.appendChild(new_li_delete)

    ul_container.appendChild(new_li)
    
}

const delete_li = (e)=>{
    if(e.target.type == "button"){
        e.target.parentElement.remove()
    }
}


add_instruction_btn.addEventListener("click",()=>{
    create_new_li(add_instruction_list)
})
add_ingredient_btn.addEventListener("click",()=>{
    create_new_li(add_ingredient_list)
})

add_ingredient_list.addEventListener("click",(e)=>{delete_li(e)})
add_instruction_list.addEventListener("click",(e)=>{delete_li(e)})

const get_li_inp_text_value = (ul_container)=>{
    const ul_list = ul_container.querySelectorAll("li")
    return Array.from(ul_list).map((e)=>{
        let list = e.querySelector("input")
        if(list.type == "text")
        {   
            return list.value
        }
    })
}



const recipe_list = JSON.parse(localStorage.getItem("recipe_list"))||[]
//so if there is no recipe is available in local storage (ie. false) than an empty array will be taken where 1st recipe is stored
//and if there is recipe avialable than the srtingified recipe_list is taken from the local storage and converted to its original array version

const recipe_form = document.querySelector("#recipe-form")
const recipe_form_file = document.querySelector("#recipe-form-file")
recipe_form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const recipe_form_title = document.getElementById("recipe-form-title")
    const recipe_form_desc = document.getElementById("recipe-form-desc")
    const recipe_form_cook_hour = document.getElementById("recipe-form-cook-hour")
    const recipe_form_cook_min = document.getElementById("recipe-form-cook-min")
    
    const file_reader = new FileReader()
    file_reader.readAsDataURL(recipe_form_file.files[0])
    file_reader.onload = ()=>{
        let img_src = file_reader.result
        
        recipe_list.push(
            {
                title : recipe_form_title.value,
                desc : recipe_form_desc.value,
                img : img_src,
                cook_hour : recipe_form_cook_hour.value,
                cook_min : recipe_form_cook_min.value,
                ingredient_list_data : get_li_inp_text_value(add_ingredient_list),
                instruction_list_data : get_li_inp_text_value(add_instruction_list),
                recipe_id:recipe_list.length
            }
        )
        
        console.log(recipe_list)
        localStorage.setItem("recipe_list",JSON.stringify(recipe_list)) //storing recipe list in local storage in json string format 
        //it gets stored as stringified version of recipe_list = [] at first and then...
        
        check_recipe_list_to_create_card_db()
        //To update recipe container in real time. Dont worry the func will not create cards multiple times as we are repfreshing it each time it is called = ``
    }
})



const recipe_list_dashboard = document.querySelector(".recipe-list-body")

const create_recipe_card_db = (title,img_src,recipe_id)=>{
    let new_recipe = `
                    <div class="recipe-dashboard-card">
                        <div class="recipe-dashboard-card-img">
                            <img src="${img_src}" alt="">
                        </div>
                        <div class="recipe-dashboard-card-body">
                            <div class="recipe-dashboard-card-info">
                                <h3>${title}</h3>
                                <p>Recipe Id: <span>${recipe_id}</span></p>
                            </div>
                            
                            <div class="recipe-dashboard-card-buttons">
                                
                                <button><i class="fa-solid fa-trash"></i> Edit</button>
                                <button><i class="fa-solid fa-pen"></i> Delete</button>
                                
                            </div>
                           
                        </div>
                        
                    </div>
    `
    recipe_list_dashboard.innerHTML += new_recipe
} 
const check_recipe_list_to_create_card_db = ()=>{
    recipe_list_dashboard.innerHTML = ``
    //so that everytime we call the func the container is initially empty (refreshed)
    //and check for the latest data on recipe_list
    recipe_list.forEach(element => {
       create_recipe_card_db(element.title,element.img,element.recipe_id)
    });
}
check_recipe_list_to_create_card_db()




