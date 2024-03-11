import { jwtDecode } from "jwt-decode";

export default class Utility {
  static FetchRequest(request) {
    return new Promise((resolve, reject) => {
      try {
        fetch(`${process.env.REACT_APP_API_URL}/${request.url}`, {
          method: request.method,
          body: request.method === "GET" ? null : request.body,
          headers: {
            "Content-Type": request.ContentType,
            ...(request.Authorization && {
              Authorization: request.Authorization,
            }),
          },
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((errorData) => {
                reject(errorData);
              });
            }

            return response.json().then((responseData) => {
              resolve(responseData);
            });
          })
          .catch((err) => {
            if (err.message === "Failed to fetch") {
              alert("Something went wrong.");
            }
            console.log(err.message);
            reject({ error: err });
          });
      } catch (error) {
        alert("Something went wrong.");
        reject(error);
      }
    });
  }

  static UserUnauthorized() {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    alert("Unauthorized");
    window.location.reload();
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
        reject(new Error("Failed to decode access token"));
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
        await this.FetchRequest(request).then((result) => {
          sessionStorage.removeItem("accessToken");
          sessionStorage.setItem("accessToken", result.accessToken);
          resolve(false);
        });
      } catch (error) {
        console.error(error);
        reject(true);
      }
    });
  }
}
