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

async function footer() {
    const response = await fetch("partials/footer.html")
    const text = await response.text()
    return text
}

footer().then(res=>document.querySelector("footer").innerHTML = res)