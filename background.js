document.addEventListener("DOMContentLoaded", () => {
 const button = document.getElementById("call_api");

 // button.addEventListener("click", (e) => {
 //   chrome.tabs.executeScript({ file: "call_api.js" })
 // })
  const btnApiKey = document.getElementById("submit_api_key");

  function callApi(apiKey) {
   chrome.tabs.executeScript(
     { code: "var apiKey = " + JSON.stringify(apiKey) },
     function() {
       chrome.tabs.executeScript({ file: "call_api.js" })
     }
   )
  }

  btnApiKey.addEventListener("click", (e) => {
    const apiKey = document.getElementById("api-key").value;
    callApi(apiKey);
  })

  // function callApi(options) {
  //  chrome.tabs.executeScript(
  //    { code: "var options = " + JSON.stringify(options) },
  //    function() {
  //      chrome.tabs.executeScript({ file: "call_api.js" })
  //    }
  //  )
  // }

  // button.addEventListener("click", (e) => {
  //   const test = "ttttt"
  //   callApi(test);
  // })



})
