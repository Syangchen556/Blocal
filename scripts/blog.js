document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("communityBlogForm");
  const blogPosts = document.getElementById("communityPosts");
  const addPostBtn = document.getElementById("addPostBtn");
  const blogFormSection = document.getElementById("blogFormSection");

  // Show the form when the "+" button is clicked
  addPostBtn.addEventListener("click", () => {
    console.log("Add Post Button clicked");
    blogFormSection.style.display = "block";
    setTimeout(() => blogFormSection.classList.add("show"), 10);
    addPostBtn.style.display = "none";
  });

  // Handle blog submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = document.getElementById("blogTitle").value.trim();
    const author = document.getElementById("blogAuthor").value.trim() || "Anonymous";
    const content = document.getElementById("blogContent").value.trim();
    const file = document.getElementById("blogFile").files[0];

    // Basic validations
    if (!title || !content) {
      alert("Title and content are required!");
      return;
    }

    if (file && !file.type.startsWith("image") && !file.type.startsWith("video")) {
      alert("Only images and videos are allowed.");
      return;
    }

    if (file && file.size > 10 * 1024 * 1024) {
      alert("File size should be less than 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const media = file
        ? `<${file.type.startsWith("image") ? "img" : "video controls"} src="${e.target.result}" alt="uploaded" class="post-media"/>`
        : "";

      const post = document.createElement("div");
      post.classList.add("post");
      post.innerHTML = `
        <h3>${title}</h3>
        <p class="author">by ${author}</p>
        <p>${content}</p>
        ${media}
        <div class="post-actions">
          <button class="heart-btn"><i class="fa-regular fa-heart"></i> <span>0</span></button>
          <button class="comment-btn"><i class="fa-regular fa-comment"></i> <span>0</span></button>
          <button class="share-btn"><i class="fa-solid fa-share"></i></button>
        </div>
        <div class="comments-section" style="display:none;">
          <input class="comment-input" placeholder="Add a comment..."/>
          <div class="comments-list"></div>
        </div>
      `;

      blogPosts.prepend(post);
      setupPostEvents(post);

      form.reset();

      blogFormSection.classList.remove("show");
      setTimeout(() => {
        blogFormSection.style.display = "none";
        addPostBtn.style.display = "block";
      }, 300);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      reader.onload({ target: { result: "" } });
    }
  });

  function setupPostEvents(post) {
    const heartBtn = post.querySelector(".heart-btn");
    const commentBtn = post.querySelector(".comment-btn");
    const shareBtn = post.querySelector(".share-btn");
    const commentsSection = post.querySelector(".comments-section");
    const commentInput = post.querySelector(".comment-input");
    const commentsList = post.querySelector(".comments-list");
    const heartCountSpan = heartBtn.querySelector("span");
    const commentCountSpan = commentBtn.querySelector("span");

    let liked = false;
    let likeCount = 0;
    let commentCount = 0;

    heartBtn.addEventListener("click", () => {
      liked = !liked;
      likeCount += liked ? 1 : -1;
      heartCountSpan.textContent = likeCount;
      heartBtn.querySelector("i").classList.toggle("fa-regular");
      heartBtn.querySelector("i").classList.toggle("fa-solid");
    });

    commentBtn.addEventListener("click", () => {
      commentsSection.style.display = commentsSection.style.display === "none" ? "block" : "none";
    });

    commentInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && commentInput.value.trim()) {
        const text = commentInput.value.trim();
        const comment = document.createElement("div");
        comment.classList.add("comment-item");
        comment.innerHTML = `

          <span>${text}</span>
          <button class="comment-like"><i class="fa-regular fa-thumbs-up"></i> <span>0</span></button>
        `;
        commentsList.appendChild(comment);
        commentInput.value = "";
        commentCount++;
        commentCountSpan.textContent = commentCount;

        const likeBtn = comment.querySelector(".comment-like");
        const likeSpan = likeBtn.querySelector("span");
        let likedComment = false;

        likeBtn.addEventListener("click", () => {
          likedComment = !likedComment;
          let count = parseInt(likeSpan.textContent);
          likeSpan.textContent = likedComment ? count + 1 : count - 1;
          likeBtn.querySelector("i").classList.toggle("fa-regular");
          likeBtn.querySelector("i").classList.toggle("fa-solid");
        });
      }
    });

    shareBtn.addEventListener("click", () => {
      const dummyLink = window.location.href + "#communityPosts";
      navigator.clipboard.writeText(dummyLink);
      alert("Post link copied to clipboard!");
    });
  }
});
