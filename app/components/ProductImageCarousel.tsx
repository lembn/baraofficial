import {ComponentPropsWithRef, useCallback, useEffect, useState} from 'react';
import {EmblaOptionsType, EmblaCarouselType} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (
  emblaApi: EmblaCarouselType | undefined,
): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

export const DotButton = (props: ComponentPropsWithRef<'button'>) => {
  const {children, ...restProps} = props;

  return (
    <button type="button" {...restProps}>
      {children}
    </button>
  );
};

const ProductImageCarousel = ({
  children,
  options,
}: {
  children: JSX.Element[];
  options?: EmblaOptionsType;
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {selectedIndex, scrollSnaps, onDotButtonClick} = useDotButton(emblaApi);

  return (
    <div className="embla h-full flex flex-col gap-2">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="embla__container">
          {children.map((child) => (
            <div className="embla__slide" key={child.key}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots w-full h-auto flex justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={'embla__dot cursor-pointer '.concat(
              index === selectedIndex ? ' embla__dot--selected' : '',
            )}
          ></DotButton>
        ))}
      </div>
    </div>
  );
};

export default ProductImageCarousel;
