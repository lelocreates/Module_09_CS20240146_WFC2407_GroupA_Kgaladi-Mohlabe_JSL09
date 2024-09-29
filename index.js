// get background image of body 
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(res => res.json()) 
    .then(data => {
        console.log(data.urls.full)
        document.body.style.backgroundImage = `url(${data.urls.full})`
        document.getElementById("author").textContent = `By: ${data.user.name}` // add author info 
    })
    .catch(err => {
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1448375240586-882707db888b?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3Mjc2NDA2NzR8&ixlib=rb-4.0.3&q=85)`
        document.getElementById("author").textContent = `By: ${data.user.name}`
        //add a way to report 
    })
