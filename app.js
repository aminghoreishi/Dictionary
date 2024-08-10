const btn = document.querySelector("button");
let input = document.querySelector("input");
let audio = document.querySelector("audio");
let showDir = document.querySelector(".showDir");
let word = document.querySelector(".word");
let def = document.querySelector(".def");
let svg = document.querySelector(".svg");
let ex = document.querySelector(".ex");

btn.addEventListener("click", () => {
  let inputVal = input.value.trim().toLowerCase();
  if (input.value) {
    getFetch(inputVal);
  }
});

async function getFetch(inputVal) {
  try {
    let fetchItem = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${inputVal}`
    );

    let res = await fetchItem.json();
    showDir.classList.replace("hidden", "block");
    await domAdd(res);
    console.log(res);
  } catch (error) {
    word.innerHTML = `<span class="text-red-600">No Definitions Found</span>`;
    def.innerHTML =
      "<span class='text-red-600'>Sorry pal, we couldn't find definitions for the word you were looking for.</span>";
    ex.innerHTML = `<span class="text-red-600">No Definitions Found</span>`;
    console.log(error);
  }
}

async function domAdd(res) {
  word.innerHTML = res[0].word;

  def.innerHTML = `<span class="text-blue-400">Definition:</span> ${res[0].meanings[0].definitions[0].definition} `;
  audio.src = res[0].sourceUrls[0];

  ex.innerHTML = `<span class="text-blue-400">Example:</span> ${
    res[0].meanings[0].definitions[0].example ||
    res[0].meanings[0].definitions[1].example
  }`;

  if (res[0].meanings[0].definitions[0].example === undefined) {
    ex.innerHTML = `<span class="text-blue-400">Example:</span> Not found`;
  }

  console.log(res[0].phonetics[0].audio);

  audio.src = res[0].phonetics[0].audio;
}

svg.addEventListener("click", () => {
  audio.play();
});
