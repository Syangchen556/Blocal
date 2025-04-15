// Check login status from localStorage
function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";
  }
  
  // Blog post submission with login protection
  document.getElementById("communityBlogForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    if (!isLoggedIn()) {
      alert("Please log in to post.");
      return;
    }
  
    const title = document.getElementById("blogTitle").value.trim();
    const author = document.getElementById("blogAuthor").value.trim() || "Anonymous";
    const content = document.getElementById("blogContent").value.trim();
    const file = document.getElementById("blogFile").files[0];
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const media = file ? `<${file.type.startsWith("image") ? "img" : "video controls"} src="${e.target.result}" alt="uploaded" class="post-media"/>` : "";
  
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
  
      document.getElementById("communityPosts").prepend(post);
      setupPostEvents(post);
      document.getElementById("communityBlogForm").reset();
      blogFormSection.style.display = "none"; // Hide form after posting
    };
  
    if (file) {
      reader.readAsDataURL(file);
    } else {
      reader.onload({ target: { result: "" } });
    }
  });
  
  // Set up like/comment/share actions with login checks
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
      if (!isLoggedIn()) {
        alert("Please log in to like this post.");
        return;
      }
  
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
        if (!isLoggedIn()) {
          alert("Please log in to comment.");
          return;
        }
  
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
          if (!isLoggedIn()) {
            alert("Please log in to like comments.");
            return;
          }
  
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
  
  // Toggle blog form with login check
  const addPostBtn = document.getElementById("addPostBtn");
  const blogFormSection = document.getElementById("blogFormSection");
  
  addPostBtn.addEventListener("click", () => {
    if (!isLoggedIn()) {
      alert("Please log in to create a blog post.");
      return;
    }
    blogFormSection.style.display = blogFormSection.style.display === "none" ? "block" : "none";
  });
  
  // Optional: Disable add post button if not logged in
  if (!isLoggedIn()) {
    addPostBtn.title = "Log in to create a post";
  }
  