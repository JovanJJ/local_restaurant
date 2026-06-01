export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "sr" }, { lang: "en" }];
}

export default function LangLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="font-sans">{children}</div>;
}
