// fetch("partials/header.html").then(res=>{
//     console.log(res)
//     return res.text()
// })
//     .then(data=>console.log(data))                                

async function header() {
    const response = await fetch("partials/header.html")
    const text = await response.text()
    return text
}

header().then(res=>document.querySelector("header").innerHTML = res)

//If user logged in hide log/register add dashboard
setTimeout(()=>{
    const login_regiser_head_btn = document.querySelector("#login-regiser-head-btn")
    if(localStorage.getItem("user_login_data")){
        
        login_regiser_head_btn.href = "dashboard.html"
        login_regiser_head_btn.textContent = "Dashboard"
    }
    else{
        
        login_regiser_head_btn.href = "login.html"
        login_regiser_head_btn.textContent = "Login/Register"
    }
},200)



async function footer() {
    const response = await fetch("partials/footer.html")
    const text = await response.text()
    return text
}

footer().then(res=>document.querySelector("footer").innerHTML = res)