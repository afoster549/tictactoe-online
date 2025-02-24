async function request() {
    response = await fetch("../api/create")

    if (response.status === 200) {
        const body = await response.json()
        
        window.location.href = `/game?id=${body.id}`
    } else {
        window.location.href = "/"
    }
}

request()