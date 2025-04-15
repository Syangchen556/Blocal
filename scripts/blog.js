// Function to check if the user is logged in
function isLoggedIn() {
    return localStorage.getItem("loggedIn") === "true";  // Ensure 'true' is a string
  }
  
  // Post creation
  document.getElementById("communityBlogForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    // Check if user is logged in
    if (!isLoggedIn()) {
      alert("You must log in first to create a post.");
      window.location.href = "profile.html";  // Redirect to login page (profile.html)
      return;  // Stop the function if not logged in
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
      this.reset();  // Reset form after submission
    };
    if (file) {
      reader.readAsDataURL(file);
    } else {
      reader.onload({ target: { result: "" } });
    }
  });
  
  // Event handlers for post actions
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
  
    // Like button functionality
    heartBtn.addEventListener("click", () => {
      if (!isLoggedIn()) {
        alert("You must log in first to like a post.");
        window.location.href = "profile.html";  // Redirect to login page (profile.html)
        return;  // Stop the function if not logged in
      }
  
      liked = !liked;
      likeCount += liked ? 1 : -1;
      heartCountSpan.textContent = likeCount;
      heartBtn.querySelector("i").classList.toggle("fa-regular");
      heartBtn.querySelector("i").classList.toggle("fa-solid");
    });
  
    // Comment button functionality
    commentBtn.addEventListener("click", () => {
      if (!isLoggedIn()) {
        alert("You must log in first to comment on a post.");
        window.location.href = "profile.html";  // Redirect to login page (profile.html)
        return;  // Stop the function if not logged in
      }
  
      commentsSection.style.display = commentsSection.style.display === "none" ? "block" : "none";
    });
  
    // Handle comment input and adding comments
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
  
        // Comment like functionality
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
  
    // Share button functionality
    shareBtn.addEventListener("click", () => {
      const dummyLink = window.location.href + "#communityPosts";
      navigator.clipboard.writeText(dummyLink);
      alert("Post link copied to clipboard!");
    });
  }
  
  // Toggle blog post form visibility
  const addPostBtn = document.getElementById("addPostBtn");
  const blogFormSection = document.getElementById("blogFormSection");
  
  addPostBtn.addEventListener("click", () => {
    blogFormSection.style.display = blogFormSection.style.display === "none" ? "block" : "none";
  });
  