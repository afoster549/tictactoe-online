const gameIdFeild = document.getElementById("game-id")
const joinButton = document.getElementById("join-btn")
const joinRandomButton = document.getElementById("join-random-btn")

gameIdFeild.addEventListener("input", () => {
    if (gameIdFeild.value.length === 6) {
        joinButton.classList.add("btn-regular")
        joinButton.classList.remove("btn-unavailable")
    } else {
        joinButton.classList.add("btn-unavailable")
        joinButton.classList.remove("btn-regular")
    }
})

function join() {
    if (gameIdFeild.value.length === 6) {
        window.location.href = `/game?id=${gameIdFeild.value}`
    }
}

async function joinRandom() {
    const res = await fetch("/api/random")
    const id = (await res.json()).id
    
    if (id !== null) {
        window.location.href = `/game?id=${id}`
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        join()
    }
})

joinButton.addEventListener("click", join)

joinRandomButton.addEventListener("click", joinRandom)