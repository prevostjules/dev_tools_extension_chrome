const title = document.querySelector("title").innerHTML;
console.log(title);

const url = window.location["href"];

console.log(url);

let description = "";
if (document.querySelector('meta[name="description"]') == null) {
  description = "This website has no description yet."
} else {
  description = document.querySelector('meta[name="description"]').content;
}


console.log(description);


const createResource = (apiKey) => {
  fetch("http://localhost:3000/api/v1/resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User_Email": "riri@gmail.com",
      "X-User-Token": apiKey,
    },
    body: JSON.stringify({ resource:{ title: title, description: description, url: url } })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });
};

createResource(apiKey);





