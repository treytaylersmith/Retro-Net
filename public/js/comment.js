const commentForm = document.querySelector('#comment-form');
const id = commentForm.getAttribute("data-postId");
  

const makeComment = async (event) => {
    event.preventDefault();
  
    
      
      
  
      const text = document.querySelector("#text").value.trim();


      console.log(id);
      if (text) {
        const response = await fetch(`/api/posts/${id}/comment`, {
          method: "POST",
          body: JSON.stringify({ text }),
          headers: { "Content-Type": "application/json" },
        });
  
        if (response.ok) {
         document.location.replace(`/post/${id}`);
        } else {
          alert(response.statusText);
        }
      } 
    
  };

  
 commentForm.addEventListener('submit', makeComment);
