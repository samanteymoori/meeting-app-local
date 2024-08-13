import { cache } from "react";
import utils from "./utils";

class RouteApiClient {
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  baseUrl: string;

  get = cache(
    async <T>(url: string, params?: Record<string, any>): Promise<T> => {
      try {
        const u = `${url}${utils.convertToQueryParams(
          (params as object) || {}
        )}`;
        const requestUrl = new URL(u, this.baseUrl).toString();
        const response = await fetch(requestUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          referrerPolicy: "no-referrer",
        });

        if (response.status !== 200) {
          const responseMessage = (await response.json()) as T;
          throw new Error("Unknown Error");
        }
        const responseBody = (await response.json()) as T;
        return responseBody;
      } catch (e) {
        throw new Error("Unknown Error");
      }
    }
  );

  post = async <T>(url: string, body?: Record<string, any>): Promise<T> => {
    try {
      const requestUrl = new URL(url, this.baseUrl).toString();
      const response = await fetch(requestUrl, {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body || {}),
        referrerPolicy: "no-referrer",
      });

      if (response.status !== 200) {
        const responseMessage = (await response.json()) as T;
        return {
          statusCode: response.status,
          error: new Error(responseMessage.message),
        };
      }
      const responseBody = (await response.json()) as T;
      return { response: responseBody, statusCode: response.status };
    } catch (e) {
      return { error: e as Error };
    }
  };

  put = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    try {
      const requestUrl = new URL(url, this.baseUrl).toString();
      const response = await fetch(requestUrl, {
        method: "PUT",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params || {}),
        referrerPolicy: "no-referrer",
      });

      if (response.status !== 200) {
        const responseMessage = (await response.json()) as T;
        return {
          statusCode: response.status,
          error: new Error(responseMessage.message),
        };
      }
      const responseBody = (await response.json()) as T;
      return { response: responseBody, statusCode: response.status };
    } catch (e) {
      return { error: e as Error };
    }
  };

  patch = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    try {
      const requestUrl = new URL(url, this.baseUrl).toString();
      const response = await fetch(requestUrl, {
        method: "PATCH",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params || {}),
        referrerPolicy: "no-referrer",
      });

      if (response.status !== 200) {
        const responseMessage = (await response.json()) as T;
        return {
          statusCode: response.status,
          error: new Error(responseMessage.message),
        };
      }
      const responseBody = (await response.json()) as T;
      return { response: responseBody, statusCode: response.status };
    } catch (e) {
      return { error: e as Error };
    }
  };

  delete = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
    try {
      const u = `${url}${utils.convertToQueryParams((params as object) || {})}`;
      const requestUrl = new URL(u, this.baseUrl).toString();
      const response = await fetch(requestUrl, {
        method: "DELETE",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
        referrerPolicy: "no-referrer",
      });

      if (response.status !== 200) {
        const responseMessage = (await response.json()) as T;
        return {
          statusCode: response.status,
          error: new Error(responseMessage.message),
        };
      }
      const responseBody = (await response.json()) as T;
      return { response: responseBody, statusCode: response.status };
    } catch (e) {
      return { error: e as Error };
    }
  };
}

export default RouteApiClient;
