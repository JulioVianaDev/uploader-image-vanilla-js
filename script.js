const form = document.getElementById("my-form");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData();

  data.append("post[title]", event.target.title.value);
  data.append("post[image]", event.target.image.files[0]);
  submitToAPI(data);
}

function submitToAPI(data) {
  fetch("http://localhost:3000/posts", {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((data) => {
      const latestPost = document.getElementById("latest-post");
      latestPost.innerHTML = `<img src="${data.image_url}" alt="Última imagem enviada">`;
    })
    .catch((error) => console.error(error));
}