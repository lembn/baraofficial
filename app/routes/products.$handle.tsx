import {useLoaderData} from '@remix-run/react';
import {SeoHandleFunction} from '@shopify/hydrogen';
import {Image, Money} from '@shopify/hydrogen-react';
import {LoaderArgs, json} from '@shopify/remix-oxygen';
import AddToCartButton from '~/components/BuyNowButton';
import ProductImageCarousel from '~/components/ProductImageCarousel';
import ProductOptions from '~/components/ProductOptions';

export async function loader({params, context, request}: LoaderArgs) {
  const {handle} = params; // Destructure the handle from the URL params
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions: {name: string; value: string}[] = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const selectedVariant =
    product.selectedVariant ?? product?.variants?.nodes[0];

  return json({
    shop,
    product,
    selectedVariant,
  });
}

const seo: SeoHandleFunction<typeof loader> = ({data}) => ({
  title: data?.product?.title,
  description: data?.product?.description.substr(0, 154),
});

export const handle = {
  seo,
};

export default function ProductHandle() {
  const {product, selectedVariant} = useLoaderData();

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full px-6 w-full ">
      <div>
        <ProductImageCarousel>
          {product.images.nodes.map((image: any) => (
            <Image key={image.id} className="embla__slide" data={image} />
          ))}
        </ProductImageCarousel>
      </div>

      <div className="md:sticky md:mx-auto max-w-xl md:max-w-[24rem] grid gap-6  p-0 md:p-6 md:px-0 w-full">
        <div>
          <h1 className="text-4xl font-bold leading-10 whitespace-normal">
            {product.title}
          </h1>
          <span className="max-w-prose whitespace-pre-wrap inherit text-copy opacity-50 font-medium">
            {product.vendor}
          </span>
        </div>
        {product.options && (
          <ProductOptions
            options={product.options}
            selectedVariant={selectedVariant}
          />
        )}
        {selectedVariant.availableForSale && (
          <div className="flex flex-col items-center gap-2">
            <Money
              withoutTrailingZeros
              data={selectedVariant.price}
              className="text-xl font-semibold"
            />
            <AddToCartButton
              merchandiseId={selectedVariant?.id}
            ></AddToCartButton>
          </div>
        )}
        <div
          className="pb-7 flex flex-col gap-4 list-disc"
          dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
        />
      </div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    shop {
      primaryDomain {
        url
      }
    }
    product(handle: $handle) {
      id
      title
      handle
      vendor
      description
      descriptionHtml
      images(first: 10) {
        nodes {
          id
          url
          altText
          width
          height
        }
      }
      featuredImage {
        id
        url
        altText
        width
        height
      }
      options {
        name,
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
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
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      variants(first: 1) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;
