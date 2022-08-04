import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MetricAppBar from "./components/MetricAppBar";
import MenuBar from "./components/MenuBar";
import MetricsPage from "./screens/MetricsPage";
import { useOverview, useTraffic, useSitePerformance } from "./hooks/metrics";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  const overview = useOverview();
  const traffic = useTraffic();
  const sitePerformance = useSitePerformance();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#83c676",
      },
      secondary: {
        main: "#000000",
      },
      button: {
        main: "#4e4d4f",
      },
    },
  });

  const [activeTab, setActiveTab] = useState("Overview");
  const handleTabSelection = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  const renderActiveSelection = () => {
    switch (activeTab) {
      case "Overview":
        return <MetricsPage data={overview.state} />;
      case "Traffic":
        return <MetricsPage data={traffic.state} />;
      case "Site Performance":
        return <MetricsPage data={sitePerformance.state} />;
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <MetricAppBar />
      <MenuBar onClick={handleTabSelection} activeTab={activeTab} />
      {renderActiveSelection()}
    </ThemeProvider>
  );
}

export default function AppWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
}
