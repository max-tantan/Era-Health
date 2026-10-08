import './HelperInfoBlock.css';

type HelperInfoBlockProps = {
  children: React.ReactNode;
};

export default function HelperInfoBlock({ children }: HelperInfoBlockProps) {
  return <p className="helper-info-block">{children}</p>;
}
