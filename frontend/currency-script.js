const paymentForm = document.getElementById("paymentForm");
const submittedInfo = document.getElementById("submittedInfo");
const waitingInfo = document.getElementById("waitingInfo");

paymentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(paymentForm);

  submittedInfo.innerHTML = "";
  for (let pair of formData.entries()) {
    const key = pair[0];
    const value = pair[1];

    const info = document.createElement("p");
    info.innerText = `${key}: ${value}`;
    submittedInfo.appendChild(info);
  }

  submittedInfo.style.display = "block";
  waitingInfo.style.display = "block";
});

const apiUrl = "http://localhost:5000";

function sendPayment() {
  const sendButton = document.querySelector("#waitingInfo .btn-pay");
  sendButton.textContent = "Loading...";

  const selectedCurrency = localStorage.getItem("selectedCurrency");
  const bitcoinValue = document.getElementById("bitcoinInput").value.trim();
  const url = `${apiUrl}/payed`;
  const body = {
    currency: selectedCurrency,
    value: bitcoinValue,
  };

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      displayPopup(data.message);
    })
    .catch((error) => {
      console.error("Error:", error);
    })
    .finally(() => {
      sendButton.textContent = "Send";
    });
}

function displayPopup(message) {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popupMessage");
  popupMessage.textContent = "Операція " + message + " Надіслана";
  popup.style.display = "block";
}

function closePopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "none";
  window.location.href = "index.html";
}

function updateConversionRate() {
  const currencyDropdown = document.getElementById("currency");
  const selectedCurrency = currencyDropdown.value;
  const selectedCurrency1 = localStorage.getItem("selectedCurrency");

  const bitcoinInput = document.getElementById("bitcoinInput");
  const privat24Input = document.getElementById("privat24Input");

  const bitcoinValue = bitcoinInput.value.trim();
  if (selectedCurrency && bitcoinValue) {
    const url = `${apiUrl}/convert?currency=${selectedCurrency1}&value=${bitcoinValue}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let conversionRateUAH;

        if (selectedCurrency === "uah") {
          conversionRateUAH = data.uah_rate;
        } else {
          conversionRateUAH = data.usd_rate;
        }
        const convertedAmount = (bitcoinValue * conversionRateUAH).toFixed(2);
        privat24Input.value = `${conversionRateUAH} ${selectedCurrency.toUpperCase()}`;
      })
      .catch((error) => {
        console.error("Error:", error);
        privat24Input.value = "";
      });
  } else {
    privat24Input.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const bitcoinInput = document.getElementById("bitcoinInput");
  const privat24Input = document.getElementById("privat24Input");
  const amountElement = document.getElementById("amount");

  const bitcoinLabelText = localStorage.getItem("selectedCurrency");
  const infoText = localStorage.getItem("infoText");

  const bitcoinLabel = document.getElementById("btc-label");
  const infoParagraph = document.querySelector(".info p");

  bitcoinLabel.textContent = bitcoinLabelText;
  infoParagraph.textContent = "Info about " + bitcoinLabelText;

  bitcoinInput.addEventListener("input", function () {
    updateConversionRate();
    amountElement.textContent = `Amount: ${bitcoinInput.value.trim()}`;
  });

  const currencyDropdown = document.getElementById("currency");
  currencyDropdown.value = localStorage.getItem("selectedCurrency");
  currencyDropdown.addEventListener("change", updateConversionRate);

  // Check if user is logged in and display email
  const userEmail = localStorage.getItem("email");
  const userEmailElement = document.getElementById("email");
  if (userEmail) {
    userEmailElement.value = userEmail;
  }
});
