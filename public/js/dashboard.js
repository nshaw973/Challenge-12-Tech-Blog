// Creates a post
const createPost = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value.trim();
  const post = document.querySelector('#content').value.trim();

  if (title && post) {
    const response = await fetch('/api/blogs', {
      method: 'POST',
      body: JSON.stringify({ title, post }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Unable to redirect');
    }
  }
};

const postButton = document.querySelector('#submit-post');
postButton.addEventListener('click', createPost);

//Deletes the post.
const deletePost = async (event) => {
  // How we get each individual buttons id that matches the id in the DB
  if (event.target.hasAttribute('post-id')) {
    // confirm window
    const deleteConfirmed = deleteConfirm();
    if (deleteConfirmed) {
      const id = event.target.getAttribute('post-id');
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        //reloads page to delete the post
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    }
  }
};

//selecting all buttons, then adding an event listener for each button, with each allowing to use the deletePost function
const deleteButtons = document.querySelectorAll('.delete-btn');
deleteButtons.forEach((button) => {
  button.addEventListener('click', deletePost);
});

// Alert window to allow the user to confirm if they want to delete their post
const deleteConfirm = () => {
  const alert = window.confirm('Do you wish to delete?');
  if (alert) {
    return true;
  } else {
    return false;
  }
};
