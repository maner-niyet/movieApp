const count = document.querySelector("#count")
const total = document.querySelector("#total")
const container = document.querySelector(".container")
const movieSelect = document.querySelector("#movie")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")

populateUI()

let ticketPrice = +movieSelect.value
//function update count and total price
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected")

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length
    count.innerHTML = selectedSeatsCount;
    total.innerHTML = selectedSeatsCount * ticketPrice
}

//save in localStorage selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex)
    localStorage.setItem("selectedMoviePrice", moviePrice)
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex")

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}
//movie select
movieSelect.addEventListener("change", e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    
    updateSelectedCount()
})
//add seat slick event
container.addEventListener("click", e => {
    if (e.target.classList.contains("seat") && 
    !e.target.classList.contains("occupied")){
        e.target.classList.toggle("selected")
    }

    updateSelectedCount()
})


updateSelectedCount()
