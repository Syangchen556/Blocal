// blog.js

function createBlogPost(caption, text, mediaURL, mediaType) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("blog-post");
  
    if (mediaURL) {
      if (mediaType.startsWith("image")) {
        const img = document.createElement("img");
        img.src = mediaURL;
        img.alt = caption;
        postContainer.appendChild(img);
      } else if (mediaType.startsWith("video")) {
        const video = document.createElement("video");
        video.src = mediaURL;
        video.controls = true;
        postContainer.appendChild(video);
      }
    }
  
    const captionEl = document.createElement("h3");
    captionEl.textContent = caption;
    postContainer.appendChild(captionEl);
  
    const textEl = document.createElement("p");
    textEl.textContent = text;
    postContainer.appendChild(textEl);
  
    const container = document.getElementById("blogPosts");
    container.insertBefore(postContainer, container.children[1]);
  }
  
  function handleBlogForm(e) {
    e.preventDefault();
  
    const caption = document.getElementById("blogCaption").value;
    const text = document.getElementById("blogText").value;
    const fileInput = document.getElementById("blogMedia");
    const file = fileInput.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        createBlogPost(caption, text, reader.result, file.type);
      };
      reader.readAsDataURL(file);
    } else {
      createBlogPost(caption, text);
    }
  
    e.target.reset();
  }
  
  document.getElementById("blogForm").addEventListener("submit", handleBlogForm);
  window.addEventListener("DOMContentLoaded", updateNavbarRoleLink);