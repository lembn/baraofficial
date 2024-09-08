import ProductCard from './ProductCard';
import type {Collection} from '@shopify/hydrogen-react/storefront-api-types';

export default function ProductGrid({collection}: {collection: Collection}) {
  return (
    <section className="w-full gap-4 md:gap-8 grid">
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {collection.products.nodes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
