import {Link, useLocation} from '@remix-run/react';
import {useEffect, useState} from 'react';
import {Image} from '@shopify/hydrogen-react';
import {
  AnimatePresence,
  AnimationSequence,
  motion,
  useAnimate,
} from 'framer-motion';
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
        '{collection.title}'
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

export function Layout({
  collections,
  children,
}: {
  collections: CollectionInfo[];
  children: React.ReactNode;
}) {
  const [animationRef, animate] = useAnimate();
  const {pathname} = useLocation();
  const [isLandingPage, setIsLandingPage] = useState(false);

  useEffect(() => setIsLandingPage(pathname == '/'), [pathname]);
  useEffect(() => {
    if (isLandingPage) animate(animations);
  }, [animate, isLandingPage]);

  return (
    <div className="flex h-screen w-full py-5 space-x-3">
      <div ref={animationRef} className="flex flex-col w-full">
        {isLandingPage && (
          <div
            id="center-logo"
            className="absolute w-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col justify-center items-center"
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
          </div>
        )}

        <AnimatePresence>
          {!isLandingPage && (
            <motion.a
              id="layout-header"
              className="flex items-center justify-center h-fit cursor-pointer"
              href="/"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            >
              <Image
                loader={() => '/logo/BARA-logo_alt.png'}
                aspectRatio="314/95"
                width={200}
              />
            </motion.a>
          )}
        </AnimatePresence>

        <div
          id="layout-body"
          className={`flex flex-col overflow-y-auto w-full h-full mt-5 mb-3 px-5 ${
            isLandingPage ? 'opacity-0' : ''
          }`}
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
