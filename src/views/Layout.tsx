import { Navbar } from "../components/navbar/Navbar";

export function Layout({ children }: any) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
