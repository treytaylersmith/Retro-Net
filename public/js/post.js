const makePost = async (event) => {
  event.preventDefault();
  console.log("foo")

  const title = document.querySelector("#title").value.trim();
  const text = document.querySelector("#content").value.trim();
  
  if (title && text) {
    console.log(JSON.stringify({ title, text }));
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ title, text }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    // console.log(data);

    if (response.ok) {
     document.location.replace(`/post/${data.id}`);
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