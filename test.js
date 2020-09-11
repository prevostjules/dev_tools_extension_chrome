console.log("coucou");

const title = document.querySelector("title").innerHTML;
console.log(title);

const description = document.querySelector('meta[name="description"]').content;
console.log(description);

const url = window.location["href"];

console.log(url);

let createResource = () => {
fetch("http://localhost:3000/api/v1/resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-User_Email": "riri@gmail.com",
      "X-User-Token": "tsEf2aitUyHW2YjT7KqE",
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify( { "resource": { "title": title, "description": description, "url": url } })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });
};

createResource();


