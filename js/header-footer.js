// fetch("partials/header.html").then(res=>{
//     console.log(res)
//     return res.text()
// })
//     .then(data=>console.log(data))                                

async function header() {
    const response = await fetch("partials/header.html")
    console.log(response)
    const text = await response.text()
    console.log(text)
    return text
}

header().then(res=>document.querySelector("header").innerHTML = res)

async function footer() {
    const response = await fetch("partials/footer.html")
    console.log(response)
    const text = await response.text()
    console.log(text)
    return text
}

footer().then(res=>document.querySelector("footer").innerHTML = res)