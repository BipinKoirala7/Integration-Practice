let admin = ['B','i','p','i','n','K','o','i','r','a','l','a','.','.','.']
let i=0
let links =[]

const openApps = document.getElementById('open-apps')
const apps = document.querySelector('.clickapps')
const settings = document.getElementById('setting')
const settingsOptn = document.querySelector('.settings-optn')
const addLink = document.querySelector('#create-link')
const newsgrid = document.querySelector('.news-grid')
const appRender = document.querySelector('.app-render')

async function getapibefroerender(){
    if(JSON.parse(localStorage.getItem('linkobj')))
    links=links.concat(JSON.parse(localStorage.getItem('linkobj')))
    console.log(links)
    constructlinkbox(links)
    try
   {
    const data= await fetchbackground()
    randombackground(data.results[Math.floor(Math.random()*30)])
    const weather = await giveweatherinfo()
    displayweatherinfo(weather)
}
    catch(error){
        console.log(`Error: ${error}`)
    }
    render()
}

function render(){
    setInterval(()=>{
        i<admin.length ? showadminname():''
    },200)
    setTimeout(()=>{  
        setInterval(()=>{
            givetime()
            document.querySelector('.admin-name').innerHTML = "Bipin Koirala"
        },1000)
    },3500)
    
    openApps.addEventListener('click',(e)=>{
        apps.classList.toggle('display')
    })
    settings.addEventListener('click',()=>{
        settingsOptn.classList.toggle('display')
    })
    addLink.addEventListener('click',function(){
        document.querySelector('.provide-link').classList.toggle('display')
    })
    document.getElementById('submit-link').addEventListener('click',createlink)
    document.querySelectorAll('.extra').forEach(function(btn){
        btn.addEventListener('click', function(e){
            moreoptn(e.target.id)
            rendernewsbox(e.target.id)
        })
    })
    document.getElementById('news-box-close').addEventListener('click',()=>{
        document.querySelector('.news-container').classList.toggle('display')
    })
    document.getElementById('app-box-close').addEventListener('click',()=>{
        document.querySelector('.apps-container').classList.toggle('display')
    })
    document.querySelectorAll('.app').forEach(function(app){
        app.addEventListener('click',(e)=>{
            let appchoosen = e.target.parentNode.id
            document.querySelector('.app-title').innerHTML = appchoosen
            document.querySelector('.apps-container').classList.toggle('display')
            runapp(appchoosen)
        })
    })
}

function runapp(id){
    if(id==='calculator'){
        runcalculator()
    }
}

function runcalculator(){
    appRender.innerHTML = `
    <div class="calc-container">
    <div class="display-calculation">
        <p class="pre-results"></p>
        <p class="calculations"></p>
    </div>
    <div class="num-btn">
        <button class="same-style" id="clear">C</button>
        <button class="same-style" id="percent">%</button>
        <button class="same-style divide" id="/">÷</button>
        <button class="same-style" id="delete">⇽</button>
        <button class="same-style" id="9">9</button>
        <button class="same-style" id="8">8</button>
        <button class="same-style" id="7">7</button>
        <button class="same-style multiply" id="*">×</button>
        <button class="same-style" id="6">6</button>
        <button class="same-style" id="5">5</button>
        <button class="same-style" id="4">4</button>
        <button class="same-style add" id="+">+</button>
        <button class="same-style" id="3">3</button>
        <button class="same-style" id="2">2</button>
        <button class="same-style" id="1">1</button>
        <button class="same-style minus" id="-">-</button>
        <button class="same-style" id="0">0</button>
        <button class="same-style" id=".">.</button>
        <button class="same-style" id="equal">=</button>
    </div>
</div>
    `

        let preResults = document.querySelector('.pre-results')
        let calculations = document.querySelector('.calculations')
        let num =[]


        function btnfunction(){
            document.querySelectorAll('button').forEach(function(btn){
                btn.addEventListener('click',function(e){
                    if(e.target.id === 'clear'){
                        calculations.innerHTML = ''
                    }
                    else if(e.target.id === 'equal'){
                        readnum()
                    }
                    else if(e.target.id === 'percent'){
                        calculations.innerHTML +='%'
                    }
                    else if(e.target.id === 'delete'){
                        backspace()
                    }
                    else{
                        calculations.innerHTML += e.target.id
                    }
                })
            })
            document.getElementById('clear').addEventListener('dblclick',function(){
                preResults.innerHTML=''
            })
        }
            document.addEventListener('keydown',function(e){
                switch(e.key){
                    case '1':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '2':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '3':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '4':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '5':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '6':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '7':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '8':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '9':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '0':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '-':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '+':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case '/':{
                        calculations.innerHTML += e.key
                        break
                    }
                    case 'shiftKey' && '5':{
                        calculations.innerHTML+= '%'
                        break
                    }
                    case '*':{
                        calculations.innerHTML+= e.key
                        break
                    }
                    case 'Enter':{
                        readnum()
                        break
                    }
                    case 'Backspace':{
                        backspace()
                        break
                    }
                }
            })

        function readnum (){
            num=document.querySelector('.calculations').innerHTML.split('')
            if(evaluate(num)){
                if(Math.round(evaluate(num))-evaluate(num)){
                    preResults.innerHTML = evaluate(num).toFixed(2)
                }
                else{
                    preResults.innerHTML = evaluate(num)
                }
            }
        }

        function evaluate(num){
            let arr=num.join('')
            return eval(arr)
        }

        function backspace(){
            let string = calculations.innerHTML.split('')
            string.pop()
            calculations.innerHTML = string.join('')
        }

        btnfunction()

}

