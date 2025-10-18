const add_ingredient_btn = document.querySelector("#add-ingredient")
const add_ingredient_list = document.querySelector(".ingredient-list")

add_ingredient_btn.addEventListener("click",()=>{
    
    const new_ingredient_li = document.createElement("li")

    const new_ingredient = document.createElement("input")
    new_ingredient.type = "text"

    const new_ingredient_delete = document.createElement("input")
    new_ingredient_delete.type = "button"
    new_ingredient_delete.value = "X"

    new_ingredient_li.classList.add("new_ingredient_li")

    new_ingredient_li.appendChild(new_ingredient)
    new_ingredient_li.appendChild(new_ingredient_delete)

    add_ingredient_list.appendChild(new_ingredient_li)
})
add_ingredient_list.addEventListener("click",(e)=>{
    if(e.target.type == "button"){
        e.target.parentElement.remove()
    }

})


const recipe_list = []
const recipe_form = document.querySelector("#recipe-form")
const recipe_form_file = document.querySelector("#recipe-form-file")
recipe_form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const recipe_form_title = document.getElementById("recipe-form-title")
    const recipe_form_desc = document.getElementById("recipe-form-desc")
    const recipe_form_cook_hour = document.getElementById("recipe-form-cook-hour")
    const recipe_form_cook_min = document.getElementById("recipe-form-cook-min")
    
    const ingredient_list = document.querySelectorAll(".new_ingredient_li")

    
    const ingredient_list_data = Array.from(ingredient_list).map((e)=>{
        let list = e.querySelector("input")
        if(list.type == "text")
        {
            return list.value
        }
    })

    const file_reader = new FileReader()
    file_reader.readAsDataURL(recipe_form_file.files[0])
    file_reader.onload = ()=>{
        let img_src = file_reader.result
        console.log(ingredient_list_data)
        recipe_list.push(
            {
                title : recipe_form_title.value,
                desc : recipe_form_desc.value,
                img : img_src,
                cook_hour : recipe_form_cook_hour.value,
                cook_min : recipe_form_cook_min.value,
                ingredient_list_data : ingredient_list_data

            }
        )
        console.log(recipe_list)
    }
})
