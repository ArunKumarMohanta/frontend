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
  // Convert file to Base64 (without the data URL prefix)
  const base64Image = await convertToBase64(file);

  verStatus.textContent = "🔄 Extracting pointer...";

  // Simulate pointer extraction
  setTimeout(async () => {
    const simulatedPointer = "LqXhXso";
    verStatus.textContent = `✅ Tracker ID extracted: ${simulatedPointer}`;

    aiAnalysis.textContent = "🔍 Analyzing image with AI...";
    try {
      // Send the Base64-encoded image as "imageBase64"
      const response = await fetch('https://server-eocz.onrender.com/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64 })
      });
      const data = await response.json();
      if (data.success) {
        aiAnalysis.innerHTML = `<strong>AI Analysis:</strong><br>${data.analysis.replace(/\n/g, '<br>')}`;
        creatorDetails.classList.remove("hidden");
      } else {
        aiAnalysis.textContent = `❌ Analysis failed: ${data.error}`;
      }
    } catch (error) {
      aiAnalysis.textContent = "❌ Failed to get AI analysis.";
      console.error("AI Analysis Error:", error);
    }
  }, 2000);
}

// Convert uploaded file to Base64 string (stripping the prefix)
function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove "data:image/jpeg;base64," (or similar) prefix
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
