async function initVolumeMeter() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioContext = new AudioContext();

  await audioContext.audioWorklet.addModule('volume-meter-processor.js');

  const source = audioContext.createMediaStreamSource(stream);
  const meterNode = new AudioWorkletNode(audioContext, 'volume-meter');

  meterNode.port.onmessage = (event) => {
    const volume = event.data.volume;
    const bar = document.getElementById('volume-bar');
    bar.style.width = `${Math.min(volume * 300, 300)}px`; // max width = 300px
  };

  source.connect(meterNode).connect(audioContext.destination);
}

initVolumeMeter();