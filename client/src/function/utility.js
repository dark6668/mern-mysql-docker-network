import { jwtDecode } from "jwt-decode";

export default class Utility {

  static FetchRequest(request, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        reject("Failed to fetch");
      }, timeout);

      fetch(`${process.env.REACT_APP_API_URL}/${request.url}`, {
        method: request.method,
        body: request.method === "GET" ? null : request.body,
        headers: {
          "Content-Type": request.ContentType,
          ...(request.Authorization && {
            Authorization: request.Authorization,
          }),
        },
        signal: controller.signal,
      })
        .then(async (response) => {
          clearTimeout(timeoutId);
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
          }
          response.json().then((responseData) => {
            resolve(responseData);
          });
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            reject("Request aborted due to timeout");
          } else if (!window.navigator.onLine) {
            reject("Network Error: Check your internet connection");
          } else if (error.message === "Failed to fetch") {
            reject("Something went wrong: Please try again later");
          } else {
            reject(error.message);
          }
        });
    });
  }

  //   try {
  //     fetch(`${process.env.REACT_APP_API_URL}/${request.url}`, {
  //       method: request.method,
  //       body: request.method === "GET" ? null : request.body,
  //       headers: {
  //         "Content-Type": request.ContentType,
  //         ...(request.Authorization && {
  //           Authorization: request.Authorization,
  //         }),
  //       },
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           return response.json().then((errorData) => {
  //             reject(errorData);
  //           });
  //         }

  //         return response.json().then((responseData) => {
  //           resolve(responseData);
  //         });
  //       })
  //       .catch((err) => {
  //         if (err.message === "Failed to fetch") {
  //           alert("Something went wrong.");
  //         }
  //         console.log(err.message);
  //         reject({ error: err });
  //       });
  //   } catch (error) {
  //     alert("Something went wrong.");
  //     reject(error);
  //   }
  // });

  static UserUnauthorized() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
  }

  static CheckAccessTokenExpiresIn() {
    return new Promise((resolve, reject) => {
      try {
        const decodedToken = jwtDecode(sessionStorage.getItem("accessToken"));
        const expirationTime = decodedToken.exp * 1000;
        if (expirationTime < Date.now())
          return resolve("Access token has expired");
        resolve(decodedToken);
      } catch (error) {
        reject("Failed to decode access token");
      }
    });
  }

  static async getNewAccessToken() {
    return new Promise(async (resolve, reject) => {
      try {
        const request = {
          method: "GET",
          url: "api/auth/getNewaAccessToken",
          ContentType: "application/json; charset=UTF-8",
          Authorization: `Bearer ${sessionStorage.getItem("refreshToken")}`,
        };
        await this.FetchRequest(request)
          .then((result) => {
            sessionStorage.removeItem("accessToken");
            sessionStorage.setItem("accessToken", result.accessToken);
            resolve({ message: "you get new accessToken" });
          })
          .catch((error) => {
            throw new Error(error);
          });
      } catch (error) {
        reject(error.message);
      }
    });
  }

  static validInput(input) {
    const errMessages = [
      {
        name: "Please provide a valid name",
        min: 5,
        required: "Name is required",
      },
      {
        password: "Password is too short",
        min: 5,
        required: "Password is required",
      },
    ];
    return new Promise(async (resolve, reject) => {
      const errors = [];
      for (let key in input) {
        const errMessage = errMessages.find((item) => item[key]);
        let value = input[key];
        if (value.length === 0) {
          errors.push({ [key]: errMessage.required });
        } else if (value.length < errMessage.min) {
          errors.push({ [key]: errMessage[key] });
        }
      }

      if (errors.length === 0) {
        resolve();
      } else {
        reject(errors);
      }
    });
  }
}
