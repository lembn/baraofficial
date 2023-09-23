export function meta() {
  return [
    {title: 'BARA'},
    {
      property: 'og:title',
      content: 'BARA',
    },
    {
      name: 'description',
      content: 'Create your beginning...',
    },
  ];
}

export default function Index() {
  return (
    <div>
      <h3>Hello from the home page! </h3>
    </div>
  );
}
