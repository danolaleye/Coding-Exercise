const BASEURL = "http://localhost:3001/";

export const useApi = () => {
  async function getRequest({
    method = "GET",
    apiBaseUrl = BASEURL,
    endpoint,
    params,
    responseType = null,
  }) {
    let url = apiBaseUrl + endpoint;

    const options = {
      method,
    };

    if (params)
      if (method === "POST") {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(params);
      } else {
        const queryString = Object.keys(params)
          .map((key) => `${key}=${params[key]}`)
          .join("&");
        url += `?${queryString}`;
      }

    console.log("Making request", {
      url,
      options,
    });
    return fetch(url, options)
      .then(async (res) => ({
        status: res.status,
        data: responseType ? res[responseType]() : await res.json(),
      }))
      .then(({ status, data }) => {
        if (status < 200 || status > 299) {
          const error = new Error(`${data.type}: ${data.message}`);
          error.code = data.code;
          error.status = status;
          throw error;
        }

        return data;
      });
  }

  return {
    getRequest,
  };
};
