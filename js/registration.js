function processRegistrationPayment() {
  const fileInput = document.getElementById("fileInput");
  const uploaderNameInput = document.getElementById("uploaderName");
  const regStatus = document.getElementById("regStatus");

  if (fileInput.files.length === 0) {
    alert("Please upload a media file first.");
    return;
  }

  if (!uploaderNameInput.value.trim()) {
    alert("Please enter your name.");
    return;
  }

  const file = fileInput.files[0];
  const uploaderName = uploaderNameInput.value.trim();
  
  regStatus.textContent = "💳 Processing payment...";

  // Simulate payment and registration
  setTimeout(() => {
    regStatus.textContent = "✅ Payment successful! Starting registration...";
    startRegistrationProcess(file, uploaderName);
  }, 2000);
}

function startRegistrationProcess(file, uploaderName) {
  const regStatus = document.getElementById("regStatus");
  const downloadSection = document.getElementById("downloadSection");
  const downloadLink = document.getElementById("downloadLink");

  // Prepare FormData to send the image and uploader's name
  const formData = new FormData();
  formData.append('file', file);
  formData.append('uploaderName', uploaderName);

  // Send the image file and uploader details to the backend
  fetch('https://server-eocz.onrender.com/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      regStatus.innerHTML = "✅ Registration complete!";  // Show tick mark and completion message
      // Simulate download link generation
      downloadLink.href = data.downloadLink;  // Use Cloudinary link
      downloadLink.textContent = "Download Image"; 
      downloadSection.classList.remove("hidden");
    } else {
      regStatus.textContent = "❌ Registration failed!";
    }
  })
  .catch(error => {
    regStatus.textContent = "❌ Registration failed!";
    console.error("Error during registration:", error);
  });
}
