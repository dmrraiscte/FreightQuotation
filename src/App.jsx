import { MsalProvider } from "@azure/msal-react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { PageLayout } from "./components/PageLayout";
import { MainContent } from "./components/MainContent";

import "./styles/App.css";

const App = ({ instance }) => {
  return (
    <Router>
      <MsalProvider instance={instance}>
        <AuthProvider>
          <PageLayout>
            <MainContent />
          </PageLayout>
        </AuthProvider>
      </MsalProvider>
    </Router>
  );
};

export default App;
