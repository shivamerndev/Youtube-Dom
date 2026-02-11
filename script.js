import { data } from "./data.js";
let arr = [...data]
let filter = document.querySelectorAll("#filter h1")
let menu = document.querySelector("#hamburger")
let side = document.querySelector("aside")
let flag = true

menu.addEventListener("click", (e) => {
    if (flag) {
        side.style.display = "none"
        flag = false
    } else {
        side.style.display = "flex"
        flag = true
    }
})


function createCard(e) {
    document.querySelector("main").innerHTML += ` <div id="card" class="text-white cursor-pointer">
            <figure class="rounded-2xl overflow-hidden relative">
                <img src=${e.thumbnail}
                    alt="">
                <p class="absolute right-0 bottom-0 bg-black/70 px-2 rounded">${e.duration || '20:15'}</p>
            </figure>
            <div class="p-4 ">
                <h1 class="font-bold text-lg">${e.title}</h1>
                <div class="flex items-center gap-4 mt-1">
                    <figure class="h-8 w-8 rounded-full overflow-hidden">
                        <img class="h-full w-full object-contain " src=${e.thumbnail} alt="S">
                    </figure>
                    <div class="flex flex-col">
                        <span class="text-sm font-semibold">${e.channelName || e.channel}</span>
                        <span class="text-xs text-gray-400">${e.views} . ${e.uploadedAt}</span>
                    </div>
                </div>
            </div>
        </div>`
}
function updateCards(arr) {
    document.querySelector("main").innerHTML = ""
    arr.forEach((e, i) => {
        createCard(e)
    })
}
updateCards(arr)

function filterCards(value) {
    if (value === 'all' || value === 'home') {
        arr = data
    } else {
        arr = data.filter(o => {
            return o.title.toLowerCase().includes(value) || o.channelName?.toLocaleLowerCase().includes(value) || o.channel?.includes(value)
        })
    }
    updateCards(arr)
}

document.querySelector("input").addEventListener("input", e => filterCards(e.target.value))

filter.forEach(f => {
    f.addEventListener("click", (e) => {
        filterCards(e.target.textContent.toLocaleLowerCase().trim())
    })
})

function voiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; // change to "hi-IN" for Hindi
    recognition.continuous = false;

    document.getElementById("start").addEventListener('click', () => {
        recognition.start();
    })

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        document.querySelector("input").value = text;
        filterCards(text.toLocaleLowerCase())
    };

    recognition.onerror = (event) => {
        console.log("Error:", event.error);
    };
}
voiceSearch()