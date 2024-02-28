import TopNav from "../Nav/TopNav";

const Layout = ({ children }) => {
  return (
    <div className="site-body-wrapper sm-site-body ml-0">
      <TopNav />
      <section className="new-page-bpdy-content ml-0">{children}</section>
    </div>
  );
};

export default Layout;
