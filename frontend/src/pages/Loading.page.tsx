import { Spinner } from "@/components/ui/spinner";

type LoadingProps = {
  text?: string;
};

const Loading = ({ text }: LoadingProps) => {
  return (
    <div className={"h-screen flex flex-col gap-2 items-center justify-center"}>
      <Spinner className="size-8" />
      {text && <p>{text}</p>}
    </div>
  );
};

export default Loading;
