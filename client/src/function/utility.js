export default function FetchRequest(request) {
  try {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_API_URL}/${request.url}`, {
        method: request.method,
        body: request.method === "GET" ? null : request.body,
        headers: {
          "Content-Type": request.ContentType,
        },
      }).then((response) => {
        if (response.status !== 200) {
          response.json().then((errorData) => {
            reject(errorData);
          });
        } else {
          response
            .json()
            .then((responseData) => {
              resolve(responseData);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
}
