import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import type {Product} from '@shopify/hydrogen-react/storefront-api-types';

export default function ProductCard({product}: {product: Product}) {
  const {price, compareAtPrice, image} = product.variants?.nodes[0] || {};
  const isDiscounted =
    compareAtPrice?.amount && compareAtPrice.amount > price?.amount;

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="grid gap-6">
        {image && (
          <Image
            className="shadow-sm rounded"
            data={image}
            alt={product.title}
          />
        )}
        <div className="grid gap-1">
          <h3 className="max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis ">
            {product.title}
          </h3>
          <div className="flex gap-4">
            <span className="max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4">
              <Money withoutTrailingZeros data={price} />
              {isDiscounted && (
                <Money
                  className="line-through opacity-50"
                  withoutTrailingZeros
                  data={compareAtPrice}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
