"use strict";

const bill = document.querySelector(".bill");
const tipFivePercent = document.querySelector(".tip__5");
const tipTenPercent = document.querySelector(".tip__10");
const tipFifteenPercent = document.querySelector(".tip__15");
const tipTwentyPercent = document.querySelector(".tip__25");
const tipFifteePercet = document.querySelector(".tip__50");
const tipCustomInput = document.querySelector(".custom-tip");
const numberOfPeople = document.querySelector(".ppl-input");
const resetButton = document.querySelector(".reset-btn");
const inputError = document.querySelector(".error");
const billError = document.querySelector(".bill_error");
console.log(inputError);

let tipAmount;
let tipAmountPerPerson;
let people;
let totalPerPerson;
let billAmount;
let customAmount;

const tips = [
  tipFivePercent,
  tipTenPercent,
  tipFifteenPercent,
  tipTwentyPercent,
  tipFifteePercet,
];
console.log(tips);

// Checks if Number of People input is different from 0

numberOfPeople.addEventListener("change", () => {
  people = Number(numberOfPeople.value);
  if (people === 0) {
    inputError.textContent = "Can't be zero";
    numberOfPeople.style.outline = "solid 1px #BE5E4D";
  } else if (people !== 0) {
    inputError.textContent = "";
    numberOfPeople.style.outline = "none";
  }
  console.log(people);
});

// Checks if Bill Input is different from 0

bill.addEventListener("change", () => {
  billAmount = Number(bill.value);
  if (billAmount === 0) {
    billError.textContent = "Can't be zero";
    bill.style.outline = "solid 1px #BE5E4D";
  } else if (billAmount !== 0) {
    billError.textContent = "";
    bill.style.outline = "none";
  }
});

// Claculate tip for the defined buttons.

const calcTip = function (percentages) {
  for (let i = 0; i < percentages.length; i++) {
    percentages[i].addEventListener("click", () => {
      if (people !== 0 && bill !== 0 && people && bill) {
        let value = Number(percentages[i].innerHTML.match(/\d+/));
        console.log(value);

        people = Number(numberOfPeople.value);
        tipAmount = (Number(bill.value) * value) / 100;
        tipAmountPerPerson = tipAmount / people;
        totalPerPerson = (Number(bill.value) + tipAmount) / people;
        document.querySelector(
          ".ammount-tip",
        ).textContent = `$${tipAmountPerPerson.toFixed(2)}`;
        document.querySelector(
          ".total-amount-person",
        ).textContent = `$${totalPerPerson.toFixed(2)}`;

        for (let i = 0; i < percentages.length; i++) {
          percentages[i].classList.contains("btn-active");
          percentages[i].classList.remove("btn-active");
        }
        percentages[i].classList.add("btn-active");
      }
    });
  }
};

calcTip(tips);

// Calculate tip for the custom input.

const calcCustom = function () {
  tipCustomInput.addEventListener("input", () => {
    customAmount = Number(tipCustomInput.value);
    if (customAmount > 100) {
      alert("Number must be lower than 100");
    } else if (customAmount <= 100 && customAmount > 0) {
      console.log(customAmount);
      people = Number(numberOfPeople.value);
      tipAmount = (Number(bill.value) * customAmount) / 100;
      tipAmountPerPerson = tipAmount / people;
      totalPerPerson = (Number(bill.value) + tipAmount) / people;
      document.querySelector(
        ".ammount-tip",
      ).textContent = `$${tipAmountPerPerson.toFixed(2)}`;
      document.querySelector(
        ".total-amount-person",
      ).textContent = `$${totalPerPerson.toFixed(2)}`;
    }
  });
};

calcCustom();

// Reset Button
const reset = function (percentages) {
  resetButton.addEventListener("click", () => {
    document.querySelector(".ammount-tip").textContent = "$0.00";
    document.querySelector(".total-amount-person").textContent = "$0.00";
    bill.value = "";
    numberOfPeople.value = "";
    tipCustomInput.value = "";
    for (let i = 0; i < percentages.length; i++) {
      // Checks if the button contains 'btn-active' class
      percentages[i].classList.contains("btn-active");
      // Removes 'btn-active' class if its exists.
      percentages[i].classList.remove("btn-active");
    }
  });
};

reset(tips);
