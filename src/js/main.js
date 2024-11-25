"use strict";

const cardTitle = document.querySelector(".title-js");
const inputName = document.querySelector(".inputName-js");
const cardName = document.querySelector(".name-js");

const setMessage = () => {
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
  radio.addEventListener("change", setMessage);
});

setMessage();

const setReceiver = (ev) => {
  ev.preventDefault();
  const value = inputName.value;
  cardName.innerHTML = value;
};

inputName.addEventListener("change", setReceiver);
