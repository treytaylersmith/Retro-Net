const makePost = async (event) => {
  event.preventDefault();
  console.log("foo")

  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/comment");
    } else {
      alert(response.statusText);
    }
  } else {
    window.alert("Please enter both a title and a body");
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
  .querySelector('#postForm')
  .addEventListener('submit', makePost);




// document
//   .querySelector('.')
//   .addEventListener('click', delButtonHandler);