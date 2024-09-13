import {useLoaderData} from '@remix-run/react';
import {SeoHandleFunction} from '@shopify/hydrogen';
import {LoaderArgs, json} from '@shopify/remix-oxygen';
import ProductGrid from '~/components/ProductGrid';

export async function loader({params, context}: LoaderArgs) {
  const {handle} = params;
  const {collection} = await context.storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
    },
  });

  if (!collection) throw new Response(null, {status: 404});
  return json({
    collection,
  });
}

const seo: SeoHandleFunction<typeof loader> = ({data}) => ({
  title: data?.collection?.title,
  description: data?.collection?.description.substr(0, 154),
});

export const handle = {
  seo,
};

export default function Collection() {
  const {collection} = useLoaderData();
  return (
    <>
      <div className="w-full py-8">
        <h1 className="text-4xl font-bold">{collection.title}</h1>
        <div className="italic flex text-xs md:text-lg items-baseline justify-between w-full text-stone-5 00">
          {collection.description}
        </div>
      </div>

      <ProductGrid collection={collection} />
    </>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      products(first: 4) {
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;
