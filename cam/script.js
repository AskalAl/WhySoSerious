const player = document.getElementById('player');
const captureButton = document.getElementById('capture-button');
const outputCanvas = document.getElementById('output');
const context = outputCanvas.getContext('2d');

navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => {
    player.srcObject = stream;
  }).catch(error => {
    console.error('Can not get an access to a camera...', error);
  });

captureButton.addEventListener('click', () => {
  // Get the real size of the picture
  const imageWidth = player.offsetWidth;
  const imageHeight = player.offsetHeight;
  
  // Make our hidden canvas the same size
  outputCanvas.width = imageWidth;
  outputCanvas.height = imageHeight;
  
  // Draw captured image to the hidden canvas
  context.drawImage(player, 0, 0, imageWidth, imageHeight);
  
  // A bit of magic to save the image to a file
  const downloadLink = document.createElement('a');
  downloadLink.setAttribute('download', `capture-${new Date().getTime()}.png`);
  outputCanvas.toBlob((blob) => {
    downloadLink.setAttribute('href', URL.createObjectURL(blob));
    downloadLink.click();
  });
});