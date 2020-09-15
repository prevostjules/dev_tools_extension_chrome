let title = document.querySelector("title").innerHTML;

let url = window.location["href"];

let imgUrl = "";

if (document.querySelector('meta[property="og:image"]') == null) {
  imgUrl = null;
} else {
  imgUrl = document.querySelector('meta[property="og:image"]').content;
}

let description = "";
if (document.querySelector('meta[name="description"]') == null) {
  description = "This website has no description yet."
} else {
  description = document.querySelector('meta[name="description"]').content;
}

websiteInfos = {title: title, url: url, description: description, imgUrl: imgUrl};
chrome.runtime.sendMessage({message: websiteInfos, type: 'website_infos'})
