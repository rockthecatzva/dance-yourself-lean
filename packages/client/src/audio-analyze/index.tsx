import { useEffect, useState } from "react";

const getBar = (x, y, width, height, color, index) => {
  const update = (micInput) => {
    const sound = micInput * 300;
    if (sound > height) {
      height = sound;
    } else {
      height -= height * 0.03;
    }
  };

  const draw = (context) => {
    context.strokeStyle = color;
    context.lineWidth = width;
    context.save();
    context.beginPath();
    context.rect(x, y, height, width)
    context.stroke();
    context.restore();
  };

  return { update, draw };
};

const getMicrophone = async ({ fftSize, setMicInit }) => {
  //   let initialized = false;
  let analyser;
  let dataArray;

  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      const audioContext = new AudioContext();
      const microphone = audioContext.createMediaStreamSource(stream);
      analyser = audioContext.createAnalyser();
      analyser.fftSize = fftSize;
      const bufferLength = analyser.frequencyBinCount;
      dataArray = new Uint8Array(bufferLength);
      microphone.connect(analyser);
      //   initialized = true;
      setMicInit(true);
      console.log("*** mic is init");
    })
    .catch(function (err) {
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

  return { getSamples, getVolume };
};

let bars: Array<any> = [];
let softVolume = 0;
const width = 500;
const height = 200;

export const AudioAnalyze = () => {
  const [mic, setMic] = useState<null | {
    getSamples: () => number[];
    getVolume: () => number;
  }>(null);
  const [canvas, setCanvas] = useState<null | HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<null | CanvasRenderingContext2D>(null);
  const [micInit, setMicInit] = useState(false);

  useEffect(() => {
    const _canvas = document.getElementById("meter") as HTMLCanvasElement;

    const _ctx = _canvas?.getContext("2d");
    if (_canvas) {
      _canvas.width = width; //window.innerWidth;
      _canvas.height = height; //window.innerHeight;
      setCanvas(_canvas);
      setCtx(_ctx);
    }

    const m = async () => {
      let fftSize = 512;
      const microphone = await getMicrophone({ fftSize, setMicInit });
      setMic(microphone);
      function createBars() {
        for (let i = 1; i < fftSize / 2; i++) {
        //   let color = "hsl(" + i * 2 + ",100%, 50%)";
          bars.push(getBar(0, i * 0.9, 0.5, 0, "red", i));
        }
      }
      createBars();

      console.log("** ", canvas, microphone, bars);
    };

    m();
  }, []);

  useEffect(() => {
    function animate() {
    //   console.log(" *** amimate ", mic);
      if (micInit && mic && ctx) {
        console.log("*** ", canvas!.width)
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        const samples = mic.getSamples();
        const volume = mic.getVolume();
        ctx.save();
        ctx.translate(canvas!.width / 2 - 70, canvas!.height / 2 + 50);
        bars.forEach(function (bar, i) {
            bar.update(samples[i]);
            bar.draw(ctx);
        });
        ctx.restore();

        softVolume = softVolume * 0.9 + volume * 0.1;
        requestAnimationFrame(animate);
      }
    }
    animate();
  }, [micInit]);

  return (
    <div>
      audio
      <canvas id="meter" width="500" height="50"></canvas>
    </div>
  );
};
