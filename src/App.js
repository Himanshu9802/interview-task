import "./App.css";
import Layout from "./Components/Molecules/Layout/Layout";
import WebRoutes from "./navigation/WebRoutes";
import { ToastContainer } from "react-toastify";

import { Provider as StoreProvider } from "react-redux";
import { store } from "./redux/store";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
// toasts
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <StoreProvider store={store}>
      <Layout>
        <ToastContainer />
        <WebRoutes />
      </Layout>
    </StoreProvider>
  );
}

export default App;
