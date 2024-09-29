// Attempt to fetch a random background image from the Unsplash API
try {
    // Fetch the image data from the API
    const res = await fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    const data = await res.json()
    // Set the background image of the page and display the author's name
    document.body.style.backgroundImage = `url(${data.urls.regular})`
    document.getElementById("author").textContent = `By: ${data.user.name}`
} catch (err) {
    // If an error occurs, set a default background image
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc2NDA2NzR8&ixlib=rb-4.0.3&q=85)`
    document.getElementById("author").textContent =  `By: ${data.user.name}`
}
// Fetch Dogecoin data from the CoinGecko API
try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    // If the response isn't OK, throw an error
    if (!res.ok) {
        throw Error("Something went wrong")
    }
    const data = await res.json()
    // Display Dogecoin information: image and name
    document.getElementById("crypto-top").innerHTML = `
        <img src=${data.image.small} />
        <span>${data.name}</span>
    `
    document.getElementById("crypto").innerHTML += `
    /**    <p>🎯: $${data.market_data.current_price.usd}</p>
    /**    <p>👆: $${data.market_data.high_24h.usd}</p>
    /**    <p>👇: $${data.market_data.low_24h.usd}</p>
    `
} catch (err) {
    // Log any errors that occur during the fetch or processing
    console.error(err)
}

// Function to get and display the current time
function getCurrentTime() {
    const date = new Date()
    document.getElementById("time").textContent = date.toLocaleTimeString("en-sa", { timeStyle: "short" })
}
// Update the current time on the page every second
setInterval(getCurrentTime, 1000)

// Get the user's current location and fetch weather data based on it
navigator.geolocation.getCurrentPosition(async position => {
    try {
        // Fetch weather data based on the user's latitude and longitude
        const res = await fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
        if (!res.ok) {
            throw Error("Weather data not available")
        }
        const data = await res.json()
        // Get the weather icon and display it along with the temperature and city name
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        document.getElementById("weather").innerHTML = `
            <img src=${iconUrl} />
            <p class="weather-temp">${Math.round(data.main.temp)}º</p> <!-- Display temperature -->
            <p class="weather-city">${data.name}</p> <!-- Display city name -->
        `
    } catch (err) {
         // Log any errors that occur during the fetch or processing
        console.error(err)
    }
});
