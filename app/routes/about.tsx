export default function Index() {
  return (
    <div className="flex w-full h-full flex-row gap-5 items-center justify-center overflow-hidden py-2">
      <video
        playsInline
        autoPlay
        muted
        loop
        className="h-full w-full lg:w-2/3 object-cover"
      >
        <source
          src="https://cdn.shopify.com/videos/c/o/v/0fad25534e2b45938f4516d1f8c6e03e.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}
