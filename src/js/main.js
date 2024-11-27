"use strict";

const cardTitle = document.querySelector(".title-js");
const inputName = document.querySelector(".inputName-js");
const cardName = document.querySelector(".name-js");
const cardQuote = document.querySelector(".quote-js");
const generateButton = document.querySelector(".quote-btn");
const cardElement = document.querySelector(".card-js");
const saveAsImageButton = document.querySelector(".save-image-js");
const resizeButtons = document.querySelectorAll(".resize-btn");
const leftButton = document.querySelector(".left-js");
const rightButton = document.querySelector(".right-js");
const photoDiv = document.querySelector(".photodiv-js");

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

//Palettes

const handleSetPalette = () => {
  const selectedPalette = document.querySelector("input[name=palette]:checked");

  if (selectedPalette.value === "mixtape") {
    cardElement.classList.add("mixtape");
    cardElement.classList.remove("graduation");
    cardElement.classList.remove("twisted");
    cardElement.classList.remove("lifePablo");
    photoDiv.classList.remove("twisted2");
    cardElement.classList.remove("ye");
  } else if (selectedPalette.value === "graduation") {
    cardElement.classList.add("graduation");
    cardElement.classList.remove("twisted");
    cardElement.classList.remove("lifePablo");
    photoDiv.classList.remove("twisted2");
    cardElement.classList.remove("ye");
    cardElement.classList.remove("mixtape");
  } else if (selectedPalette.value === "fantasy") {
    cardElement.classList.add("twisted");
    photoDiv.classList.add("twisted2");
    cardElement.classList.remove("graduation");
    cardElement.classList.remove("lifePablo");
    cardElement.classList.remove("ye");
    cardElement.classList.remove("mixtape");
  } else if (selectedPalette.value === "pablo") {
    cardElement.classList.remove("graduation");
    cardElement.classList.remove("twisted");
    photoDiv.classList.remove("twisted2");
    cardElement.classList.add("lifePablo");
    cardElement.classList.remove("ye");
    cardElement.classList.remove("mixtape");
  } else {
    cardElement.classList.remove("graduation");
    cardElement.classList.remove("twisted");
    photoDiv.classList.remove("twisted2");
    cardElement.classList.remove("lifePablo");
    cardElement.classList.add("ye");
    cardElement.classList.remove("mixtape");
  }
};

document.querySelectorAll("input[name=palette]").forEach((radio) => {
  radio.addEventListener("change", handleSetPalette);
});

handleSetPalette();

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
  html2canvas(cardElement, { backgroundColor: null }).then((canvas) => {
    const roundedCanvas = document.createElement("canvas");
    const ctx = roundedCanvas.getContext("2d");

    const { width, height } = cardElement.getBoundingClientRect();
    const scaleFactor = canvas.width / width;
    const borderRadius = cardElement.classList.contains("large")
      ? 40 * scaleFactor
      : 0;

    roundedCanvas.width = canvas.width;
    roundedCanvas.height = canvas.height;

    ctx.beginPath();
    ctx.moveTo(borderRadius, 0);
    ctx.arcTo(canvas.width, 0, canvas.width, canvas.height, borderRadius);
    ctx.arcTo(canvas.width, canvas.height, 0, canvas.height, borderRadius);
    ctx.arcTo(0, canvas.height, 0, 0, borderRadius);
    ctx.arcTo(0, 0, canvas.width, 0, borderRadius);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(canvas, 0, 0);

    const imgData = roundedCanvas.toDataURL("image/png");
    const downloadLink = document.createElement("a");
    downloadLink.href = imgData;
    downloadLink.download = "kanye_card.png";
    downloadLink.click();
  });
};

saveAsImageButton.addEventListener("click", handleSaveImage);

//Resize card
const handleResize = (event) => {
  const newSize = event.currentTarget.dataset.size;
  cardElement.classList.remove("small", "large");
  cardElement.classList.add(newSize);

  if (newSize === "small") {
    leftButton.disabled = true;
    rightButton.disabled = false;
  } else if (newSize === "large") {
    rightButton.disabled = true;
    leftButton.disabled = false;
  }
};

resizeButtons.forEach((button) => {
  button.addEventListener("click", handleResize);
});

cardElement.classList.add("small");
leftButton.disabled = true;
rightButton.disabled = false;
