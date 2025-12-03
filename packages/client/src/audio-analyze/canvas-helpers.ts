export const getBar = ({x, y, width, height, color, index, maxH}) => {
    let maxSound = 0; 

    const update = (micInput, i) => {
    //   const sound = micInput;
      if(micInput > maxSound){
        maxSound = micInput;
      }
      const sound = micInput // maxSound;

    //   height = height * sound;
      if (sound > height) {
        height = sound;
      } else {
        height -= height * 0.03;
      }
    console.log("** ",i, sound, maxSound);

    };
  
    const draw = (context) => {
      context.strokeStyle = color;
      context.lineWidth = 1;
      context.save();
      context.beginPath();
      context.rect(x, y, width, height);
      context.stroke();
      context.restore();
    };
  
    return { update, draw };
  };