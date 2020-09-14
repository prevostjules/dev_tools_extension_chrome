const title = document.querySelector("title").innerHTML;
console.log(title);

const url = window.location["href"];

console.log(url);

const description = document.querySelector('meta[name="description"]').content;
console.log(description);


const createResource = () => {
  fetch("http://localhost:3000/api/v1/resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-User_Email": "riri@gmail.com",
      "X-User-Token": "1Ykek55eaUAeqrwX_-HH",
    },
    body: JSON.stringify({ resource:{ title: title, description: description, url: url } })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data); // Look at local_names.default
    });
};

createResource();

