document.addEventListener("DOMContentLoaded", () => {
 var button = document.getElementById("call_api")

 button.addEventListener("click", (e) => {
   chrome.tabs.executeScript({ file: "call_api.js" })
 })

})
