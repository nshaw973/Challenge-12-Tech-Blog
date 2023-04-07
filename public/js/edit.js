const updatePost = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const post = document.querySelector('#content').value.trim();
    const id = document.querySelector('#edit').getAttribute('post-id')

    if (title && post) {
        const response = await fetch(`/api/blogs/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, post }),
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
postButton.addEventListener('click', updatePost);