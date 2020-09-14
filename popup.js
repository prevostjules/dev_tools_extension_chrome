function checkApiKey() {

  // Check that there's some code there.
  chrome.storage.local.get(['apiKey'], function(result) {
      if (result.apiKey != null) {
        const getApiKey = document.getElementById("get-api-key");
        getApiKey.style.display = "none";
        callApi(result.apiKey);

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
    const apiKey = document.getElementById("api-key").value;
    chrome.storage.local.set({apiKey: apiKey}, function() {
      callApi(apiKey);
    });
  })

}

const callApi = (apiKey) => {
  const btnApiKey = document.getElementById("call_api");

  btnApiKey.addEventListener("click", (e) => {
    chrome.tabs.executeScript(
     { code: "var apiKey = " + JSON.stringify(apiKey) },
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







