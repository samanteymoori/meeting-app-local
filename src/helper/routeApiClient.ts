import { cache } from "react";
import utils from "./utils";

class RouteApiClient {
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  baseUrl: string;

  get = cache(
    async <T>(
      url: string,
      params?: Record<string, any>,
      //TODO: we need to remove calls with noCache=true from the whole app they're not optimized
      noCache?: boolean,
      addNoCacheQuery?: boolean
    ): Promise<T> => {
      try {
        if (addNoCacheQuery) {
          if (!params) params = {};
          (params as any)["no-cache"] = new Date().getTime();
        }
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
          ...(noCache ? { cache: "no-store" } : { next: { revalidate: 10 } }),
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
    }
  );
  getWithDefaultCache = cache(
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
          ...{ next: { revalidate: 3600 } },
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
