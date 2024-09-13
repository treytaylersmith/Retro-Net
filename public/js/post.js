const makePost = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#").value.trim();
  const content = document.querySelector("#").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/forum");
    } else {
      alert(response.statusText);
    }
  } else {
    window.alert("Please enter both a title and a body");
  }
};

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

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-post-id')) {
      const id = event.target.getAttribute('data-post-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/forum');
      } else {
        alert('Failed to delete project');
      }
    }
  };

document
  .querySelector('.')
  .addEventListener('sumbit', makePost);

document
  .querySelector('.')
  .addEventListener('sumbit', makeComment);


document
  .querySelector('.')
  .addEventListener('click', delButtonHandler);