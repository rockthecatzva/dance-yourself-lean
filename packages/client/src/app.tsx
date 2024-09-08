import React, { useEffect, useRef, useState } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";

const App_ = () => {
  return (
    <div>
      hEllo batman jokeraaa
      <Player />
    </div>
  );
};

// const onPlayerReady: YouTubeProps["onReady"] = (event) => {
//   // access to player in all event handlers via event.target
//   // event.target.pauseVideo();
// };

const opts: YouTubeProps["opts"] = {
  height: "390",
  width: "640",
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const tempKickData = [
  7.356997, 10.019912, 12.670859, 14.795434, 17.449413, 20.106409, 22.230926,
  24.621497, 27.278135,
];

const Player = () => {
  const [timer, setTimer] = useState(0);
  const [kickdata, setKickData] = useState<number[]>([]);
  const videoRef = useRef<undefined | YouTubePlayer>(undefined);
  const currentKick = useRef(0);
  const lastKickTime = useRef(0);

  const kickPlayer = () => {
    console.log("    ----- kick player", currentKick.current)
    if (currentKick.current < tempKickData.length) {
      const t = tempKickData[currentKick.current] * 1000;
      const wait = t - lastKickTime.current;
      lastKickTime.current = t;
      setTimeout(()=>{
        console.log("***** RECORDED KICK", t);
        currentKick.current = currentKick.current + 1;
        kickPlayer();
      }, wait);
    }
  };

  const onPlay: YouTubeProps["onPlay"] = (event) => {
    videoRef.current = event.target;
    kickPlayer()
    setInterval(() => {
      setTimer(videoRef?.current?.playerInfo?.currentTime);
    }, 500);
  };

  const onKick = () => {
    const t = videoRef?.current?.playerInfo?.currentTime;
    console.log("*** kick ", t);
    setKickData([...kickdata, t] as number[]);
  };

  return (
    <div>
      <div>time: {timer}</div>
      <div>kick data: {JSON.stringify(kickdata)}</div>
      <YouTube
        videoId="9ZNkPA_zUd4"
        // onPlayerReady={onPlayerReady}
        opts={opts}
        onPlay={onPlay}
      />
      <button onClick={onKick}>kick</button>
    </div>
  );
};

export const App = App_;
