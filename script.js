const quotes = [
  "Kto rano wstaje, ten jest niewyspany.",
  "Jak nie wyjdzie, to trudno – przynajmniej było śmiesznie.",
  "To nie ja się spóźniłem, tylko czas się pospieszył.",
  "Nie mam problemów – mam tylko nieoczywiste rozwiązania.",
];

const apiUrl = "https://script.google.com/macros/s/AKfycbxRzQDunTmo6raAvMK8qH0vIJa0v8TwQy_B-sIsBy-YNIMeEi199Vnb6CcEp_kam1r9Jw/exec";

let current = 0;
const quoteText = document.getElementById("quote-text");
const quoteNumber = document.getElementById("quote-number");
const voteBtn = document.getElementById("vote-btn");
const nextBtn = document.getElementById("next-btn");
const votedInfo = document.getElementById("voted-info");

function showQuote() {
  quoteText.textContent = quotes[current];
  quoteNumber.textContent = current + 1;
  votedInfo.hidden = true;
}

voteBtn.addEventListener("click", () => {
  const data = { cytat: quotes[current] };

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then(() => {
      votedInfo.hidden = false;
      voteBtn.disabled = true;
      setTimeout(() => (voteBtn.disabled = false), 3000);
    })
    .catch((err) => {
      alert("Błąd podczas głosowania 😢");
      console.error(err);
    });
});

nextBtn.addEventListener("click", () => {
  current = (current + 1) % quotes.length;
  showQuote();
});

showQuote();
