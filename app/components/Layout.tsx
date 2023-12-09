import {Link} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {Image} from '@shopify/hydrogen-react';
import {AnimationSequence, useAnimate} from 'framer-motion';
import Typewriter from 'typewriter-effect';

type CollectionInfo = {handle: string; id: string; title: string};

type Selection = 'collection' | 'socials' | undefined;

const CollectionSelection = ({
  collections,
  onSelection,
}: {
  collections: CollectionInfo[];
  onSelection: (id: string) => void;
}) =>
  collections.map((collection: CollectionInfo) => {
    return (
      <Link
        className="hover:underline"
        to={`/collections/${collection.handle}`}
        key={collection.id}
        onClick={() => onSelection(collection.id)}
      >
        {collection.title}
      </Link>
    );
  });

const SolcialsSelection = () => [
  <a
    key="instagram"
    href="https://www.instagram.com/baraofficial.ig/"
    className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-2 inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  </a>,

  <a
    key="youtube"
    href="https://www.youtube.com/@LondonDisciples/videos"
    className="mb-2 inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
    style={{backgroundColor: '#ff0000'}}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
    </svg>
  </a>,
];

function Footer({collections}: {collections: CollectionInfo[]}) {
  const [selection, _setSelection] = useState<Selection>(undefined);
  const [selectionContent, setSelectionContent] = useState(<></>);

  const setSelection = (s: Selection) =>
    _setSelection(selection ? undefined : s);

  useEffect(() => {
    switch (selection) {
      case 'collection':
        setSelectionContent(
          <CollectionSelection
            collections={collections}
            onSelection={() => _setSelection(undefined)}
          />,
        );
        break;
      case 'socials':
        setSelectionContent(<SolcialsSelection />);
        break;
      default:
        setSelectionContent(<></>);
        break;
    }
  }, [selection, collections]);

  return (
    <div className="flex flex-col space-y-3">
      <ul className="flex space-x-5 justify-center">{selectionContent}</ul>

      <div className="flex justify-center gap-5">
        <button
          className="hover:underline"
          onClick={() => setSelection('collection')}
        >
          COLLECTIONS
        </button>
        <a className="hover:underline" href="/about">
          ABOUT US
        </a>
        <button
          className="hover:underline"
          onClick={() => setSelection('socials')}
        >
          SOCIALS
        </button>
      </div>
    </div>
  );
}

export function Layout({
  collections,
  children,
}: {
  collections: CollectionInfo[];
  children: React.ReactNode;
}) {
  const [animationRef, animate] = useAnimate();

  useEffect(() => {
    const animations: AnimationSequence = [
      ['#center-logo', {opacity: [0, 1]}, {duration: 0.4, ease: 'easeInOut'}],
      [
        '#center-logo',
        {opacity: [1, 0]},
        {delay: 0.6, duration: 1, ease: 'easeInOut'},
      ],
      ['#layout-header', {opacity: [0, 1]}, {duration: 0.4, ease: 'easeInOut'}],
      [
        '#layout-body',
        {opacity: [0, 1]},
        {delay: 0.2, duration: 0.4, ease: 'easeInOut'},
      ],
      ['#layout-footer', {opacity: [0, 1]}, {duration: 0.4, ease: 'easeInOut'}],
    ];
    animate(animations);
  });

  return (
    <div className="flex h-screen w-full py-5 space-x-3">
      <div ref={animationRef} className="flex flex-col w-full">
        {/* <div
          id="center-logo"
          className="w-full h-screen absolute flex flex-col justify-center items-center"
        >
          <Image
            loader={() => '/logo/BARA-logo_alt.png'}
            aspectRatio="314/95"
            width={300}
          />
          <Typewriter
            options={{
              strings: ['Create Your Beginning.'],
              autoStart: true,
              delay: 30,
            }}
          />
        </div> */}

        <a
          id="layout-header"
          className="flex items-center h-fit cursor-pointer opacity-0"
          href="/"
        >
          <Image
            loader={() => '/logo/BARA-logo_alt.png'}
            aspectRatio="314/95"
            width={200}
          />
        </a>

        <div
          id="layout-body"
          className="flex overflow-y-auto w-full mt-5 mb-3 px-5 opacity-0"
        >
          {children}
        </div>

        <div id="layout-footer">
          <Footer collections={collections} />
        </div>
      </div>
    </div>
  );
}
