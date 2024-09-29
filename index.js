// Fetch a random background image of nature from the Unsplash API
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json())  //converts the response to JSON
    .then(data => {
        console.log(data.urls.full)
        document.body.style.backgroundImage = `url(${data.urls.full})` // Set the background image of the body element
        document.getElementById("author").textContent = `By: ${data.user.name}` // add author info 
    })
    .catch(err => {
        // If there's an error, use a backup background image if something goes wrong with the API
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc2NDA2NzR8&ixlib=rb-4.0.3&q=85)`
        document.getElementById("author").textContent = `By: ${data.user.name}`
        //add a way to report 
    })

// get dogecoin data from the coingecko API
fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")  // Throw an error if the response is not okay
        }
        return res.json() // Convert the response to JSON
    })
    .then(data => {
        // Display Dogecoin info on the webpage
        document.getElementById("crypto-top").innerHTML = `
            <img src=${data.image.small} /> <!-- Dogecoin image -->
            <span>${data.name}</span> <!-- Dogecoin name -->
        `
        document.getElementById("crypto").innerHTML += `
            <p>🎯: $${data.market_data.current_price.usd}</p> <!-- Current price -->
            <p>👆: $${data.market_data.high_24h.usd}</p>  <!-- High price in the last 24 hours -->
            <p>👇: $${data.market_data.low_24h.usd}</p> <!-- Low price in the last 24 hours -->
        `
    })
    .catch(err => console.error(err)) // Log any errors to the console

// Function to get and display the current time
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-sa", {timeStyle: "short"})
}


// Update the time every second
setInterval(getCurrentTime, 1000)

// Get the user's current location and fetch weather data based on it
navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        .then(res => {
            if (!res.ok) {
                throw Error("Weather data not available") // Throw an error if weather data isn't available
            }
            return res.json()
        })
        .then(data => {
            console.log(data)
            const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` // Get the weather icon URL
            document.getElementById("weather").innerHTML = `
                <img src=${iconUrl} />
                <p class="weather-temp">${Math.round(data.main.temp)}º</p>
                <p class="weather-city">${data.name}</p>
            `
        })
        .catch(err => console.error(err)) // Log any errors to the console
});
