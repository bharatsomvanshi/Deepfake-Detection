const fileInput = document.querySelector("#imageUpload");
const uploadBtn = document.querySelector(".uploadBtn");
const dropBox = document.querySelector(".dropFile");
const detectBtn = document.querySelector("#detectBtn");
const resultDiv = document.querySelector("#result");
let filePresent = false;
let selectedFile = null;

console.log(fileInput, uploadBtn);

function setHeightWithAspectRatio(aspectRatio) {
  const containerWidth = dropBox.offsetWidth;
  const height = containerWidth / aspectRatio;
  dropBox.style.height = height + 'px';

  console.log(dropBox.style.height);
}

const uploadFile = (e) => {
  fileInput.click();
}

const fileChange = (e) => {
  const file = e.target.files[0];
  console.log('Files selected:', file);
  selectedFile = file;
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.classList.add("uplodedImg")
      dropBox.innerHTML = `<video controls width="640" height="360" class="uplodedImg">
        <source src="${e.target.result}" type="video/mp4">
        Your browser does not support the video tag.
    </video>`;
      // dropBox.appendChild(img)
      dropBox.style.width = "fit-content";
      dropBox.addEventListener("click", uploadFile);
      filePresent = true;
      resultDiv.innerHTML = "Click Detect!!";
    };
    reader.readAsDataURL(file);
  }
}

const predict = async (e) => {
  if (filePresent) {
    resultDiv.innerHTML = "Wait Processing...";
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    let bodyContent = new FormData();
    bodyContent.append("files", selectedFile);

    let response = await fetch("http://127.0.0.1:8000/upload-video/", {
      method: "POST",
      body: bodyContent,
      headers: headersList
    });

    let data = await response.json();
    console.log(data);
    resultDiv.innerHTML = data.prediction;
  }
};


uploadBtn.addEventListener("click", uploadFile)
fileInput.addEventListener("change", fileChange);
detectBtn.addEventListener("click", predict);

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start' // Adjust alignment, if needed
      });
    }
  });
});