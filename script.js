const samplePrompts = [
  "A majestic lion wearing a crown, photorealistic, cinematic lighting",
  "An enchanted forest at twilight with glowing mushrooms and fireflies, digital art",
  "A futuristic cityscape with flying cars and holographic billboards, cyberpunk style",
  "A serene Japanese garden with a koi pond and cherry blossoms, watercolor painting",
  "A robot holding a red skateboard, 3D render"
];

const aspectRatios = ["1:1", "16:9", "9:16", "4:3", "3:4"];
let selectedRatio = "1:1";

const aspectContainer = document.getElementById("aspectButtons");
aspectRatios.forEach(ratio => {
  const btn = document.createElement("button");
  btn.textContent = ratio;
  btn.className = "p-2 rounded-lg border bg-gray-700/50 border-gray-600 text-gray-300 hover:bg-gray-700 transition-all";
  btn.addEventListener("click", () => {
    selectedRatio = ratio;
    document.querySelectorAll("#aspectButtons button").forEach(b => {
      b.classList.remove("aspect-selected");
    });
    btn.classList.add("aspect-selected");
  });
  if(ratio==="1:1") btn.classList.add("aspect-selected");
  aspectContainer.appendChild(btn);
});

document.getElementById("sampleBtn").addEventListener("click", ()=>{
  document.getElementById("prompt").value = samplePrompts[Math.floor(Math.random()*samplePrompts.length)];
});

document.getElementById("generateBtn").addEventListener("click", ()=>{
  const prompt = document.getElementById("prompt").value.trim();
  const output = document.getElementById("outputContainer");
  if(!prompt){
    alert("Please enter a prompt first.");
    return;
  }
  output.innerHTML = '<div class="text-center text-gray-400"><p>Brewing up your masterpiece...</p><p class="text-sm">This can take a moment.</p><div class="animate-spin mt-4 border-4 border-purple-500 border-t-transparent rounded-full w-10 h-10 mx-auto"></div></div>';

  setTimeout(()=>{
    output.innerHTML = `<img src="https://via.placeholder.com/512?text=Generated+Image" alt="${prompt}" class="max-w-full max-h-full object-contain rounded-md shadow-lg">`;
  }, 2000);
});
