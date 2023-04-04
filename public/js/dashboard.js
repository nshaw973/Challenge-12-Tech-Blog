const createPost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const post = document.querySelector('#content').value.trim();

    if(title && post) {
        const response = await fetch('/api/blogs', {
        method: 'POST',
        body: JSON.stringify({title, post}),
        headers: { 'Content-Type': 'application/json' },
        });
        
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Unable to redirect')
        };
    };
};

const postButton = document.querySelector('#submit-post');
postButton.addEventListener('click', createPost);