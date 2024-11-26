"use strict";

const cardTitle = document.querySelector(".title-js");
const inputName = document.querySelector(".inputName-js");
const cardName = document.querySelector(".name-js");
const cardQuote = document.querySelector(".quote-js");
const generateButton = document.querySelector(".quote-btn");
const cardElement = document.querySelector(".card-js");
const saveAsImageButton = document.querySelector(".save-image-js");

// Setting message
const handleSetMessage = () => {
  const selectedMessage = document.querySelector(
    'input[name="message"]:checked'
  );

  if (selectedMessage.value === "birthday") {
    cardTitle.innerHTML = "Happy Birthday";
  } else if (selectedMessage.value === "sorry") {
    cardTitle.innerHTML = "Sorry";
  } else {
    cardTitle.innerHTML = "Love you";
  }
};

document.querySelectorAll("input[name=message]").forEach((radio) => {
  radio.addEventListener("change", handleSetMessage);
});

handleSetMessage();

// Setting receiver
const handleReceiver = (ev) => {
  ev.preventDefault();
  const value = inputName.value;
  cardName.innerHTML = value;
};

inputName.addEventListener("change", handleReceiver);

// Setting Kanye's quote
const handleQuote = () => {
  fetch("https://api.kanye.rest")
    .then((response) => response.json())
    .then((data) => {
      cardQuote.innerHTML = `"${data.quote}"`;
    })
    .catch((error) => {
      console.error("Error fetching the quote:", error);
      cardQuote.innerHTML = "Oops! Something went wrong.";
    });
};
generateButton.addEventListener("click", handleQuote);

handleQuote();

//Save image
const handleSaveImage = () => {
  html2canvas(cardElement).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imgData;
    downloadLink.download = "kanye_card.png";
    downloadLink.click();
  });
};

saveAsImageButton.addEventListener("click", handleSaveImage);
