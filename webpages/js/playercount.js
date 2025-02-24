async function updatePlayerCount() {
    const response = await fetch("/api/playercount")

    if (response.status === 200) {
        const body = await response.json()

        document.getElementById("player-count").innerText = `${body.count} players online.`
    } else {
        document.getElementById("player-count").innerText = "null players online."
    }
}

updatePlayerCount()

setInterval(updatePlayerCount, 10000)