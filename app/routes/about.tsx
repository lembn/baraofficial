const CoreConviction = ({
  title,
  children,
}: {
  title: string;
  children: string;
}) => (
  <div>
    <h1 className="font-medium text-2xl">{title}</h1>
    <p>{children}</p>
  </div>
);

export default function Index() {
  return (
    <div className="flex justify-center">
      <div className="flex w-3/4 h-full flex-col gap-5">
        <p className="w-full italic font-thin text-lg text-center">
          Create Your Beginning
        </p>

        <p>
          <span className="font-bold">WE ARE BARA: </span>Somethign about
          Genesis 1:1 maybe, talking about creation and stuff like that.
          Micheala can write something nice and inspiring here that will make
          people think about God but also think we are cool.{' '}
          <span className="font-bold">We live by 5 core convictions: </span>
        </p>

        <div className="flex flex-col gap-5 text-center">
          <CoreConviction title="I - Evanglise The Nations In This Generation">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            distinctio fugit delectus veniam dicta doloremque eaque maiores
            sapiente, minus repudiandae ratione nesciunt molestiae eum illo,
            aspernatur voluptas. Expedita, autem praesentium?
          </CoreConviction>

          <CoreConviction title="II - Silent Where The Bible Speaks">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            distinctio fugit delectus veniam dicta doloremque eaque maiores
            sapiente, minus repudiandae ratione nesciunt molestiae eum illo,
            aspernatur voluptas. Expedita, autem praesentium?
          </CoreConviction>

          <CoreConviction title="III - Central Leadership">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            distinctio fugit delectus veniam dicta doloremque eaque maiores
            sapiente, minus repudiandae ratione nesciunt molestiae eum illo,
            aspernatur voluptas. Expedita, autem praesentium?
          </CoreConviction>

          <CoreConviction title="IV - We Are A Bible Church">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            distinctio fugit delectus veniam dicta doloremque eaque maiores
            sapiente, minus repudiandae ratione nesciunt molestiae eum illo,
            aspernatur voluptas. Expedita, autem praesentium?
          </CoreConviction>

          <CoreConviction title="V - Church Made Up Of Sold Out Disciples">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            distinctio fugit delectus veniam dicta doloremque eaque maiores
            sapiente, minus repudiandae ratione nesciunt molestiae eum illo,
            aspernatur voluptas. Expedita, autem praesentium?
          </CoreConviction>
        </div>
      </div>
    </div>
  );
}
