async function startVerification() {
  const verFileInput = document.getElementById("verFileInput");
  const verStatus = document.getElementById("verStatus");
  const creatorDetails = document.getElementById("creatorDetails");
  const aiAnalysis = document.getElementById("aiAnalysis");

  if (verFileInput.files.length === 0) {
    alert("Please upload a file for verification.");
    return;
  }

  const file = verFileInput.files[0];
  const base64Image = await convertToBase64(file);

  verStatus.textContent = "🔄 Extracting pointer...";
  
  // Simulate pointer extraction
  setTimeout(async () => {
    const simulatedPointer = "LqXhXso";
    verStatus.textContent = `✅ Tracker ID extracted: ${simulatedPointer}`;

    aiAnalysis.textContent = "🔍 Analyzing image with AI...";
    try {
      const response = await fetch('https://server-eocz.onrender.com/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: base64Image })
      });
      const data = await response.json();
      aiAnalysis.innerHTML = `<strong>AI Analysis:</strong><br>${data.analysis ? data.analysis.replace(/\n/g, '<br>') : "No analysis available"}`;
      creatorDetails.classList.remove("hidden");
    } catch (error) {
      aiAnalysis.textContent = "❌ Failed to get AI analysis.";
      console.error("AI Analysis Error:", error);
    }
  }, 2000);
}

// Convert uploaded file to Base64
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
  });
}

function processPayment() {
  const paymentStatus = document.getElementById("paymentStatus");
  const downloadCreatorSection = document.getElementById("downloadCreatorSection");
  const verFileInput = document.getElementById("verFileInput");

  paymentStatus.textContent = "💳 Processing payment...";
  paymentStatus.classList.remove("hidden");

  setTimeout(() => {
    paymentStatus.textContent = "✅ Payment successful!";
    const file = verFileInput.files[0];
    const downloadCreatorLink = document.getElementById("downloadCreatorLink");
    downloadCreatorLink.href = URL.createObjectURL(file);
    downloadCreatorSection.classList.remove("hidden");
  }, 2000);
}
