import {Image} from '@shopify/hydrogen-react';


export default function Index() {
  return (
    <div className="flex justify-center">
      <div className="flex w-3/4 h-full flex-col gap-5">
        <p className="w-full italic font-thin text-lg text-center">
          Create Your Beginning
        </p>

        <video autoPlay muted loop className="h-full w-full object-cover">
        <source src="/landing/bara_showreel.mp4" type="video/mp4" />
        <Image
          loader={() => '/logo/BARA-logo_alt.png'}
          aspectRatio="314/95"
          width={1000}
        />
      </video>
      </div>
    </div>
  );
}
