interface Props {
  headerTitle: string;
}

export default function TableHeaderComponent({ headerTitle }: Props) {
  return (
    <>
      <h1 className="font-bold text-center text-2xl">{headerTitle}</h1>
    </>
  );
}
