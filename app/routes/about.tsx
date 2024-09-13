import {Image} from '@shopify/hydrogen-react';

export default function Index() {
  return (
    <div className="flex w-full h-full flex-row gap-5 items-center justify-center overflow-hidden py-2">
      <video
        playsInline
        autoPlay
        muted={undefined}
        loop
        className="h-full w-full object-cover"
      >
        <source
          src="https://cdn.shopify.com/videos/c/o/v/3753179bb19b4cb4830cd0de71120df6.mp4"
          type="video/mp4"
        />
        <Image
          loader={() => '/logo/BARA-logo_alt.png'}
          aspectRatio="314/95"
          width={1000}
        />
      </video>
    </div>
  );
}
