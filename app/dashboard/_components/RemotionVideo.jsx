import React, { useEffect, useMemo } from 'react'
import { AbsoluteFill, Img, Sequence, useVideoConfig,Audio, useCurrentFrame, interpolate } from 'remotion'

function RemotionVideo({
  script,
  imageList,
  audioFileUrl,
  captions,
  setDurationInFrame
}) {
  const { fps } = useVideoConfig();
  const frame=useCurrentFrame();

  // ✅ 1. Calculate total duration safely (pure calculation)
  const totalDuration = useMemo(() => {
    if (!captions?.length) return 0;

    const lastCaption = captions[captions.length - 1];
    return (lastCaption.end / 1000) * fps;
  }, [captions, fps]);

  // ✅ 2. Inform parent AFTER render (side effect)
  useEffect(() => {
if (totalDuration > 0 && setDurationInFrame) {
  setDurationInFrame(totalDuration);
}
  }, [totalDuration, setDurationInFrame]);

  // ✅ 3. Guard condition
  if (!imageList?.length || totalDuration === 0) {
    return null;
  }

  const imageDuration = totalDuration / imageList.length;

  const getCurrentCaptions=()=>{
      const currentTime=(frame/fps)*1000
      const currentCaption=captions.find((word)=>currentTime>=word.start && currentTime<=word.end);
      return currentCaption?currentCaption?.text:' ';
  }

  return script&&(
    <AbsoluteFill className="bg-black">
  {imageList?.map((item, index) =>{ 
    
    const startTime=index*imageDuration;
    const duration=imageDuration;

    const scale=(index)=>interpolate(
      frame,
      [startTime,startTime+duration/2,startTime+duration],
      index%2==0?[1,1.8,1]:[1.8,1,1.8],
      {extrapolateLeft:'clamp',extrapolateRight:'clamp'}
    )

    return(
    <Sequence
      key={index}
      from={startTime}
      durationInFrames={imageDuration}
    >
      {/* 1. Background Image */}
      <Img
        src={item}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform:`scale(${scale(index)})`
        }}
      />

      {/* 2. Captions Layer - Fixed to Bottom */}
      <AbsoluteFill className='flex flex-col justify-end items-center pb-12'>
        <h2 className="text-white text-4xl font-bold text-center drop-shadow-lg px-6 uppercase">
         {getCurrentCaptions()}
        </h2>
      </AbsoluteFill>
      
    </Sequence>
  )})}
  <Audio src={audioFileUrl} />
</AbsoluteFill>
  );
}

export default RemotionVideo;