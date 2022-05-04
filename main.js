var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH=500;
var HEIGHT=50;
var rafID = null;
const buttonEl = document.querySelector('button');

window.onload = function() {

    // grab our canvas
	canvasContext = document.getElementById( "meter" ).getContext("2d");
	
    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
	
    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    try {
        // monkeypatch getUserMedia
        navigator.getUserMedia = 
        	navigator.getUserMedia ||
        	navigator.webkitGetUserMedia ||
        	navigator.mozGetUserMedia;

        // ask for an audio input
        navigator.getUserMedia(
        {
            "audio": {
                "mandatory": {
                    "googEchoCancellation": "false",
                    "googAutoGainControl": "false",
                    "googNoiseSuppression": "false",
                    "googHighpassFilter": "false"
                },
                "optional": []
            },
            video: { width: 1000, height: 500 }
        }, gotStream, didntGetStream);
    } catch (e) {
        alert('getUserMedia threw exception :' + e);
    }

}

// НЕУДАЧА
function didntGetStream() {
    alert('Stream generation failed. Do you have at least one camera connected?');
}

var mediaStreamSource = null;

function gotStream(stream) {
    // Create an AudioNode from the stream.
    var video = document.querySelector('video');
    video.srcObject = stream;
    mediaStreamSource = audioContext.createMediaStreamSource(video.srcObject);
    video.play();
    // Create a new volume meter and connect it.
    meter = createAudioMeter(audioContext);
    mediaStreamSource.connect(meter);

    // kick off the visual updating
    drawLoop();
}

function drawLoop( time ) {
    // clear the background
    canvasContext.clearRect(0,0,WIDTH,HEIGHT);

    // check if we're currently clipping
    if (meter.checkClipping())
        canvasContext.fillStyle = "red";
    else
        canvasContext.fillStyle = "green";

    // draw a bar based on the current volume
    canvasContext.fillRect(0, 5, meter.volume*WIDTH*2.4, HEIGHT);

    // set up the next visual callback
    rafID = window.requestAnimationFrame( drawLoop );
}

buttonEl.addEventListener('click', function() {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    if (audioContext.state === 'running') {
        audioContext.suspend();
    }
})