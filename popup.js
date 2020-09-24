document.addEventListener("DOMContentLoaded", () => {

  const getApiKey = document.getElementById("get-api-key");
  const submitInfosBtn = document.getElementById("submit-infos");
  const submitApiKeyBtn = document.getElementById("submit_api_key");
  const getInfosBtn = document.getElementById("get-infos");
  const validInfos = document.getElementById("valid-infos");
  const success = document.getElementById("success");
  let credentials = { apiKey: "", email: ""};




  const getInfos = (credentials) => {
    getInfosBtn.style.display = "initial";
    getInfosBtn.addEventListener("click", (e) => {
      chrome.tabs.executeScript(
        { code: "var options = " + JSON.stringify("gg") },
        function() {
          chrome.tabs.executeScript({ file: "get_infos.js" })
        }
      )
    })
  }

  const saveApiKey = () => {
    getApiKey.style.display = "block";
    submitApiKeyBtn.addEventListener("click", (e) => {
      let apiKey = document.getElementById("api-key").value;
      let email = document.getElementById("email").value;
      
      credentials = { apiKey: apiKey, email: email }
      chrome.storage.local.set(credentials, function() {
      });
      getInfos(credentials);
    })
  }


  const checkApiKey = () => {
    chrome.storage.local.get(['apiKey'], function(result) {
      if (result.apiKey == undefined) {
        saveApiKey();
      } else {
        let apiKey = result.apiKey;
        chrome.storage.local.get(['email'], function(result) {
          credentials = { email: result.email, apiKey: apiKey };
          getInfos(credentials);
        })
      }

    })
}

  checkApiKey();

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'website_infos') {
      let allWebsiteInfos = message.message;
      checkWebsiteInfos(allWebsiteInfos);
    } else if ("error" in message.message && message.type === 'from_call_api') {
    console.log("error" + message.message);
    submitInfosBtn.style.display = "none";
    getApiKey.style.display = "block";
    const fail = document.getElementById("fail");
    fail.innerHTML = "";
    fail.insertAdjacentHTML("beforeend", `<p>Invalid email or API Key, please try again.</p>`)
    getInfosBtn.style.display = "none";
    saveApiKey();
    } else if ("id" in message.message && message.type === 'from_call_api') {
      console.log(message.message.id);
      success.style.display = "block";
      getApiKey.style.display = "none";
      getInfosBtn.style.display = "none";
      submitInfosBtn.style.display = "none";
      success.insertAdjacentHTML("beforeend", `<p>Hurra ! You can now find "${message.message.title}" on <a href="https://my-dev-tools-links.herokuapp.com/resources" target="_blank">Dev Tools</a> and modify it by clicking <a href="https://my-dev-tools-links.herokuapp.com/resources/${message.message.id}/edit" target="_blank">here</a>.</p>`);
    } else if ("errors" in message.message && message.type === 'from_call_api') {
      console.log("errors" + message.message.errors);
      const errors = message.message.errors
      submitInfosBtn.style.display = "none";
      const fail = document.getElementById("fail");
      fail.innerHTML = "";
      fail.insertAdjacentHTML("beforeend", `Errors :`)
      errors.forEach((error) => {
        fail.insertAdjacentHTML("beforeend", `<p>- ${error}</p>`);
      });
      checkWebsiteInfos();
    }
  })

  const checkWebsiteInfos = (websiteInfos) => {
    getApiKey.style.display = "none";
    getInfosBtn.style.display = "none";
    validInfos.style.display = "block";
    document.getElementById("title").value = websiteInfos.title;
    document.getElementById("description").value = websiteInfos.description;
    document.getElementById("url").value = websiteInfos.url;
    document.getElementById("img-url").value = websiteInfos.imgUrl;
    submitInfosBtn.addEventListener("click", (e) => {
      let title = document.getElementById("title").value;
      let description = document.getElementById("description").value;
      let url = document.getElementById("url").value;
      let imgUrl = document.getElementById("img-url").value;
      let resourceInfos = { credentials: credentials, title: title, description: description, url: url, imgUrl: imgUrl }
        chrome.tabs.executeScript(
         { code: "let resourceInfos = " + JSON.stringify(resourceInfos) },
         function() {
          chrome.tabs.executeScript({ file: "call_api.js" })
         })
    })
  }


})


