
  const makeComment = async (event) => {
    event.preventDefault();
  
    if (event.target.hasAttribute("data-post-id")) {
      
      const id = event.target.getAttribute("data-post-id");
  
      const content = document.querySelector("#").value.trim();
  
      if (content) {
        const response = await fetch(`api/posts/${id}/comment`, {
          method: "POST",
          body: JSON.stringify({ content }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
          document.location.replace("/post");
        } else {
          alert(response.statusText);
        }
      } 
    }
  };

  
  document
  .querySelector('#comment-form')
  .addEventListener('submit', makeComment);
