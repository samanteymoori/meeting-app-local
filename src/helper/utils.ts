export enum METHOD {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

const utils = {
  convertFormData<T>(params: FormData): T {
    let obj: any = {};
    params.forEach(function (value, key) {
      obj[key] = value;
    });
    return obj as T;
  },

  convertToQueryParams(
    params: Record<string, any>,
    encodeParams: boolean = true,
    commaSeparatedParams: boolean = true
  ) {
    const parseValue = (value: any) => {
      if (commaSeparatedParams && Array.isArray(value)) {
        const result = value.reduce((p, c, i) => {
          let nextValue = p + `${encodeParams ? encodeURIComponent(c) : c}`;
          if (i !== value.length - 1) {
            nextValue = nextValue + ",";
          }
          return nextValue;
        }, "");
        return result;
      }
      return encodeParams ? encodeURIComponent(value) : value;
    };
    let keys = Object.keys(params);
    keys = keys.filter((k) => params[k] !== undefined && params[k] !== null);
    return keys.length
      ? "?" +
          keys
            .map(
              (key) => encodeURIComponent(key) + "=" + parseValue(params[key])
            )
            .join("&")
      : "";
  },
  checkResponse(serverResponse: Response) {
    if (serverResponse.ok || serverResponse.status === 302) {
      if (serverResponse.status === 204) {
        return Promise.resolve(serverResponse.statusText);
      }
      return serverResponse.text().then((text: string) => {
        const data = text ? JSON.parse(text) : serverResponse;
        return Promise.resolve(data);
      });
    }
    return serverResponse.text().then((text: string) => {
      const data = text ? JSON.parse(text) : serverResponse;
      data.status = data.status || serverResponse.status;
      return Promise.reject(data);
    });
  },
  async processResponseWithStatusCode(serverResponse: Response): Promise<any> {
    if (
      (serverResponse.status >= 200 && serverResponse.status <= 299) ||
      serverResponse.status === 302 ||
      serverResponse.status === 303
    ) {
      const text = await serverResponse.text();
      const data = text ? JSON.parse(text) : serverResponse;
      return {
        response: data,
        statusCode: serverResponse.status,
      };
    }
    const text = await serverResponse.text();
    const data = text ? JSON.parse(text) : serverResponse;
    return {
      error: data,
      statusCode: serverResponse.status,
    };
  },
  createOptions(method: METHOD, body?: any, invalidateCache?: boolean) {
    const options: any = {
      method,
    };
    if (body) {
      options["body"] = JSON.stringify(body);
    }
    if (invalidateCache) {
      options["Cache-Control"] = "max-age=0";
    } else {
      options["Cache-Control"] = "max-age=60";
    }
    return options;
  },
};

export default utils;
