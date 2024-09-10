import {Image} from '@shopify/hydrogen-react';

export function meta() {
  return [
    {title: 'BARA'},
    {
      property: 'og:title',
      content: 'BARA',
    },
    {
      name: 'description',
      content: 'Create your beginning...',
    },
  ];
}

export default function Index() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center relative">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
      >
        <source
          src="https://cdn.shopify.com/videos/c/o/v/bfd852eba3f84a2ba6cba6346c8ef945.mp4"
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
