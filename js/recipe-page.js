const recipe_list = JSON.parse(localStorage.getItem("recipe_list"))
const curr_recipe = JSON.parse(localStorage.getItem("curr_recipe"))
const get_currrent_recipe_data = recipe_list.find(recipe=> recipe.recipe_unique_id==curr_recipe)

const user_list = JSON.parse(localStorage.getItem("user_list"))
const logged_in_user = JSON.parse(localStorage.getItem("user_login_data"))
const get_currrent_user_data = user_list.find(user=> {
    if(logged_in_user)
        return user.user_name==logged_in_user.user_name
    })


const single_recipe_wrapper = document.querySelector(".single-recipe-wrapper")
single_recipe_wrapper.innerHTML = `<h1>${get_currrent_recipe_data.title}</h1>
            <div class="img_container">
                <img src="${get_currrent_recipe_data.img}" alt="">
            </div>
            <div class="recipe-page-body"> 
                <div class="recipe-time-serve-cont">
                    <div><p>Total Serving:</p>${get_currrent_recipe_data.total_serving}</div>
                    <div><p>Cook Hour:</p>${get_currrent_recipe_data.cook_hour}</div>
                    <div><p>Cook Minute:</p>${get_currrent_recipe_data.cook_min}</div>
                    <div class="wishlist-btn-container">
                    <button id="wishlist-btn">Wishlist</button>
                </div>
                </div>
                <p>${get_currrent_recipe_data.desc}</p>
                
                
                
                <h2>Ingredients</h2>
                <ol id="ingredient_container">
                    
                </ol>
                <h2>Instructions</h2>
                <ol id="instruction_container">
                    
                </ol>
            </div>`

//For Wishlist functionality
const wishlist_btn = document.querySelector("#wishlist-btn")
const wishlist_btn_container = document.querySelector(".wishlist-btn-container")


const body = document.querySelector("body")

if(get_currrent_user_data && get_currrent_user_data.wishlist.find(wish=>get_currrent_recipe_data.recipe_unique_id == wish))
    wishlist_btn.style.background = "orange"

wishlist_btn_container.addEventListener("click",()=>{
    
    //If you want you can check if e.target.className == wishlist_btn the do the functionality
    if(logged_in_user){

        //Updating the recipe wishlist count
        const current_user_index_from_recipe = get_currrent_recipe_data.wishlist_count.findIndex(user=>get_currrent_user_data.user_name == user)
        if(current_user_index_from_recipe == -1){
            get_currrent_recipe_data.wishlist_count.push(get_currrent_user_data.user_name)
        }
        else{
            get_currrent_recipe_data.wishlist_count.splice(current_user_index_from_recipe,1)
        }
        localStorage.setItem("recipe_list",JSON.stringify(recipe_list))
        
        //Adding the wishlisted recipe in user wishlist
        const current_recipe_index_from_user = get_currrent_user_data.wishlist.findIndex(wish=>get_currrent_recipe_data.recipe_unique_id == wish)
        if(current_recipe_index_from_user == -1){
            get_currrent_user_data.wishlist.push(get_currrent_recipe_data.recipe_unique_id)
            wishlist_btn.style.background = "orange"
        }
        else{
            get_currrent_user_data.wishlist.splice(current_recipe_index_from_user,1)
            wishlist_btn.style.background = "white"
        }

        localStorage.setItem("user_list",JSON.stringify(user_list))
        
        
    }
    else{
        wishlist_btn_container.innerHTML = wishlist_btn_container.innerHTML + non_user_alert("Wishlist this recipe?","Sign in to make your wishlist count")
    }   
})

//For ingredient and instruction step creation
const to_do_list_creation = (list,container)=>{
    list.forEach(element => {
        
        const new_li = document.createElement("input")
        const new_label = document.createElement("label")
        new_li.type = "checkbox"

        new_label.innerHTML = `<input type = "checkbox"> ${element}`
        container.appendChild(new_label)
    });
}     
const ingredient_container = document.getElementById("ingredient_container")
const instruction_container= document.getElementById("instruction_container")
to_do_list_creation(get_currrent_recipe_data.ingredient_list_data,ingredient_container)
to_do_list_creation(get_currrent_recipe_data.instruction_list_data,instruction_container)       

//For ingredient and instruction step to do functionality like cross the step after fulfilled
const to_do_list_functionality=(cont)=>{
    cont.addEventListener("click",(e)=>{
        if(e.target.tagName == "INPUT"){//cause clicking in label also means clicking the element inside that label
            e.target.closest("label").classList.toggle("strike")
        }
    })
}

