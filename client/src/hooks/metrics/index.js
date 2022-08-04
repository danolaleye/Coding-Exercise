import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useApi } from "../api";

export function useOverview() {
  const api = useApi();
  const { isLoading, data } = useQuery(
    ["overview"],
    async () =>
      await api.getRequest({
        endpoint: "metric/getOverview",
      }),
    { refetchOnWindowFocus: false }
  );
  const [overview, setOverview] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setOverview(data);
      setIsReady(true);
    }
  }, [data, isLoading]);

  return {
    state: overview,
    isLoading: !isReady,
    actions: {},
  };
}

export function useTraffic() {
  const api = useApi();
  const { isLoading, data } = useQuery(
    ["traffic"],
    () =>
      api.getRequest({
        endpoint: "metric/getTraffic",
      }),
    { refetchOnWindowFocus: false }
  );
  const [trafficData, setTrafficData] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setTrafficData(data);
      setIsReady(true);
    }
  }, [data, isLoading]);

  return {
    state: trafficData,
    isLoading: !isReady,
    actions: {},
  };
}

export function useSitePerformance() {
  const api = useApi();
  const { isLoading, data } = useQuery(
    ["sitePerformance"],
    async () =>
      await api.getRequest({
        endpoint: "metric/getSitePerformance",
      }),
    { refetchOnWindowFocus: false }
  );
  const [sitePerformance, setSitePerformance] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setSitePerformance(data);
      setIsReady(true);
    }
  }, [data, isLoading]);

  return {
    state: sitePerformance,
    isLoading: !isReady,
    actions: {},
  };
}
