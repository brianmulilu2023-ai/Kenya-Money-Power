const API = "http://localhost:5000/api/posts";

async function loadPosts() {
  const res = await fetch(API);
  const posts = await res.json();

  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach(post => {
    container.innerHTML += `
      <div class="post">
        <h3>${post.title}</h3>
        <p>${post.content.substring(0, 100)}...</p>
        <small>${post.category}</small>
      </div>
    `;
  });
}

loadPosts();