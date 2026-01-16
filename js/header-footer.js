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
        document.querySelector(".main-menu-log-icon").style.display = "none"
        document.querySelector(".main-menu-user-icon").style.display = "block"
    }
    else{
        login_regiser_head_btn.classList.add("login-regiser-head-btn-active")
        login_regiser_head_btn.href = "login.html"
        document.querySelector(".main-menu-log-icon").style.display = "block"
        document.querySelector(".main-menu-user-icon").style.display = "none"
    }

    const body = document.querySelector("body")
    const header_nav = document.querySelector(".header-nav")
    document.querySelector(".main-menu").addEventListener("click",()=>{
        body.classList.toggle("nav-full-width")
        if(body.classList.contains("nav-full-width")){
            header_nav.style.width = "100%"
            body.style.overflowY = "hidden"
        }
        else{
            header_nav.style.width = "0"
            body.style.overflowY = "scroll"
        }
    })
    

},150)






async function footer() {
    const response = await fetch("partials/footer.html")
    const text = await response.text()
    return text
}

footer().then(res=>document.querySelector("footer").innerHTML = res)