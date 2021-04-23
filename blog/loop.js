let iterations = document.getElementById("iterations");
let next = document.getElementById("next");
next.addEventListener("click", iterate);

function iterate() {
  [...document.querySelectorAll("p")].forEach((element) => {
    element.classList.add("invisible");
  });
  setTimeout(function increment() {
    iterations.innerText++;
    document.getElementById("plural").innerText = "s";
    revealParagraphsOneByOne();
  }, 1000);
}

function revealParagraphsOneByOne() {
  ["first", "second", "third"].forEach((paragraphId, i) => {
    setTimeout(revealElement(paragraphId), (i + 1) * 1500);
  });
}

function revealElement(id) {
  return function inner() {
    document.getElementById(id).classList.remove("invisible");
  };
}