to_do_list_functionality(ingredient_container)
to_do_list_functionality(instruction_container)



//Comment functionality
const comment_form = document.querySelector("#comment-form")
const comment_container = document.querySelector("#comment-container")
const comment_input_box = document.querySelector("#comment-input-box")
const comment_unique_id = ()=>{
    let code = crypto.randomUUID()
    return "cmt_" + code
}


const comment_creator = (comment)=>{
    let comment_user = user_list.find(user=>user.user_name == comment.user_name)
    
    let new_comment =  ` 
                    <div class="comment" data-id=${comment.id}>
                        <div class="comment-head">
                            <p class="profile-pic-default">I</p>
                            <img src="${comment_user.profile_pic}" alt="" class="comment-avater">
                        </div>
                        <div class="comment-body">
                            <p class="comment-full-name">${comment_user.full_name}</p>
                            <p class="comment-text">${comment.comment}</p>
                            <div class="comment-footer">
                                <span class="comment-reply-btn"><i class="fa-regular fa-comment"></i>Reply</span>
                                <span class="comment-react-btn-container"><i class="fa-regular fa-heart comment-react-btn"></i>${comment.likes.length}</span>
                            </div>
                            <div class="comment-reply-container">
                            
                            </div>
                            
                        </div>
                    </div>`
    
    comment_container.innerHTML+=new_comment

    //To update Profile picture if commenter has one or not
    let curr_comment = comment_container.lastElementChild
    let comment_avater = curr_comment.querySelector(".comment-avater")
    const profile_pic_default = curr_comment.querySelector(".profile-pic-default")
    if(comment_user.profile_pic !=""){
        comment_avater.src = comment_user.profile_pic
        comment_avater.style.display = "block"
        profile_pic_default.style.display = "none"  
    }

    else{
        profile_pic_default.textContent = comment_user.user_name[0]
        comment_avater.style.display = "none"
        profile_pic_default.style.display = "block"
    }

    //To update the react button
    if(logged_in_user && comment.likes.find(user=>user == get_currrent_user_data.user_name))
    {
        curr_comment.querySelector(".comment-react-btn").classList.add("fa-solid")
    }
    else{
        curr_comment.querySelector(".comment-react-btn").classList.remove("fa-solid")
    }


    if(comment.replies){
        let comment_reply_container = curr_comment.querySelector(".comment-reply-container")

        comment.replies.forEach(reply=>{
            let reply_user = user_list.find(user=>user.user_name == reply.user_name)

            comment_reply_container.innerHTML+=  ` 
                    <div class="reply" data-id=${reply.id}>
                        <div class="comment-head">
                            <p class="profile-pic-default">I</p>
                            <img src="${reply_user.profile_pic}" alt="" class="comment-avater">
                        </div>
                        <div class="comment-body">
                            <p class="comment-full-name">${reply_user.full_name}</p>
                            <p class="comment-text">${reply.comment}</p>
                            <div class="comment-footer">
                                <span class="reply-reply-btn"><i class="fa-regular fa-comment"></i>Reply</span>
                                <span class="comment-react-btn-container"><i class="fa-regular fa-heart comment-react-btn"></i>${reply.likes.length}</span>
                            </div>
                            <div class="reply-reply-container">
                            
                            </div>
                        </div>
                    </div>`
            
            let curr_reply = comment_reply_container.lastElementChild
            let comment_avater = curr_reply.querySelector(".comment-avater")
            const profile_pic_default = curr_reply.querySelector(".profile-pic-default")
            if(reply_user.profile_pic !=""){
                comment_avater.src = reply_user.profile_pic
                comment_avater.style.display = "block"
                profile_pic_default.style.display = "none"
            }

            else{
                profile_pic_default.textContent = reply_user.user_name[0]
                comment_avater.style.display = "none"
                profile_pic_default.style.display = "block"
            }
            
            //To update the react button
            if(logged_in_user && reply.likes.find(user=>user == get_currrent_user_data.user_name))
            {
                curr_reply.querySelector(".comment-react-btn").classList.add("fa-solid")
            }
            else{
                curr_reply.querySelector(".comment-react-btn").classList.remove("fa-solid")
            }
        })
    }
    
}



