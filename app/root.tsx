import {defer, LoaderArgs, type LinksFunction} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  ScrollRestoration,
  type ShouldRevalidateFunction,
  useLoaderData,
} from '@remix-run/react';
import appStyles from './styles/app.css';
import {Seo, useNonce} from '@shopify/hydrogen';
import {Layout} from './components/Layout';
import {ShopifyProvider, CartProvider} from '@shopify/hydrogen-react';

// This is important to avoid re-fetching root queries on sub-navigations
export const shouldRevalidate: ShouldRevalidateFunction = ({
  formMethod,
  currentUrl,
  nextUrl,
}) => {
  // revalidate when a mutation is performed e.g add to cart, login...
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  // revalidate when manually revalidating via useRevalidator
  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  return false;
};

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: appStyles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/png', href: '/favicon.png'},
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com/css2?family=Manrope&display=swap',
    },
  ];
};

export async function loader({context}: LoaderArgs) {
  const {cart} = context;
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY);

  return defer({
    cart: cart.get(),
    collections,
  });
}

export default function App() {
  const nonce = useNonce();
  const {collections} = useLoaderData();

  return (
    <ShopifyProvider
      storeDomain="a525e1-80.myshopify.com"
      storefrontToken="da03d3b983b6b58b58cda6fdd13d2cc7"
      storefrontApiVersion="2023-07"
      countryIsoCode="GB"
      languageIsoCode="EN"
    >
      <CartProvider>
        <html lang="en">
          <head>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1"
            />
            <Seo />
            <Meta />
            <Links />
          </head>
          <body className="font-manrope bg-black text-white">
            <Layout collections={collections.nodes}>
              <Outlet />
            </Layout>

            <ScrollRestoration nonce={nonce} />
            <Scripts nonce={nonce} />
            <LiveReload nonce={nonce} />
          </body>
        </html>
      </CartProvider>
    </ShopifyProvider>
  );
}

const COLLECTIONS_QUERY = `#graphql
  {
    collections(first: 10) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;
