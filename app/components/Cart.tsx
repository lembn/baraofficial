import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import {Await, useMatches} from '@remix-run/react';
import {CartForm} from '@shopify/hydrogen';
import {Suspense} from 'react';

export default function Cart({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const [root] = useMatches();

  return open ? (
    <Suspense fallback={'LOADING...'}>
      <Await resolve={root.data?.cart}>
        {(cart) => (
          <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
            />

            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full">
                  <DialogPanel
                    transition
                    className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                  >
                    <div className="flex h-full w-full flex-col overflow-y-scroll bg-black border-white lg:border-l-2">
                      <div className="overflow-y-auto px-4 py-6">
                        <div className="flex justify-between">
                          <DialogTitle className="text-lg font-medium text-white">
                            CART
                          </DialogTitle>

                          <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="relative -m-2 p-2 text-white hover:text-gray-500"
                          >
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                          </button>
                        </div>

                        {cart.lines && (
                          <div className="mt-8">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-white"
                            >
                              {cart.lines.edges
                                .map((e: any) => ({
                                  lineId: e.node.id,
                                  ...e.node.merchandise,
                                }))
                                .map((product: any) => (
                                  <li key={product.id} className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden">
                                      <img
                                        src={product.image.url}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>

                                    <div className="w-full px-4">
                                      <div className="flex justify-between w-full   ">
                                        <p>{product.product.title}</p>
                                        <p>£{product.price.amount}</p>
                                      </div>
                                      {product.selectedOptions.length > 0 && (
                                        <p className="mt-1 text-sm text-gray-500">
                                          {product.selectedOptions
                                            .map((o: any) => o.value)
                                            .join(', ')}
                                        </p>
                                      )}

                                      <CartForm
                                        route="/cart"
                                        action={CartForm.ACTIONS.LinesRemove}
                                        inputs={{lineIds: [product.lineId]}}
                                      >
                                        <button className="mt-2 font-medium text-white hover:text-gray-500">
                                          Remove
                                        </button>
                                      </CartForm>
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {cart.lines && cart.lines.edges.length > 0 ? (
                        <a
                          href={cart.checkoutUrl}
                          className="flex m-6 items-center justify-center border border-transparent bg-white px-6 py-3 text-black font-medium shadow-sm hover:bg-black hover:border-2 hover:border-white hover:text-white"
                        >
                          CHECKOUT
                        </a>
                      ) : (
                        <p className="flex text-5xl w-full justify-center">
                          ...
                        </p>
                      )}
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </div>
          </Dialog>
        )}
      </Await>
    </Suspense>
  ) : (
    'CART'
  );
}
