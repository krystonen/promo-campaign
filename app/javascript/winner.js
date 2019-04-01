
function postData(url = ``, data = {}) {
    return fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        referrer: "no-referrer",
        body: JSON.stringify(data),
    })
    .then(response => response.json());
}

export function check (number){
  return postData("/api/onefit-campaign", { number });
}