async function rendernewsbox(id){
    newsgrid.innerHTML=''
    document.querySelector('.title-content').innerHTML=id
    let news
    id === "today's Hot" ? news = await getnewsalternate('general') :
    id === "gaming" ? news = await getnewsalternate('gaming') : 
    id === "politics" ? news = await getnewsalternate('politics'):
    id !== 'more' ?  news = await getnews2(id) :

    console.log(news)
    news.articles.forEach((item)=>{
        newsgrid.innerHTML+=`
        <div id="news" style="background-image:url('${item.urlToImage}');">
            <a href='https://www.${item.source.name}.com' target="_blank" class="news-source">${item.source.name}</a>
            <a href='${item.url}' target="_blank" class="news-heading">${item.title}</a>
        </div>
        `
        document.getElementById('news').style.backgroundImage = `url(${item.urlToImage})`
    })
}

function createlink(){
    const linkName = document.getElementById('link-name')
    const linkUrl = document.getElementById('link-url')
    class link{
        constructor(){
            this.name = linkName.value
            this.url = linkUrl.value
        }
    }
    links.push(new link)
    localStorage.setItem('linkobj',JSON.stringify(links))
    createlinkbox()
    linkName.value=''
    linkUrl.value=''
    document.querySelector('.provide-link').classList.toggle('display')
}

function createlinkbox(){
    console.log(links)
    if(links.length){
        let linkarr = []
        linkarr.push(links[links.length-1])
       constructlinkbox(linkarr)
       linkarr=[]
    }
}

function constructlinkbox(obj){
    obj.forEach(function(link){
        if(link){
            let parent = document.createElement('div')
            parent.setAttribute('class','link')
    
            let child1 = document.createElement('a')
            child1.setAttribute('href',link.url)
            child1.setAttribute('target','_blank')
    
            let iconchild = document.createElement('span')
            iconchild.setAttribute('class','material-symbols-outlined add')
            child1.appendChild(iconchild)
            iconchild.innerHTML='link'
    
            let child2 = document.createElement('p')
            child2.setAttribute('class','link-name')
            child2.innerHTML = link.name
    
            parent.appendChild(child1)
            parent.appendChild(child2)
    
            document.querySelector('.add-links').appendChild(parent)
        }
    })
}

function moreoptn(id){
    if(id !== 'more'){
        document.querySelector('.news-container').classList.toggle('display')
    }
    else{
        console.log('it will do other things')
        document.querySelector('.more-optn').classList.toggle('display')
    }
}

function fetchbackground(){
    return new Promise( async(resolve,reject)=>{
    let data = await fetch(`https://api.unsplash.com/search/photos?query=long exposure beach&per_page=30&orientation=landscape&client_id=IAVpYVbFGXbKvqvvloBwEhdaknXvHvhG9FoJX6FWL-8`)
    if(data.ok){
        let res = await data.json()
        resolve(res)
    }
    else{
        reject("image not fetched")
    }})
}

function givetime(){
    let date = new Date()
    document.querySelector('#current-time').innerHTML=date.toLocaleTimeString('short')
}

function randombackground(obj){
    document.querySelector('.container').style.backgroundImage = `url(${obj.urls.regular})`
}

function giveweatherinfo(){
    return new Promise(async(resolve,reject)=>{
        let res = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Pokhara?unitGroup=metric&key=46FRPBDYP9ZQ5CZTPB3BN3ZUK&contentType=json')
        if(res.ok){
            let data = await res.json()
            resolve(data)
        }
        else{
            reject('Weather info not fetched')
        }
    })
}

function displayweatherinfo(obj){
    const weathericon = document.querySelector('.weather-sign')
    obj.currentConditions.icon=== 'clear-night' ? weathericon.innerHTML='clear_night':
    obj.currentConditions.icon === 'clear-day' ? weathericon.innerHTML = 'clear_day':''
    document.querySelector('.weather-temp').innerHTML = `${Math.round(obj.currentConditions.temp)}°C`
    document.querySelector('.place').innerHTML=obj.resolvedAddress
}

function getnewsalternate(newstopic){
    return new Promise(async(resolve,reject)=>{
        let res = await fetch(`https://newsapi.org/v2/top-headlines?q=${newstopic}&pageSize=100&language=en&apiKey=37e0fb57e2ee4c9e90174d22d5a04de5`)
        if(res.ok){
            let data = await res.json()
            console.log(data)
            resolve(data)
        }
        else{
            reject(error)
        }
    })
}

function getnews2(newstopic){
    return new Promise(async(resolve,reject)=>{
        let res = await fetch(`https://newsapi.org/v2/top-headlines?category=${newstopic}&pageSize=100&language=en&apiKey=37e0fb57e2ee4c9e90174d22d5a04de5`)
        if(res.ok){
            let data = await res.json()
            console.log(data)
            resolve(data)
        }
        else{
            reject(error)
        }
    })
}

function showadminname(){
    document.getElementById('name').innerHTML += admin[i]
    i++
}

getapibefroerender()