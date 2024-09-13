const makePost = async (event)=>{
    event.preventDefault();

    const title = document.querySelector('#').value.trim();
    const content = document.querySelector('#').value.trim();

    if( title && content){
        const response = await fetch('/api/post/', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
          });

        if(response.ok){
            document.location.replace('/forum');
        }
        else{
            alert(response.statusText);
        }
    }
    else{
        window.alert('Please enter both a title and a body');
    }

}