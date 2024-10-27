emailChars = [
  "m",
  "o",
  "c",
  ".",
  "l",
  "i",
  "a",
  "m",
  "g",
  "@",
  "t",
  "e",
  "l",
  "l",
  "i",
  "u",
  "o",
  "b",
  ".",
  "n",
  "i",
  "t",
  "s",
  "u",
  "g",
  "a",
];
reversedEmailChars = emailChars.reverse();
email = reversedEmailChars.join("");

document.addEventListener("DOMContentLoaded", function (event) {
  document
    .querySelectorAll(`[data-email]`)
    .forEach((ele) => (ele.textContent = email));
});
