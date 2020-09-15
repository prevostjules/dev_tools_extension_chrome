// let title = document.querySelector("title").innerHTML;
// console.log(title);

// let url = window.location["href"];

// console.log(url);

// let description = "";
// if (document.querySelector('meta[name="description"]') == null) {
//   description = "This website has no description yet."
// } else {
//   description = document.querySelector('meta[name="description"]').content;
// }

// console.log(description);

// websiteInfos = {title: title, url: url, description: description};
// chrome.runtime.sendMessage({message: websiteInfos, type: 'website_infos'})


const createResource = () => {
  fetch("https://my-dev-tools-links.herokuapp.com/api/v1/resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User_Email": resourceInfos.credentials.email,
      "X-User-Token": resourceInfos.credentials.apiKey,
    },
    body: JSON.stringify({ resource:{ title: resourceInfos.title, description: resourceInfos.description, url: resourceInfos.url } })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      chrome.runtime.sendMessage({message: data, type: 'from_call_api'})
    });
};


createResource();





