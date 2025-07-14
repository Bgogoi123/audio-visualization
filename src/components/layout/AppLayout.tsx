import type { ReactNode } from "react";
import Header, { type IHeaderProps } from "../header/Header";
import Footer, { type IFooterProps } from "../footer/Footer";

interface IAppLayoutProps {
  children: ReactNode;
  headerProps: IHeaderProps;
  footerProps?: IFooterProps;
}

const AppLayout = ({ children, headerProps, footerProps }: IAppLayoutProps) => {
  return (
    <div className="h-[100vh] flex flex-col gap-0 bg-primary-100" >
      <Header
        title={headerProps.title}
        handleBack={headerProps.handleBack}
        showBackButton={headerProps.showBackButton}
      />
      <main className="flex-1 h-[100vh]">{children}</main>
      <Footer variant={footerProps?.variant} />
    </div>
  );
};

export default AppLayout;
