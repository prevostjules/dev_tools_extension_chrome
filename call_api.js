const createResource = () => {
  fetch("https://my-dev-tools-links.herokuapp.com/api/v1/resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User_Email": resourceInfos.credentials.email,
      "X-User-Token": resourceInfos.credentials.apiKey,
    },
    body: JSON.stringify({ resource:{ title: resourceInfos.title, description: resourceInfos.description, url: resourceInfos.url }, photo: { imgUrl: resourceInfos.imgUrl } } )
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      chrome.runtime.sendMessage({message: data, type: 'from_call_api'})
    });
};


createResource();





