async function newFormHandler(event) {
    event.preventDefault();

    const post_title = document.querySelector('input[name="post-title"]').value.trim();
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    const response = await fetch('/api/posts', {
        method: 'post',
        body: JSON.stringify({post_title, post_content}),
        headers: {'Content-Type': 'application/json'}
    });

    if (response.ok){
        document.location.replace('/dashboard');
    }
    else{
        alert(response.statusText);
    }
}

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);