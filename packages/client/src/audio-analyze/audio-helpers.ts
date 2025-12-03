type GetMicrophoneArgs = {
  fftSize: number;
  setMicInit: (b: boolean) => void;
  setError: (e: string) => void;
};
export type GetMicrophoneResult = {
  getSamples;
  getVolume;
  getFrequencies;
};

export const getMicrophone = async ({
  fftSize,
  setMicInit,
  setError,
}: GetMicrophoneArgs): Promise<GetMicrophoneResult> => {
  //   let initialized = false;
  let analyser;
  let dataArray;
  const t = JSON.stringify(
    navigator.mediaDevices.getUserMedia({ audio: true })
  );
  console.log("**** TEST ", t);
  setError(t);
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      setError("then");

      const audioContext = new AudioContext();
      const microphone = audioContext.createMediaStreamSource(stream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = fftSize;
      //   analyser.minDecibels = minDecibels;
      //   analyser.maxDecibels = maxDecibels;
      //   analyser.smoothingTimeConstant = 0.85;
      const distortion = audioContext.createWaveShaper();
      const gainNode = audioContext.createGain();
      const biquadFilter = audioContext.createBiquadFilter();
      const convolver = audioContext.createConvolver();
      microphone.connect(analyser);
      //   const source = audioContext.createMediaStreamSource(stream);
      //   source.connect(analyser),
      analyser.connect(distortion);
      distortion.connect(biquadFilter);
      biquadFilter.connect(convolver);
      convolver.connect(gainNode);
      gainNode.connect(audioContext.destination);
      //   analyser.fftSize = fftSize
      //   initArrays();

      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);

      //   initialized = true;
      setMicInit(true);
      setError("Mic init!");
      console.log("*** mic is init");
    })
    .catch(function (err) {
      setError("TRUE");
      alert(err);
    });

  const getSamples = () => {
    analyser.getByteTimeDomainData(dataArray);
    let normSamples = [...dataArray].map((e) => e / 128 - 1);
    return normSamples;
  };

  const getVolume = () => {
    analyser.getByteTimeDomainData(dataArray);
    let normSamples = [...dataArray].map((e) => e / 128 - 1);
    let sum = 0;

    for (let i = 0; i < normSamples.length; i++) {
      sum += normSamples[i] * normSamples[i];
    }
    let volume = Math.sqrt(sum / normSamples.length);
    return volume;
  };

  const getFrequencies = () => {
    analyser.getByteFrequencyData(dataArray);
    const dbArray = Array.from(dataArray);
    // console.log("**** ", dbArray)
    return dbArray;
  };

  return { getSamples, getVolume, getFrequencies };
};

// findPeaks
