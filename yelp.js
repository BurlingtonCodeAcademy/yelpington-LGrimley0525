//Setting map and selected tileLayer------------------------------------------------------------
let myMap = L.map("map").setView([44.4759, -73.2121], 15);

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {maxZoom: 19,attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
    }).addTo(myMap)


//Pulling info on selected restaurant to run through server and display on new page-----------
let path = window.location.pathname
let pathArray = path.split('/')
let id = pathArray.pop()
console.log(id)

let notes = document.getElementById('notes')
let phone = document.getElementById('phone')
let address = document.getElementById('address')

async function getRestData() {
    let data = await fetch(`https://json-server.burlingtoncodeacademy.now.sh/restaurants/${id}`)
        .then((response) => {
            return response.json();
        })
        .then((jsonObj) => {
            return jsonObj
        })
    notes.textContent = `Notes about the restaurant: ${data.notes}`
    phone.textContent = `Call for reservations or more information at: ${data.phone}`
    address.textContent = `Stop in at: ${data.address}`
    placeMarker(data.address)
}

getRestData(id)



//Creates the specific restaurant marker---------------------------------------------------

function placeMarker(address) {
fetch(`https://nominatim.openstreetmap.org/search/?q=${address}&format=json`)
.then(data => data.json())
.then((jsonObj) => {
let info = jsonObj[0];
let lat = info.lat;
console.log(lat)
let lon = info.lon;
console.log(lon)
L.marker([lat,lon]).addTo(myMap)
})

}
placeMarker()