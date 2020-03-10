//Setting map and selected tileLayer------------------------------------------------------------
myMap = L.map("map").setView([44.4759, -73.2121], 16);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
}).addTo(myMap)


//navigation with dropdown menu-----------------------------------------------
let dropTop = document.getElementById("menu")

let content = document.getElementById("drop-content")
dropTop.addEventListener('click', toggleDrop)

function toggleDrop(event) {
    if (content.style.display === 'none') {
        content.style.display = "inline"
    } else { content.style.display = "none" }
}
async function restNav() {
    let menuList = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
        .then((response) => {
            return response.json()
        })
        .then((jsonObj) => {
            return jsonObj
        })
    menuList.forEach((post) => {
        let id = post.id
        let name = post.name
        let link = document.createElement('a')
        link.setAttribute('href', '../yelp/' + id)
        let item = document.createElement('li')
        link.textContent = name
        item.appendChild(link)
        content.appendChild(item)
    })
}
restNav()


//Pulling info on selected restaurant to run through server and display on new page-----------

let path = window.location.pathname
let pathArray = path.split('/')
let id = pathArray.pop()

let notes = document.getElementById('notes')
let phone = document.getElementById('phone')
let address = document.getElementById('address')
let name = document.getElementById('restName')
let hours = document.getElementById('hours')
let commentSection = document.getElementById('commentSection')

async function getRestData() {
    let data = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${id}`)
        .then((response) => {
            return response.json();
        })
        .then((jsonObj) => {
            return jsonObj;
        })
    name.textContent = ` ${data.name}:`
    commentSection.textContent = `COMMENTS ABOUT THE RESTAURANT:  `
    phone.textContent = `Call for Reservations or Questions: ${data.phone}`
    address.textContent = `Stop in at:  ${data.address}`

    //ensure proper hour display if no hours listed------------------------ 

    if ('hours' in data) {
        hours.textContent = `Hours of Operation: ${data.hours}`
    } else { hours.textContent = "Hours of Operation: No posted hours, contact restaurant for hours" }
    

    //separates and creates list elements in note section------------------

    data.notes.forEach(element => {
        commentSection.innerHTML += `<li>${element}</li>`
    })


    placeMarker(data.address)
}
getRestData(id)


//Creates the specific restaurant map marker---------------------------------------------------

function placeMarker(address) {
    fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
        .then(data => data.json())
        .then((jsonObj) => {
            let info = jsonObj[0];
            let lat = info.lat;
            let lon = info.lon;
            L.marker([lat, lon]).addTo(myMap)
        })
}
placeMarker()

