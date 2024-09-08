import {Image} from '@shopify/hydrogen-react';

export default function Index() {
  return (
    <div className="flex w-full h-full flex-row gap-5 items-center justify-center overflow-hidden py-2">
      <video autoPlay muted loop className="h-full">
        <source src="/about/tosin_b-roll.mov" type="video/mp4" />
        <Image
          loader={() => '/logo/BARA-logo_alt.png'}
          aspectRatio="314/95"
          width={1000}
        />
      </video>

      <video autoPlay muted loop className="h-full">
        <source src="/about/tosin_interview.mp4" type="video/mp4" />
        <Image
          loader={() => '/logo/BARA-logo_alt.png'}
          aspectRatio="314/95"
          width={1000}
        />
      </video>

      <video autoPlay muted loop className="h-full">
        <source src="/about/tosin_b-roll.mov" type="video/mp4" />
        <Image
          loader={() => '/logo/BARA-logo_alt.png'}
          aspectRatio="314/95"
          width={1000}
        />
      </video>
    </div>
  );
}
