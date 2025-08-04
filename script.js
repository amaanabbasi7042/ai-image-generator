function generateImage() {
  const prompt = document.getElementById('prompt').value;
  const resultContainer = document.getElementById('result-container');
  if (!prompt.trim()) {
    alert('Please enter a prompt');
    return;
  }
  resultContainer.innerHTML = '<p>Generating image for: ' + prompt + '</p>' +
                              '<img src="https://via.placeholder.com/400?text=Generated+Image" alt="Generated Image">';
}
