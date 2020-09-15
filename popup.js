function checkApiKey() {

  chrome.storage.local.get(['apiKey'], function(result) {
      if (result.apiKey != null) {
        let apiKey = result.apiKey;
        chrome.storage.local.get(['email'], function(result) {
          if (result.email != null) {
            const getApiKey = document.getElementById("get-api-key");
            getApiKey.style.display = "none";
            const credentials = { apiKey: apiKey, email: result.email }
            callApi(credentials);
          } else {
            const btnApiKey = document.getElementById("call_api");
            btnApiKey.style.display = "none";
            saveApiKey();
          }
        });

      } else {
        const btnApiKey = document.getElementById("call_api");
        btnApiKey.style.display = "none";
        saveApiKey();
      }

  });
}

checkApiKey();

const saveApiKey = () => {
  const submitApiKey = document.getElementById("submit_api_key");
  submitApiKey.addEventListener("click", (e) => {
    let apiKey = document.getElementById("api-key").value;
    let email = document.getElementById("email").value;
    let credentials = { apiKey: apiKey, email: email };
    chrome.storage.local.set(credentials, function() {
    });
    callApi(credentials);
  })

}

const callApi = (credentials) => {
  const btnApiKey = document.getElementById("call_api");
  btnApiKey.addEventListener("click", (e) => {
    chrome.tabs.executeScript(
     { code: "var apiKey = " + JSON.stringify(credentials) },
     function() {
      chrome.tabs.executeScript({ file: "call_api.js" })
     })
    btnApiKey.style.display = "none";
    const success = document.getElementById("success");
    success.insertAdjacentHTML("beforeend", `<p>Hurra ! You can now find the website on Dev Tools</p><p>It didn't work ? Try to <a id="change-api-key" href="#">change your API Key</a>`)
    const changeApiKey = document.getElementById("change-api-key");
    changeApiKey.addEventListener("click", (e) => {
      success.style.display = "none";
      const getApiKey = document.getElementById("get-api-key");
      getApiKey.style.display = "block";
    })
 })

}







