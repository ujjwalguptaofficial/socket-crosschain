
interface IHttpPostOption {
    header?: { [key: string]: string };
    method: "POST" | "PATCH" | "PUT"
}

export class HttpRequest {
    baseUrl: string;
    shouldStringify = true;
    shouldIncludeHeader = true;

    shouldIncludeCredential = true;
    defaultHeader = {};

    constructor(baseUrl: string, headers = {}) {
        this.baseUrl = baseUrl;
        this.defaultHeader = headers;
    }

    getError(message, type?) {
        return {
            success: false,
            error: {
                message,
                type: type
            }
        }
    }


    async post(url = '', data, header?): Promise<any> {
        return this.postWithOption_(url, data, {
            header: header,
            method: "POST"
        });
    }

    async patch(url = '', data, header?): Promise<any> {
        return this.postWithOption_(url, data, {
            header: header,
            method: "PATCH"
        });
    }

    async put(url = '', data, header?): Promise<any> {
        return this.postWithOption_(url, data, {
            header: header,
            method: "PUT"
        });
    }

    private async postWithOption_(url = '', data, { header, method }: IHttpPostOption): Promise<any> {
        url = this.baseUrl + url;
        const defaultHeader = {
            ...this.defaultHeader,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        };
        if (header != null) {
            for (const key in header) {
                defaultHeader[key] = header[key];
            }
        }
        const response = await fetch(url, {
            body: this.shouldStringify === true ? JSON.stringify(data) : data,
            method: method,
            headers: this.shouldIncludeHeader === true ? defaultHeader : {},
            // credentials: 'include'
        });
        switch (response.status) {
            case 200:
            case 201:
            case 400:
                return response.json();
            case 404:
                throw this.getError('Invalid Url');
            case 401:
                const result = await response.json();
                result.statusCode = response.status;
                throw result;
            default:
                console.error(this.getError(`Cant send http request. Status code - ${response.status}`));
                throw this.getError(`We are sorry for inconvenience, please try later.`);
        }

    }

    async get(url = '', data: object = {}, header = {}): Promise<any> {
        url = this.baseUrl + url;
        var urlParam = Object.keys(data).map(k => k + '=' + data[k]).join('&');
        const defaultHeader = {
            ...this.defaultHeader,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        };

        if (header != null) {
            for (const key in header) {
                defaultHeader[key] = header[key];
            }
        }
        url = urlParam !== "" ? `${url}?${urlParam}` : url;
        const response = await fetch(url, {
            method: "GET",
            headers: defaultHeader,
            // credentials: 'include',
        });
        switch (response.status) {
            case 200:
            case 201:
            case 400:
                return response.json();
            case 404:
                throw this.getError('Invalid Url');
            default:
                console.error(this.getError(`Cant send http request. Status code - ${response.status}`));
                throw this.getError(`We are sorry for inconvenience, please try later.`);
        }
    }
}