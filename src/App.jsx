import styled from "styled-components";
import "./styles/color.css";
import "./styles/font.css";
import { RouterProvider, useLocation } from "react-router-dom";
import { useEffect } from "react";
import router from "./Router";
import { GlobalStyles } from "./styles/GlobalStyles";

// This component will make sure the page scrolls to the top on route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <RouterProvider router={router}>
        <ScrollToTop />
      </RouterProvider>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background-color: var(--background-primary);
  min-height: 100vh;
  max-height: 956px;
  display: flex;
  flex-direction: column;
`;
