const postsList = document.querySelector('.card1');
const addPostForm = document.querySelector('.add-post-form');
const navPostForm = document.querySelector('.navbar');
const titleValue = document.getElementById('title');
const desValue = document.getElementById('description');
const imgValue = document.getElementById('image');
const catValue = document.getElementById('category');


const renderPosts = (posts) => {
    output = '';
    posts.forEach(post => {
        output += `
        <div class="card"  >
        <div class="card-body" data-id=${post._id}>
        <img class="card-img-top" src=${post.imageUrl} alt="Card image">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.description}</p>
            <button type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#add" id="edit-post">
                Edit
            </button>
            <button type="button" class="btn btn-outline-success"  id="delete-post">
                Delete
            </button>
        </div>
    </div>
        `;
    })

    postsList.innerHTML = output;

}

//method-GET,Read the post
const fetchAll = function () {
    fetch('http://localhost:3000/api/getAll')
        .then(res => res.json())
        .then(data => renderPosts(data))
}
fetchAll();

//method-DELETE
postsList.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonPressed = e.target.id == 'delete-post';
    let id = e.target.parentElement.dataset.id;
    if (delButtonPressed) {
        fetch(`${'http://localhost:3000/api/delete'}/${id}`, {
            method: 'DELETE',
        }).then(() => fetchAll())
    }
});



//METHOD-edit
postsList.addEventListener('click', (e) => {
    e.preventDefault();
    let editButtonPressed = e.target.id == 'edit-post';
    let id = e.target.parentElement.dataset.id;
    console.log(id);

    if (editButtonPressed) {
        const parent = e.target.parentElement;
        console.log(parent);
        let imageContent = parent.querySelector('.card-img-top').src;
        console.log(imageContent);
        let titleContent = parent.querySelector('.card-title').textContent;
        let descriptionContent = parent.querySelector('.card-text').textContent;
        titleValue.value = titleContent;
        desValue.value = descriptionContent;
        imgValue.value = imageContent;

    }

    navPostForm.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${'http://localhost:3000/api/update'}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageUrl: imgValue.value,
                title: titleValue.value,
                description: desValue.value,
                category: catValue.value
            })


        }).then(() => fetchAll())


    })
});


//create insert new post
navPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            imageUrl: imgValue.value,
            title: titleValue.value,
            description: desValue.value,
            category: catValue.value

        })
    }).then(() => fetchAll())
    imgValue.value = '';
    titleValue.value = '';
    desValue.value = '';

});























