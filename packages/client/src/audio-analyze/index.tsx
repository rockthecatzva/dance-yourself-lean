import { useEffect, useState } from "react";
import { getMicrophone, GetMicrophoneResult } from "./audio-helpers";
import { getBar } from "./canvas-helpers";

let bars: Array<any> = [];
let softVolume = 0;
const width = 500;
const height = 200;
const fftSize = 128;
const barW = width / fftSize;

export const AudioAnalyze = () => {
  const [mic, setMic] = useState<null | GetMicrophoneResult>(null);
  const [canvas, setCanvas] = useState<null | HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<null | CanvasRenderingContext2D>(null);
  const [micInit, setMicInit] = useState(false);
  // const [val, setVal] = useState(0);
  const [err, setError] = useState("ok");

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
      const microphone = await getMicrophone({ fftSize, setMicInit, setError });
      setMic(microphone);
      function createBars() {
        for (let i = 1; i < fftSize; i++) {
          //   let color = "hsl(" + i * 2 + ",100%, 50%)";
          console.log("** b", i * barW);
          bars.push(
            getBar({
              x: i * barW,
              y: 0,
              width: barW,
              color: "red",
              height: height - 20,
              index: i,
              maxH: height-10,
            })
          );
        }
      }
      createBars();

      // console.log("** ", canvas, microphone, bars);
    };

    m();
  }, []);

  useEffect(() => {
    function animate() {
      //   console.log(" *** amimate ", mic);
      if (micInit && mic && ctx) {
        ctx.clearRect(0, 0, canvas!.width, canvas!.height);
        const samples = mic.getSamples();
        // const volume = mic.getVolume();
        const freq = mic.getFrequencies();
        ctx.save();
        // ctx.translate(canvas!.width / 2 - 70, canvas!.height / 2 + 50);
        bars.forEach(function (bar, i) {
          bar.update(freq[i], i);
          bar.draw(ctx);
        });
        ctx.restore();
        // setVal(freq[10]);
        // softVolume = softVolume * 0.9 + volume * 0.1;
        requestAnimationFrame(animate);
      }
    }
    animate();
  }, [micInit]);

  return (
    <div>
      audio
      <canvas
        style={{ border: "solid 1px black" }}
        id="meter"
        width="500"
        height="50"
      ></canvas>
      {/* <div>{val}</div> */}
      <div>{err}</div>
    </div>
  );
};
