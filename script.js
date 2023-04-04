const form = document.getElementById("my-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData();

  data.append("post[title]", event.target.title.value);
  data.append("post[image]", event.target.image.files[0]);
  submitToAPI(data);
}

async function submitToAPI(data) {
  
  // var response = await fetch("http://localhost:3000/posts", {
  var response = await fetch("http://fetch-images-api.fly.dev/posts", {
    method: "POST",
    body: data,
  })
  var json=  await response.json();
  console.log(json)
    // .then((data) => {
  const latestPost = document.getElementById("latest-post");
  // console.log(data.image_url)
  latestPost.innerHTML = `<img src="${json.image_url}" alt="Última imagem enviada">`;
    // })
    // .catch((error) => console.error(error));
}