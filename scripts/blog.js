// Cleaned blog.js

function createBlogPost(caption, text, mediaURL, mediaType) {
    const postContainer = document.createElement("div");
    postContainer.classList.add("blog-post");

    if (mediaURL) {
        let mediaElement;
        if (mediaType.startsWith("image")) {
            mediaElement = document.createElement("img");
            mediaElement.src = mediaURL;
            mediaElement.alt = caption;
        } else if (mediaType.startsWith("video")) {
            mediaElement = document.createElement("video");
            mediaElement.src = mediaURL;
            mediaElement.controls = true;
        }
        postContainer.appendChild(mediaElement);
    }

    const captionEl = document.createElement("h3");
    captionEl.textContent = caption;
    const textEl = document.createElement("p");
    textEl.textContent = text;

    postContainer.appendChild(captionEl);
    postContainer.appendChild(textEl);

    const container = document.getElementById("blogPosts");
    container.insertBefore(postContainer, container.children[1]);
}

function handleBlogForm(e) {
    e.preventDefault();

    const caption = document.getElementById("blogCaption").value;
    const text = document.getElementById("blogText").value;
    const file = document.getElementById("blogMedia").files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = () => createBlogPost(caption, text, reader.result, file.type);
        reader.readAsDataURL(file);
    } else {
        createBlogPost(caption, text);
    }

    e.target.reset();
}

document.getElementById("blogForm").addEventListener("submit", handleBlogForm);

// Only call updateNavbarRoleLink if it's defined
if (typeof updateNavbarRoleLink === 'function') {
    window.addEventListener("DOMContentLoaded", updateNavbarRoleLink);
}