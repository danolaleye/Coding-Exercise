const { error, getMetricData } = require("_lib/helpers");
const MetricTypes = require("_constants/MetricTypes");

module.exports = async () => {
  const metricData = await getMetricData();

  if (Array.isArray(metricData) && metricData.length < 0)
    error("MetricDataError", "Unable to get metric data");

  sitePerformanceMetricData = metricData.filter((metric) => {
    return MetricTypes.SITE_PERFORMANCE.includes(metric["Metric Name"]);
  });

  return sitePerformanceMetricData || [];
};