//Update comment data at backend
const update_comment_data = (key,parent_id, comment_text)=>{


    if(key == "comment"){
        get_currrent_recipe_data.comments.push(
            {
                comment: comment_input_box.value,
                id: comment_unique_id(),
                user_name: get_currrent_user_data.user_name,
                replies:[],
                likes:[]

            }
        )
    }
    else if(key == "reply"){
        let parent_comment = get_currrent_recipe_data.comments.find(comment=>parent_id == comment.id)
        parent_comment.replies.push({
            comment: comment_text,
            id: comment_unique_id(),
            user_name: get_currrent_user_data.user_name,
            likes:[]
        })
    }

    localStorage.setItem("recipe_list",JSON.stringify(recipe_list))
}



//submit a comment
comment_form.addEventListener("submit",(e)=>{
    e.preventDefault()
    update_comment_data("comment")
    comment_input_box.value=""
    render_comments()
})

//clicked on Comments container
comment_container.addEventListener("click",(e)=>{
    //clicked on comment => reply
    if(e.target.className == "comment-reply-btn"){
        comment_container.querySelectorAll(".reply-form").forEach(form=>form.remove()) //initially removing all reply inut box from the container
        let curr_comment =  e.target.closest(".comment").querySelector(".comment-reply-container")
        
        //here innerHtml = new_form + innerHtml (so that the form gets added at the top of th container)
        if(logged_in_user){
            curr_comment.innerHTML = `
                    <form class="reply-form">
                        <textarea name="reply-input-box" class="reply-input-box"></textarea>
                        <input type="button" value="Cancle">
                        <input type="submit">
                    </form>` + curr_comment.innerHTML 
        }
        else{
            curr_comment.innerHTML = non_user_alert("Want to join the conversation?","Sign in to continue") + curr_comment.innerHTML
        }
    }
    //clicked on reply => reply
    if(e.target.className == "reply-reply-btn"){
        comment_container.querySelectorAll(".reply-form").forEach(form=>form.remove()) //initially removing all reply inut box from the container
        let curr_comment =  e.target.closest(".reply").querySelector(".reply-reply-container")
        if(logged_in_user){
            curr_comment.innerHTML = `
                    <form class="reply-form">
                        <textarea name="reply-input-box" class="reply-input-box"></textarea>
                        <input type="button" value="Cancle">
                        <input type="submit">
                    </form>` //the form gets added at the bottom of the container
        }
        else{
            curr_comment.innerHTML = non_user_alert("Want to join the conversation?","Sign in to continue")
        }
    }
    
    //comment and reply => react button
    if(e.target.classList.contains("comment-react-btn")){
        let parent_comment = e.target.closest(".comment")
        let parent_reply = e.target.closest(".reply")
        // let parent_reply_container = parent_reply.querySelector(".reply-reply-container")
        
        let curr_comment = get_currrent_recipe_data.comments.find(comment => parent_comment.dataset.id == comment.id)

        if(parent_reply)
        {
            if(logged_in_user){
                //reply exist       
                let curr_reply = curr_comment.replies.find(reply => parent_reply.dataset.id == reply.id)
                let check_already_liked = curr_reply.likes.findIndex(user=>user == get_currrent_user_data.user_name)
                
                if(check_already_liked == -1){
                    curr_reply.likes.push(get_currrent_user_data.user_name)
                    e.target.classList.add("fa-solid")
                    console.log("donee")
                }
                else{
                    e.target.classList.remove("fa-solid")
                    curr_reply.likes.splice(check_already_liked, 1)
                }
                //refresh render only if the user is logged-in. If you use it end of parent it will first add pop than refresh wich will remove the pop up
                render_comments()
            }
            else{
                parent_reply.querySelector(".reply-reply-container").innerHTML = non_user_alert("Want to join the conversation?","Sign in to continue")
            }

        }
        else{
            if(logged_in_user){
                let check_already_liked = curr_comment.likes.findIndex(user=>user == get_currrent_user_data.user_name)
                console.log(parent_comment.dataset.id)
                if(check_already_liked == -1){
                    curr_comment.likes.push(get_currrent_user_data.user_name)
                    console.log("donee")
                }
                else{
                    curr_comment.likes.splice(check_already_liked, 1)
                }
                render_comments()
            }
            else{
                parent_comment.querySelector(".comment-reply-container").innerHTML = non_user_alert("Want to join the conversation?","Sign in to continue") + parent_comment.querySelector(".comment-reply-container").innerHTML
            }
        }
        localStorage.setItem("recipe_list", JSON.stringify(recipe_list))
        
    }

})

