import {CartForm} from '@shopify/hydrogen';

export default function AddToCartButton({
  children,
  merchandiseId,
  onClick,
}: {
  merchandiseId: string;
  children?: JSX.Element;
  onClick?: () => void;
}) {
  return (
    <div className="w-full px-10">
      <CartForm
        route="/cart"
        action={CartForm.ACTIONS.LinesAdd}
        inputs={{lines: [{merchandiseId}]}}
      >
        <button
          onClick={onClick}
          className="flex justify-center w-full border border-transparent bg-white px-6 py-3 text-black font-medium shadow-sm hover:bg-black hover:border-2 hover:border-white hover:text-white"
        >
          <p>ADD TO CART</p>
          <p>{children}</p>
        </button>
      </CartForm>
    </div>
  );
}
