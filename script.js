// https://api.adviceslip.com/advice/id

const button = document.querySelector("button");
const adviceText = document.querySelector(".advice-text");
const adviceId = document.querySelector(".advice-id");
const body = document.querySelector("body");
let isRotated = false;
// get object
async function getAdvice(id) {
  try {
    const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
    const obj = await response.json();
    return obj;
  } catch (error) {
    return error.message;
  }
}
// displaying the fetched advice and rotating the button after clicking it
button.addEventListener("click", async () => {
  isRotated = !isRotated;
  button.style.transform = `translateX(-50%) rotate(${isRotated ? 180 : 0}deg)`;
  const id = Math.floor(Math.random() * 225);
  let adviceObj = await getAdvice(id);

  if (adviceObj.slip) {
    adviceId.style.color = "var(--color-text1)";
    adviceId.textContent = `ADVICE #${adviceObj.slip.id}`;
    adviceText.textContent = adviceObj.slip.advice;
  } else if (adviceObj.message) {
    adviceId.textContent = adviceObj.message.type;
    adviceId.style.color = "red";
    adviceText.textContent = adviceObj.message.text;
  } else {
    adviceText.textContent = "Something went wrong.";
    adviceText.style.color = "red";
  }
});
// ////////////////////
