function showPopup() {
  const popup = document.getElementById("popup");
  popup.classList.add("visible");
}

function hidePopup() {
  const popup = document.getElementById("popup");
  popup.classList.remove("visible");
}

function login(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Perform your login logic here
  // You can check the credentials, make API calls, etc.

  // Save user info in localStorage
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  hidePopup();

  // Redirect to index.html
  window.location.href = "index.html";
}

function logout() {
  // Remove user info from localStorage
  localStorage.removeItem("email");
  localStorage.removeItem("password");

  showPopup();
}

const url = "http://localhost:5000";

function fetchCurrencyRates(currency) {
  return fetch(`${url}/convert?currency=${currency}`)
    .then((response) => response.json())
    .then((data) => data);
}

// Check if user is logged in and display email
const userEmail = localStorage.getItem("email");
const userEmailElement = document.getElementById("userEmail");
if (userEmail) {
  userEmailElement.textContent = userEmail;
}

// Fetch rates for BTC
fetchCurrencyRates("BTC").then((data) => {
  const btcRateElement = document.getElementById("btcRate");
  btcRateElement.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
  const btcRateElement1 = document.getElementById("btcRate1");
  btcRateElement1.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
});

// Fetch rates for LTC
fetchCurrencyRates("LTC").then((data) => {
  const ltcRateElement = document.getElementById("ltcRate");
  ltcRateElement.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
  const ltcRateElement1 = document.getElementById("ltcRate1");
  ltcRateElement1.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
});

// Fetch rates for DOGE
fetchCurrencyRates("DOGE").then((data) => {
  const dogeRateElement = document.getElementById("dogeRate");
  dogeRateElement.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
  const dogeRateElement1 = document.getElementById("dogeRate1");
  dogeRateElement1.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
});

// Fetch rates for XRP
fetchCurrencyRates("XRP").then((data) => {
  const xrpRateElement = document.getElementById("xrpRate");
  xrpRateElement.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
  const dogeRateElement1 = document.getElementById("xrpRate1");
  dogeRateElement1.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
});

// Fetch rates for DASH
fetchCurrencyRates("DASH").then((data) => {
  const dashRateElement = document.getElementById("dashRate");
  dashRateElement.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
  const dashRateElement1 = document.getElementById("dashRate1");
  dashRateElement1.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
});

// Fetch rates for TRX
fetchCurrencyRates("TRX").then((data) => {
  const trxRateElement = document.getElementById("trxRate");
  trxRateElement.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
  const trxRateElement1 = document.getElementById("trxRate1");
  trxRateElement1.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
});

// Fetch rates for BCH
fetchCurrencyRates("BCH").then((data) => {
  const bchRateElement = document.getElementById("bchRate");
  bchRateElement.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
  const bchRateElement1 = document.getElementById("bchRate1");
  bchRateElement1.textContent = `${data.uah_rate} UAH / ${data.usd_rate} USD`;
});

// Check if user is logged in
const email = localStorage.getItem("email");
const password = localStorage.getItem("password");

if (!email || !password) {
  showPopup();
}

// Add event listener to login form
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", login);

function saveCurrency(currency) {
  localStorage.setItem("selectedCurrency", currency);
  window.location.href = "currency.html";
}
