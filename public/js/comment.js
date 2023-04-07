// Creates the comment
const createComment = async (event) => {
    event.preventDefault();
    // Selecting the comment form, and the main posts Id # to connect the comment to the Original Post
    const comment = document.querySelector('#comment').value.trim();
    const blog_id = document.querySelector('.card').getAttribute('postId')

    if (comment) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment, blog_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload()
        } else {
            alert('Unable add comment')
        };
    };
};

const postButton = document.querySelector('#submit-comment');
postButton.addEventListener('click', createComment);