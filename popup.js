import { createResource } from "./call_api.js";


const getApiKey = document.getElementById("get-api-key");
const callApiBtn = document.getElementById("call_api_btn");
const submitApiKeyBtn = document.getElementById("submit_api_key");
let credentials= {};

const checkApiKey = () => {

  chrome.storage.local.get(['apiKey'], function(result) {

      if (result.apiKey != null) {
        let apiKey = result.apiKey;
        chrome.storage.local.get(['email'], function(result) {
          if (result.email != null) {
            getApiKey.style.display = "none";
            callApiBtn.style.display = "block";
            credentials.apiKey = apiKey
            credentials.email = result.email;
          } else {
            credentials = saveApiKey();
          }
        });
      } else {
        credentials = saveApiKey();
      }

  });
  return credentials;
}

document.addEventListener("DOMContentLoaded", () => {
  const run = () => {
    checkApiKey();
    console.log(credentials);
  }

  run();
});


const saveApiKey = () => {
  getApiKey.style.display = "block";
  submitApiKeyBtn.addEventListener("click", (e) => {
    let apiKey = document.getElementById("api-key").value;
    let email = document.getElementById("email").value;
    const credentials = { apiKey: apiKey, email: email };
    chrome.storage.local.set(credentials, function() {
    });
    return credentials;
  })

}

const callApi = (credentials) => {
  //createResource(credentials);
}


// const callApi = (credentials) => {
//   const btnApiKey = document.getElementById("call_api");
//   btnApiKey.addEventListener("click", (e) => {
//     chrome.tabs.executeScript(
//      { code: "var apiKey = " + JSON.stringify(credentials) },
//      function() {
//       chrome.tabs.executeScript({ file: "get_infos.js" })
//      })

//   })
//   chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//       if (message.type === 'website_infos') {
//         document.getElementById("call_api_div").classList.add("hide");
//         let websiteInfos = { title: message.message.title, description: message.message.description, url: message.message.url, imgUrl: message.message.imgUrl }
//         const validInfos = document.getElementById("valid-infos");
//         validInfos.style.display = "block";
//         const titleInput = document.getElementById("title");
//         titleInput.value = websiteInfos.title;
//         const descriptionInput = document.getElementById("description");
//         descriptionInput.value = websiteInfos.description;
//         const urlInput = document.getElementById("url");
//         urlInput.value = websiteInfos.url;
//         const imgUrlInput = document.getElementById("img-url");
//         imgUrlInput.value = websiteInfos.imgUrl;
//         const submitInfosBtn = document.getElementById("submit-infos");
//         submitInfosBtn.addEventListener("click", (e) => {
//           const titleUser = titleInput.value;
//           const descriptionUser = descriptionInput.value;
//           const urlUser = urlInput.value;
//           const imgUrlUser = imgUrlInput.value;

//           let resourceInfos = { credentials: credentials, title: titleUser, description: descriptionUser, url: urlUser, imgUrl: imgUrlUser }

//           chrome.tabs.executeScript(
//              { code: "var resourceInfos = " + JSON.stringify(resourceInfos) },
//              function() {
//                chrome.tabs.executeScript({ file: "call_api.js" })
//              }
//           )

//         })

//       }
//   });

// }



// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   const submitInfosBtn = document.getElementById("submit-infos");
//   const btnApiKey = document.getElementById("call_api");
//   if (message.type === 'from_call_api' && "errors" in message.message) {
//     console.log(message.message.errors);
//     const errors = message.message.errors
//     submitInfosBtn.style.display = "none";
//     const fail = document.getElementById("fail");
//     fail.innerHTML = "";
//     fail.insertAdjacentHTML("beforeend", `Errors :`)
//     errors.forEach((error) => {
//       fail.insertAdjacentHTML("beforeend", `<p>- ${error}</p>`);
//     });

//   } else if (message.type === 'from_call_api' && "error" in message.message) {
//     submitInfosBtn.style.display = "none";
//     const getApiKey = document.getElementById("get-api-key");
//     getApiKey.style.display = "block";
//     const fail = document.getElementById("fail");
//     fail.innerHTML = "";
//     fail.insertAdjacentHTML("beforeend", `<p>Invalid email or API Key, please try again.</p>`)
//     saveApiKey();
//   } else if (message.type === 'from_call_api' && "id" in message.message) {
//     console.log(message.message);
//     btnApiKey.style.display = "none";
//     submitInfosBtn.style.display = "none";
//     const success = document.getElementById("success");
//     success.style.display = "block";
//     success.insertAdjacentHTML("beforeend", `<p>Hurra ! You can now find "${message.message.title}" on <a href="https://my-dev-tools-links.herokuapp.com/resources" target="_blank">Dev Tools</a> and modify it by clicking <a href="https://my-dev-tools-links.herokuapp.com/resources/${message.message.id}/edit" target="_blank">here</a>.</p>`);
//   } else {
//     checkApiKey();
//   }
// });




