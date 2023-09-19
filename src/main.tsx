import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./utils/apollo";
import "./index.css";
import ROUTES from "./routes";
import { NotFound } from "./pages/404/NotFound";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter>
      <Routes>
        {ROUTES.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />    
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ApolloProvider>
);
