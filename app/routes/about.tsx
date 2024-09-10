import {Image} from '@shopify/hydrogen-react';

const Video = ({src, muted = true}: {src: string; muted?: boolean}) => (
  <video playsInline autoPlay muted={muted} loop className="h-full">
    <source src={src} type="video/mp4" />
    <Image
      loader={() => '/logo/BARA-logo_alt.png'}
      aspectRatio="314/95"
      width={1000}
    />
  </video>
);

export default function Index() {
  return (
    <div className="flex w-full h-full flex-row gap-5 items-center justify-center overflow-hidden py-2">
      <Video src="https://cdn.shopify.com/videos/c/o/v/1a9edbea6d1f433b8fc467055a91d47c.mov" />
      <Video
        src="https://cdn.shopify.com/videos/c/o/v/3753179bb19b4cb4830cd0de71120df6.mp4"
        muted={undefined}
      />
      <Video src="https://cdn.shopify.com/videos/c/o/v/1a9edbea6d1f433b8fc467055a91d47c.mov" />
    </div>
  );
}
