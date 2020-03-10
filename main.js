//Setting map and selected tileLayer----------------------------------------
let myMap = L.map('map').setView([44.4774, -73.2121], 15);

L.tileLayer
    ('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    }).addTo(myMap)
    

//navigation and dropdown menu-----------------------------------------------

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
        link.setAttribute('href', 'yelp/' + id)
        let item = document.createElement('li')
        link.textContent = name
        item.appendChild(link)
        content.appendChild(item)
    })
}
restNav()


//pull in restaurants and put in a list on main page-----------------------------

let listContainer = document.getElementById("post-list")

async function getRestaurants() {
    let restList = await fetch('https://json-server.burlingtoncodeacademy.now.sh/restaurants')
        .then((response) => {
            return response.json()
        })
        .then((jsonObj) => {
            return jsonObj
        })

    restList.forEach((post) => {
        let id = post.id
        let name = post.name
        let link = document.createElement('a')
        link.setAttribute('href', 'yelp/' + id)
        let item = document.createElement('li')
        link.textContent = name
        item.appendChild(link)
        listContainer.appendChild(item)
    })

    restList.forEach((post) => {
        let name = post.name;
        let address = post.address;
        let id = post.id;
        restMapMarker(name, address, id);
    })
}
getRestaurants()


// function to put restaurant location markers on map------------------------------------------------

function restMapMarker(name, address, id) {
    fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
        .then(data => data.json())
        .then((jsonObj) => {
            let info = jsonObj[0];
            let lat = info.lat;
            let lon = info.lon;
            let mapMarker = L.marker([lat, lon]).addTo(myMap).bindPopup(name)

            //when mouse goes over marker, restaurant name pops up
            mapMarker.on('mouseover', () => {
                mapMarker.openPopup()
            })

            //when you click on marker, opens to the restaurants specific page
            mapMarker.on('click', function () {
                window.open(`/yelp/${id}`)
            })
        })
}