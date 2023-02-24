let response
let data
async function takeDataBase(url) {
    response = await fetch(url);
    data = await response.json();
    showNewsHead()
}

let divBest = document.querySelector("#best")
let divRest = document.querySelector("#rest")
let a = 4;
function showNewsHead() {
    let newArticle = document.createElement("article");
    let newA = document.createElement("a")
    divBest.innerHTML = ""
    newA.href = data.articles[0].url
    newA.target = "_blank"
    newA.innerHTML = `
        <img src="${data.articles[0].urlToImage}" alt="${data.articles[0].title}">
        <span>${data.articles[0].publishedAt}</span>
        <h2>${data.articles[0].title}</h2>
        <p>${data.articles[0].description}</p>`
    newArticle.append(newA)
    divBest.append(newArticle)

    divRest.innerHTML = ""
    a=4
    for (let i = 1; i < a; i++) {
        if (data.articles[i].urlToImage == null) {
            a++
        } else {
            let newArticle = document.createElement("article");
            let newA = document.createElement("a")
            newA.href = data.articles[i].url
            newA.target = "_blank"
            newA.innerHTML = `
            <div>
            <img src="${data.articles[i].urlToImage}" alt="${data.articles[i].title}">
            <h3>${data.articles[i].title}</h3></div>    
            <span>${data.articles[i].publishedAt}</span>`
            newArticle.append(newA)
            divRest.append(newArticle)
        }
    }
}

let language = "fr"
let category

let imgShown = 3;
let d;

async function takeDataBaseSecondary(url) {
    response = await fetch(url);
    d = await response.json();
    showNewsSecondary(d)
    //return d;
}

category = "sports"
takeDataBaseSecondary("https://newsapi.org/v2/top-headlines?country=" + language + "&apiKey=21e825da1415461e9ea84507ccbcb84a&category=" + category);
category = "science"
takeDataBaseSecondary("https://newsapi.org/v2/top-headlines?country=" + language + "&apiKey=21e825da1415461e9ea84507ccbcb84a&category=" + category);
category = "entertainment"
takeDataBaseSecondary("https://newsapi.org/v2/top-headlines?country=" + language + "&apiKey=21e825da1415461e9ea84507ccbcb84a&category=" + category);


/*
takeDataBaseSecondary("https://newsapi.org/v2/top-headlines?country="+language+"&apiKey=21e825da1415461e9ea84507ccbcb84a&category=science").then((dataHealth)=>{
    showNewsSecondary(dataHealth);
})

takeDataBaseSecondary("https://newsapi.org/v2/top-headlines?country="+language+"&apiKey=21e825da1415461e9ea84507ccbcb84a&category=sports").then((dataSPorts)=>{
    showSportsEncadrt(dataSportzs);
})
*/


let sectionSelect = document.querySelector("section")
let divPosition = document.querySelectorAll("section > div")
let c = 0;
function showNewsSecondary(database) {
    imgShown = 3;
    for (let i = 0; i < imgShown; i++) {
        if (database.articles[i].urlToImage == null) {
            database.articles.splice(i, 1)
            imgShown++
        } else {
            let newArticle = document.createElement("article");
            let newA = document.createElement("a")
            newA.href = database.articles[i].url
            newA.target = "_blank"
            newA.innerHTML = `
            <div>
            <img src="${database.articles[i].urlToImage}" alt="${database.articles[i].title}">
            <h4>${database.articles[i].title}</h4></div>
            <span>${database.articles[i].publishedAt}</span>`
            newArticle.append(newA)
            divPosition[c].append(newArticle)
        }
    }
    c++
}


takeDataBase("https://newsapi.org/v2/top-headlines?country=" + language + "&apiKey=21e825da1415461e9ea84507ccbcb84a")

let buttons = [{
    src: "assets/Wikipedia-Flags-FR-France-Flag.webp",
    countryCode: "fr",
    alt: "France flag"
}, {
    src: "assets/Wikipedia-Flags-GB-United-Kingdom-Flag.webp",
    countryCode: "us",
    alt: "UK flag"
}, {
    src: "assets/Japan-Flag-icon.webp",
    countryCode: "jp",
    alt: "JP flag"
}, {
    src: "assets/Wikipedia-Flags-IT-Italy-Flag.webp",
    countryCode: "it",
    alt: "IT flag"
}, {
    src: "assets/RU-Russia-Flag-icon.webp",
    countryCode: "ru",
    alt: "RU flag"
}, {
    src: "assets/Wikipedia-Flags-DE-Germany-Flag.webp",
    countryCode: "de",
    alt: "DE flag"
}
]

let divSwapLanguage = document.querySelector("#changeLanguage")
function changeLanguageButton() {
    for (let i = 0; i < buttons.length; i++) {
        let newButtons = document.createElement("button");
        newButtons.innerHTML = `
        <img src="${buttons[i].src}" alt="${buttons[i].alt}">`
        divSwapLanguage.append(newButtons)
        let buttonsList= document.querySelectorAll("#changeLanguage button")
        buttonsList[i].onclick = () => { langue(buttons[i].countryCode) }
    }
}

changeLanguageButton()
let languageButtonSelect = document.querySelectorAll("#changeLanguage button")
languageButtonSelect[0].disabled = true;
function langue(country) {
    language = country


    divSwapLanguage.innerHTML=""
    for(let i = 1 ; i < buttons.length; i++){
        console.log(language)
        console.log("check")
        if(buttons[i].countryCode == country){
            console.log("true")
            let buttonStorage = buttons[0]
            buttons[0] = buttons[i];
            buttons[i] = buttonStorage
            changeLanguageButton();
            break;
        }
    }


    languageButtonSelect = document.querySelectorAll("#changeLanguage button")
    languageButtonSelect[0].disabled = true;
    c = 0;
    divPosition[0].innerHTML = ""
    divPosition[1].innerHTML = ""
    divPosition[2].innerHTML = ""
    takeDataBase("https://newsapi.org/v2/top-headlines?country=" + language + "&apiKey=21e825da1415461e9ea84507ccbcb84a")

    category = "sports"
    takeDataBaseSecondary("https://newsapi.org/v2/top-headlines?country=" + language + "&apiKey=21e825da1415461e9ea84507ccbcb84a&category=" + category);
    category = "science"
    takeDataBaseSecondary("https://newsapi.org/v2/top-headlines?country=" + language + "&apiKey=21e825da1415461e9ea84507ccbcb84a&category=" + category);
    category = "entertainment"
    takeDataBaseSecondary("https://newsapi.org/v2/top-headlines?country=" + language + "&apiKey=21e825da1415461e9ea84507ccbcb84a&category=" + category);
}

let keyKimarche= "21e825da1415461e9ea84507ccbcb84a"
let key = "21e825da1415461e9ea84507ccbcb84a"