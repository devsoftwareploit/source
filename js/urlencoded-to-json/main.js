document.addEventListener("DOMContentLoaded", function () {
  const outputElement = document.getElementById("output");
  const inputElement = document.getElementById("input");
  const convertButton = document.getElementById("convert");
  const copyButton = document.getElementById("copy");
  let rotating = false;

  convertButton.addEventListener("click", () => {
    const input = inputElement.value;
    const output = convertToJson(input);
    outputElement.innerHTML = output;
    const rotateImg = convertButton.getElementsByTagName("img")[0];

    if (rotating) return;

    rotateImg.classList.add("rotate-img");
    rotating = true;

    setTimeout(function () {
      rotateImg.classList.remove("rotate-img");
      rotating = false;
    }, 1000);
  });

  copyButton.addEventListener("click", copyToClipboard);
});

/**
 * @link https://stackoverflow.com/a/65512971/12542704
 * @param {string} value
 * @returns {string}
 */
function convertToJson(value) {
  return JSON.stringify(
    Object.fromEntries(
      value
        .trim()
        .split("&")
        .map((s) => s.split("="))
        .map((pair) => pair.map(decodeURIComponent))
    ),
    undefined,
    2
  );
}

async function copyToClipboard() {
  const copyText = document.getElementById("output").innerHTML;

  try {
    await navigator.clipboard.writeText(copyText);
    showClipboardSuccess();
  } catch (err) {
    showClipboardError();
  }
}

function showDefaultClipboard() {
  const copyButton = document.getElementById("copy");

  copyButton.getElementsByTagName("img")[0].src = "assets/copy.svg";
  copyButton.getElementsByTagName("span")[0].innerHTML = "Copy";
}

function showClipboardSuccess() {
  const copyButton = document.getElementById("copy");

  copyButton.getElementsByTagName("img")[0].src = "assets/success.svg";
  copyButton.getElementsByTagName("span")[0].innerHTML = "Copied";

  setTimeout(() => {
    showDefaultClipboard();
  }, 1500);
}

function showClipboardError() {
  const copyButton = document.getElementById("copy");

  copyButton.getElementsByTagName("img")[0].src = "assets/error.svg";
  copyButton.getElementsByTagName("span")[0].innerHTML = "Error";

  setTimeout(() => {
    showDefaultClipboard();
  }, 1500);
}

function simpleConvert(value) {
  return '{"' + value.replaceAll("&", '", "').replaceAll("=", '": "') + '"}';
}
