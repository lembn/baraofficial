import {CartForm} from '@shopify/hydrogen';
import {json, redirect, AppLoadContext} from '@shopify/remix-oxygen';

export const loader = async () => redirect('/collections/day-one');

export async function action({
  request,
  context,
}: {
  request: Request;
  context: AppLoadContext;
}) {
  const {cart} = context;
  const formData = await request.formData();
  const {action, inputs} = CartForm.getFormInput(formData);

  let result;
  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      let lines = [];
      const cartContent = await cart.get();
      if (cartContent) {
        const cartLines = cartContent.lines.edges.map(
          (e) => e.node.merchandise.id,
        );

        for (const line of inputs.lines) {
          if (!cartLines.includes(line.merchandiseId)) lines.push(line);
          else console.log('dupe');
        }
      } else {
        lines = inputs.lines;
      }

      result = await cart.addLines(lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    default:
      throw `${action} cart action is not defined`;
  }

  // The Cart ID might change after each mutation, so update it each time.
  const headers = cart.setCartId(result.cart.id);
  return json(result, {
    status: 200,
    headers,
  });
}
