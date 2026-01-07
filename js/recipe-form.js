const logout_btn = document.querySelector("#logout")
logout_btn.addEventListener("click",()=>{
    localStorage.removeItem("user_login_data")
    window.location.href = "login.html"
})


const add_ingredient_btn = document.querySelector("#add-ingredient-btn")
const add_instruction_btn = document.querySelector("#add-instruction-btn")
const add_ingredient_list = document.querySelector(".ingredient-list")
const add_instruction_list = document.querySelector(".instruction-list")


const create_new_li = (ul_container,li_inp_value)=>{
    const new_li = document.createElement("li")

    const new_li_input = document.createElement("input")
    new_li_input.type = "text"

    const new_li_delete = document.createElement("input")
    new_li_delete.type = "button"
    new_li_delete.value = "X"

    //for edit we collect the list data and add to li. And as we wanna make resable function thats why we are checking if li input(text).value exits
    if(li_inp_value){
        new_li_input.value = li_inp_value
    }

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


//Form open and Form submission and json store

//It opens the recipe form and make the background body blur
const add_new_recipe_btn = document.querySelector("#add-new-recipe-btn")
const recipe_creation_form = document.querySelector("#recipe-creation-form")
add_new_recipe_btn.addEventListener("click",()=>{
    recipe_creation_form.classList.add("db-sec-active")
    document.body.classList.add("db-body-blur")
})




const recipe_list = JSON.parse(localStorage.getItem("recipe_list"))||[]
//so if there is no recipe is available in local storage (ie. false) than an empty array will be taken where 1st recipe is stored
//and if there is recipe avialable than the srtingified recipe_list is taken from the local storage and converted to its original array version

const recipe_form = document.querySelector("#recipe-form")
const recipe_form_file = document.querySelector("#recipe-form-file")
const recipe_form_title = document.getElementById("recipe-form-title")
const recipe_form_desc = document.getElementById("recipe-form-desc")
const recipe_form_cook_hour = document.getElementById("recipe-form-cook-hour")
const recipe_form_cook_min = document.getElementById("recipe-form-cook-min")
const recipe_form_total_serving = document.getElementById("recipe-form-serving")

let edit_recipe_card_db_element
let upload_recipe_img_db_src

const recipe_form_img_file_cont = document.querySelector(".recipe-form-img-file-cont")

const preview_recipe_img_db = ()=>{
    
    let recipe_db_preview_img = recipe_form_img_file_cont.getElementsByTagName("img")
    //it returns an array if exist
    
    if(recipe_db_preview_img.length <=0 ){
        console.log("worked")
        let new_recipe_img_db = document.createElement("img")
        new_recipe_img_db.src = upload_recipe_img_db_src
        recipe_form_img_file_cont.appendChild(new_recipe_img_db)
    }
    else{
        // console.log(upload_recipe_img_db_src)
        // console.log(recipe_db_preview_img[0].src)
        recipe_db_preview_img[0].src = upload_recipe_img_db_src
    }

}


recipe_form_file.addEventListener("change",()=>{
    const file_reader = new FileReader()
    file_reader.readAsDataURL(recipe_form_file.files[0])
    file_reader.onload = ()=>{
        upload_recipe_img_db_src = file_reader.result
        preview_recipe_img_db()
    }
})

let get_user_login_data = JSON.parse(localStorage.getItem("user_login_data"))

const count_wishlist = ()=>{
    let i = 0
    current_user_recipe_list.forEach((recipe)=>{
        i+=recipe.wishlist_count.length
    })
    return i
}

const slug_creator = (title)=>{
    console.log(typeof(title))
    console.log(title.replaceAll(" ","-"))
    return title.toLowerCase().replaceAll(" ","-")
}

recipe_form.addEventListener("submit",(e)=>{
    e.preventDefault()
   
    //For new recipe
    if(!edit_recipe_card_db_element){
        recipe_form_file.required = true
        let recipe_unique_id = crypto.randomUUID()
        recipe_list.push(
            {
                user: get_user_login_data.user_name,
                wishlist_count: [],
                title : recipe_form_title.value,
                slug: slug_creator(recipe_form_title.value),
                desc : recipe_form_desc.value,
                img : upload_recipe_img_db_src,
                cook_hour : recipe_form_cook_hour.value,
                cook_min : recipe_form_cook_min.value,
                total_serving : recipe_form_total_serving.value,
                ingredient_list_data : get_li_inp_text_value(add_ingredient_list),
                instruction_list_data : get_li_inp_text_value(add_instruction_list),
                recipe_id:recipe_list.length,
                recipe_unique_id: recipe_unique_id,
                comments:[]
            }
        )
    }
    //For edit recipe
    else{
            console.log(edit_recipe_card_db_element)
            let find_recipe_db = recipe_list.find((recipe)=>recipe.recipe_unique_id==edit_recipe_card_db_element)
            
            find_recipe_db.title = recipe_form_title.value,
            find_recipe_db.img = upload_recipe_img_db_src
            find_recipe_db.desc = recipe_form_desc.value,
            find_recipe_db.cook_hour = recipe_form_cook_hour.value,
            find_recipe_db.cook_min = recipe_form_cook_min.value,
            find_recipe_db.total_serving = recipe_form_total_serving.value,
            find_recipe_db.ingredient_list_data = get_li_inp_text_value(add_ingredient_list),
            find_recipe_db.instruction_list_data = get_li_inp_text_value(add_instruction_list),
            // find_recipe_db.recipe_id = recipe_list.length,
            find_recipe_db.recipe_unique_id = edit_recipe_card_db_element
    }
    console.log(edit_recipe_card_db_element)
    console.log(recipe_list)
    localStorage.setItem("recipe_list",JSON.stringify(recipe_list)) //storing recipe list in local storage in json string format 
    //it gets stored as stringified version of recipe_list = [] at first and then...
    
    check_recipe_list_to_create_card_db()
    //To update recipe container in real time. Dont worry the func will not create cards multiple times as we are repfreshing it each time it is called = ``
    
    recipe_form_refresh()
    //refreshing the form after submission
  
})

//for refreshing the form after submit and edit a recipe
const recipe_form_refresh = ()=>{
    recipe_form_file.value=""
    recipe_form_title.value=""
    recipe_form_desc.value=""
    recipe_form_cook_hour.value=""
    recipe_form_cook_min.value=""
    recipe_form_total_serving.value=""
    add_ingredient_list.innerHTML=""
    add_instruction_list.innerHTML=""
    if(recipe_form_img_file_cont.getElementsByTagName("img")[0])
        recipe_form_img_file_cont.removeChild(recipe_form_img_file_cont.getElementsByTagName("img")[0])
    edit_recipe_card_db_element = ""
    upload_recipe_img_db_src = ""
}

//Form cancle button it removes the recipe form and body background blur
const cancle_recipe_form = document.querySelector("#cancle-recipe-form")
cancle_recipe_form.addEventListener("click",()=>{
    recipe_creation_form.classList.remove("db-sec-active")
    document.body.classList.remove("db-body-blur")
    recipe_form_refresh()
    //so that the form gets refreshed after clicking cancle(specially for edit). else If we click add new recipe we will see previously clicked edit recipe data

})

//Recipe card creation on dashboard 

const recipe_list_dashboard = document.querySelector(".recipe-list-body")

const create_recipe_card_db = (title,img_src,recipe_id,recipe_unique_id,slug)=>{
    let new_recipe = `
                    <div class="recipe-dashboard-card" data-unique_id ="${recipe_unique_id}">
                        <div class="recipe-dashboard-card-img">
                            <img src="${img_src}" alt="">
                        </div>
                        <div class="recipe-dashboard-card-body">
                            <div class="recipe-dashboard-card-info">
                                <h3><a href="recipe-page.html?slug=${slug}">${title}</a></h3>
                                <p>Recipe Id: <span>${recipe_id}</span></p>
                            </div>
                            
                            <div class="recipe-dashboard-card-buttons">
                                
                                <button class="recipe-dashboard-card-edit-btn"><i class="fa-solid fa-trash"></i> Edit</button>
                                <button class="recipe-dashboard-card-del-btn"><i class="fa-solid fa-pen"></i> Delete</button>
                                
                            </div>
                           
                        </div>
                        
                    </div>
    `
    recipe_list_dashboard.innerHTML += new_recipe
}

let current_user_recipe_list
const check_recipe_list_to_create_card_db = ()=>{
    recipe_list_dashboard.innerHTML = ``
    
    //so that everytime we call the func the container is initially empty (refreshed)
    //and check for the latest data on recipe_list
    current_user_recipe_list = recipe_list.filter((recipe)=>recipe.user == get_user_login_data.user_name)

    current_user_recipe_list.forEach(element => {
       create_recipe_card_db(element.title,element.img,element.recipe_id,element.recipe_unique_id,element.slug)
    });
}
check_recipe_list_to_create_card_db()


//Recipe card deletion and edit on dashboard
const delete_btn_recipe_card_db = document.querySelector(".recipe-dashboard-card-del-btn")
const edit_btn_recipe_card_db = document.querySelector(".recipe-dashboard-card-edit-btn")

recipe_list_dashboard.addEventListener("click",(e)=>{
    let find_recipe_db = recipe_list.findIndex((recipe)=>recipe.recipe_unique_id==e.target.closest(".recipe-dashboard-card").dataset.unique_id)
    let find_recipe_db_element = recipe_list[find_recipe_db]
    if(e.target.className == "recipe-dashboard-card-edit-btn"){
        // To make form visible
        recipe_creation_form.classList.add("db-sec-active")
        document.body.classList.add("db-body-blur")
        
        edit_recipe_card_db(find_recipe_db_element)
    }
    if(e.target.className == "recipe-dashboard-card-del-btn"){
        // console.log(e.target.closest(".recipe-dashboard-card").dataset.unique_id)
        
        recipe_list.splice(find_recipe_db,1)
        localStorage.setItem("recipe_list",JSON.stringify(recipe_list))

        e.target.closest(".recipe-dashboard-card").remove()
    }
})
// title,desc,img,cook_hour,cook_min,ingredient_list_data,instruction_list_data,recipe_id,unique_id
const edit_recipe_card_db = (element)=>{
    //here we are refreshing the form else previous list item will aso show in form
    recipe_form_refresh()
    edit_recipe_card_db_element = element.recipe_unique_id
    // recipe_form_file.value = element.title
    upload_recipe_img_db_src = element.img
    recipe_form_file.required = false
    preview_recipe_img_db()
    
    recipe_form_title.value = element.title
    recipe_form_desc.value = element.desc
    recipe_form_cook_hour.value = element.cook_hour
    recipe_form_cook_min.value = element.cook_min 
    element.ingredient_list_data.forEach((e)=>{
        create_new_li(add_ingredient_list,e)
        
    })
    element.instruction_list_data.forEach((e)=>{
        create_new_li(add_instruction_list,e)
    })

}


//My profile
const my_profile_head_info = document.querySelector(".my-profile-head-info")
const my_profile_form = document.querySelector(".my-profile-body")
const my_profile_head_fullname = document.querySelector("#my-profile-head-fullname")
const my_profile_head_email = document.querySelector("#my-profile-head-email")

const my_profile_email = document.querySelector("#my-profile-email")
const my_profile_username = document.querySelector("#my-profile-username")
const my_profile_fullname = document.querySelector("#my-profile-fullname")
const my_profile_password = document.querySelector("#my-profile-password")
const my_profile_new_password = document.querySelector("#my-profile-new-password")


const user_list = JSON.parse(localStorage.getItem("user_list"))
let current_user = user_list.find(user=>user.user_name == get_user_login_data.user_name)


my_profile_head_fullname.textContent = current_user.full_name
my_profile_head_email.textContent = current_user.email

my_profile_fullname.value = current_user.full_name
my_profile_email.value = current_user.email
my_profile_username.textContent = current_user.user_name


my_profile_form.addEventListener("submit",(e)=>{
    // e.preventDefault()
    
    current_user.full_name = my_profile_fullname.value
    current_user.email = my_profile_email.value
    if(my_profile_password.value != ""){
        set_new_password()
    }
    localStorage.setItem("user_list",JSON.stringify(user_list))
  
})

const set_new_password = ()=>{
    if(get_user_login_data.password == my_profile_password.value){
        if(my_profile_new_password.value!=""){
            current_user.password = my_profile_new_password.value
        }
    }
    else{
        alert("Password Doesn't Match")
    }

}

//profile pic upload
const profile_pic_file_input = document.querySelector("#profile-pic-file-input")
const profile_pic = document.querySelector("#profile-pic")
const profile_pic_default = document.querySelector("#profile-pic-default")

profile_pic_file_input.addEventListener("input",()=>{
    let img_file = profile_pic_file_input.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(img_file)
    reader.onload = ()=>{
        current_user.profile_pic = reader.result
        localStorage.setItem("user_list",JSON.stringify(user_list))
        update_profile_pic()
    }  
})

const update_profile_pic = ()=>{
    
    if(current_user.profile_pic !=""){
        profile_pic.src = current_user.profile_pic
        profile_pic.style.display = "block"
        profile_pic_default.style.display = "none"
        console.log("ooo")    
    }

    else{
        profile_pic_default.textContent = current_user.user_name[0]
        profile_pic.style.display = "none"
        profile_pic_default.style.display = "block"
    }
}
update_profile_pic()


//dashboard section
const user_total_recipe = document.querySelector("#user-total-recipe")
const user_total_wishlist = document.querySelector("#user-total-wishlist")
user_total_recipe.textContent = current_user_recipe_list.length
user_total_wishlist.textContent = count_wishlist()


// Dashboard sidebar
const dashboard_sidebar_options_container = document.querySelector(".dashboard-sidebar-options-container")
const db_sec_container = document.querySelectorAll(".db-sec-container")
const db_sidebar_opt = document.querySelectorAll(".db-sidebar-opt")

dashboard_sidebar_options_container.addEventListener("click",(e)=>{
    if(e.target.tagName == "LI"){
        db_sidebar_opt.forEach(opt=>opt.classList.remove("db-sidebar-opt-active"))
        e.target.classList.add("db-sidebar-opt-active") 
        db_sec_container.forEach(container=>{
            container.classList.remove("db-sec-active")
            if(e.target.dataset.section == container.id){
                container.classList.add("db-sec-active")
            }
        })
        
    }
    
})


//My wishlist section
const wishlist_dashboard = document.querySelector(".wishlist-body")
const delete_btn_wishlist_card_db = document.querySelector(".recipe-dashboard-wishlist-delete-btn")

const create_wishlist_card_db = (title,img_src,recipe_id,recipe_unique_id,slug)=>{
    let new_recipe = `
                    <div class="recipe-dashboard-card" data-unique_id ="${recipe_unique_id}">
                        <div class="recipe-dashboard-card-img">
                            <img src="${img_src}" alt="">
                        </div>
                        <div class="recipe-dashboard-card-body">
                            <div class="recipe-dashboard-card-info">
                                <h3><a href="recipe-page.html?slug=${slug}">${title}</a></h3>
                                <p>Recipe Id: <span>${recipe_id}</span></p>
                            </div>
                            
                            <div class="recipe-dashboard-card-buttons">
                                <button class="recipe-dashboard-wishlist-delete-btn"><i class="fa-solid fa-pen"></i> Delete</button>
                            </div>
                        </div>
                    </div>
    `
    wishlist_dashboard.innerHTML += new_recipe
}

let current_user_wishlist = current_user.wishlist
const check_wishlist_to_create_card_db = ()=>{
    wishlist_dashboard.innerHTML = ``
    
    //so that everytime we call the func the container is initially empty (refreshed)
    //and check for the latest data on recipe_list

    current_user_wishlist.forEach(element => {
        console.log(element)
        let wishlisted_recipe = recipe_list.find(recipe=> recipe.recipe_unique_id == element)
        if(wishlisted_recipe) 
            create_wishlist_card_db(wishlisted_recipe.title,wishlisted_recipe.img,wishlisted_recipe.recipe_id,wishlisted_recipe.recipe_unique_id,wishlisted_recipe.slug)
    });
}
check_wishlist_to_create_card_db()

//My wishlist deletion function
wishlist_dashboard.addEventListener("click",(e)=>{
    let find_wishlist_db = current_user_wishlist.findIndex((wishlist)=>wishlist == e.target.closest(".recipe-dashboard-card").dataset.unique_id)
    
    if(e.target.className == "recipe-dashboard-wishlist-delete-btn"){
        // console.log(e.target.closest(".recipe-dashboard-card").dataset.unique_id)
        
        current_user_wishlist.splice(find_wishlist_db,1)
        localStorage.setItem("user_list",JSON.stringify(user_list))

        e.target.closest(".recipe-dashboard-card").remove()
    }
})