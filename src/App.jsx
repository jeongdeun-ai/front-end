import styled from "styled-components";
import "./styles/color.css";
import "./styles/font.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <AppContainer>
      <GlobalStyles />
      <RouterProvider router={router} />
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
  display: flex;
  flex-direction: column;
`;
