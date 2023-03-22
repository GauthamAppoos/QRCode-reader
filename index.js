const wrapper = document.querySelector('.wrapper');
const form = document.querySelector('form');
const fileInp = document.querySelector('input');
const infoText = document.querySelector('p');
const closeBtn = document.querySelector('.close');
const copyBtn = document.querySelector('.copy');

// Fetch data from Api
function fetchRequest(file, formData){
    infoText.innerText = "Scanning QR Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/", {
        method: 'POST', body: formData
    }).then(res => res.json()).then(result =>{
        result = result[0].symbol[0].data;
        infoText.innerText = result ? "Upload QR code to scan": "Couldn't Scan QR Code";
        if(!result) return;
        document.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(()=>{
        infoText.innerText = "Couldn't scan QR Code...";
    });
}

//Send QR code file with request to api
fileInp.addEventListener("change", async e =>{
    let file = e.target.files[0];
    if (!file) return;
    let formData = new FormData();
    formData.append('file', file);
    fetchRequest(file, formData);
});

// Copy text to clipboard
copyBtn.addEventListener("click", () => {
    let text = document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});

//When user clicks on form do fileInp Eventlistner function
form.addEventListener("click", () => fileInp.click());

//Close button
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));