//submit reply
comment_container.addEventListener("submit",(e)=>{
    e.preventDefault()
    //collecting the main comment cotainer to=> add data
    let curr_comment =  e.target.closest(".comment")
    //crrent reply form to=> collect data
    let curr_form = e.target.closest(".reply-form")
    
    comment_container.querySelectorAll(".reply-form").forEach(form=>form.remove()) //removing all reply inut box from the container after submition
    update_comment_data("reply", curr_comment.dataset.id,curr_form.querySelector(".reply-input-box").value)
    render_comments()
})

//Render comments and replies
const render_comments = ()=>{
    comment_container.innerHTML =""
    get_currrent_recipe_data.comments.forEach(comment=>{
        comment_creator(comment)
    })
}
render_comments()

//Non user intereaction alert
//Add Non user intereaction(comment,reply,like) alert
const non_user_alert = (header,msg)=>{
    document.querySelectorAll(".must-log-in-pop-up").forEach(alert=>{
            alert.remove()        
        })
    
    return `   <div class="must-log-in-pop-up">
                                            <h3>${header}</h3>
                                            <p>${msg}</p>
                                            <a href="login.html">Sign in</a>
                                        </div>`
}

document.querySelector(".comment-sec-wrapper").addEventListener("click",(e)=>{
    if(e.target.closest("#comment-form") && !logged_in_user){
        comment_container.innerHTML += non_user_alert("Want to join the conversation?","Sign in to continue")
    }
})

//Remove Non user intereaction alert
body.addEventListener("click",(e)=>{
    if(!e.target.closest(".must-log-in-pop-up") && e.target.id !== "wishlist-btn" && !e.target.closest(".comment") && !e.target.closest("#comment-form")){
        document.querySelectorAll(".must-log-in-pop-up").forEach(alert=>{
            alert.remove()        
        })
    }
})



//sidebar trending and recent recipes
const sidebar_recipe_card_create = (recipe)=> {
    let recipe_user = user_list.find(user=>user.user_name == recipe.user)
    return `<div class="sidebar-recipe-card" data-unique_id ="${recipe.recipe_unique_id}">
                                <div class="sidebar-recipe-card-img">
                                    <img src="${recipe.img}" alt="">
                                </div>
                                
                                <div class="sidebar-recipe-card-info">
                                    <h3><a href="recipe-page.html?slug=${recipe.slug}">${recipe.title}</a></h3>
                                    <div class="sidebar-recipe-card-footer">
                                        <div class="sidebar-recipe-card-footer-img-cont">
                                            <p class="profile-pic-default">I</p>
                                            <img src="${recipe_user.profile_pic}" alt="" class="comment-avater">
                                        </div>
                                        <p class="comment-full-name">${recipe_user.full_name}</p>
                                    </div>
                                </div>
                              
                            </div>`  }              

let sidebar_trending_recipe = document.querySelector(".sidebar-trending-recipe")
let sidebar_recent_recipe = document.querySelector(".sidebar-recent-recipe")


let trending_recipe_list = recipe_list.toSorted((a,b) => b.wishlist_count.length - a.wishlist_count.length)
console.log(trending_recipe_list)



let sidebar_recipe_cards = (list, container,x)=>{
    let recipe_counter = 0
    list.forEach(recipe=>{

        if(recipe_counter < 3){
            container.innerHTML += sidebar_recipe_card_create(recipe)

            let recipe_user = user_list.find(user=>user.user_name == recipe.user)
            let curr_recipe_card = container.lastElementChild
            let comment_avater = curr_recipe_card.querySelector(".comment-avater")
            const profile_pic_default = curr_recipe_card.querySelector(".profile-pic-default")

            if(recipe_user.profile_pic !=""){
                comment_avater.src = recipe_user.profile_pic
                comment_avater.style.display = "block"
                profile_pic_default.style.display = "none"
            }

            else{
                profile_pic_default.textContent = recipe_user.user_name[0]
                comment_avater.style.display = "none"
                profile_pic_default.style.display = "block"
            }
        }       

        recipe_counter += 1
    })
}
sidebar_recipe_cards(trending_recipe_list, sidebar_trending_recipe)
sidebar_recipe_cards(recipe_list.reverse(), sidebar_recent_recipe, true)


document.querySelector(".recipe-page-sidebar-container").addEventListener("click",(e)=>{
        let card = e.target.closest(".recipe-dashboard-card")
        if(card)
            localStorage.setItem("curr_recipe", JSON.stringify(card.dataset.unique_id))
})



