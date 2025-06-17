class VolumeMeterProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputs) {
    const input = inputs[0];
    if (input.length > 0) {
      const samples = input[0];
      let sum = 0;
      for (let i = 0; i < samples.length; i++) {
        sum += samples[i] * samples[i];
      }
      const rms = Math.sqrt(sum / samples.length);
      this.port.postMessage({ volume: rms });
    }
    return true;
  }
}

registerProcessor('volume-meter', VolumeMeterProcessor);