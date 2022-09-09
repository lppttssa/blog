(function() {

    const getData = async (id) => {
        const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
        const data = await response.json();
        return data.data;
    };

    const getComments = async (id) => {
        const response = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
        const data = await response.json();
        console.log(data.data)
        return data.data;
    };

    const createTitle = (titleText) => {
        const title = document.createElement('h1');
        title.classList.add('text');
        title.classList.add('page-title');
        title.classList.add('article-title');
        title.textContent = titleText;

        return title;
    };

    const createDescription = (text) => {
        const containerText = document.createElement('div');
        containerText.classList.add('container-article-description');

        const description = document.createElement('span');
        description.classList.add('article-description');
        description.classList.add('text');
        description.textContent = text;
        containerText.append(description);

        return containerText;
    };

    const createComment = (name, text, isOdd) => {
        const commentContainer = document.createElement('div');
        commentContainer.classList.add('comment-container')

        const userName = document.createElement('h4');
        userName.classList.add('commentator-name');
        userName.classList.add('text');
        userName.classList.add(isOdd ? 'commentator-name-right' : 'commentator-name-left')
        userName.textContent = name;

        const commentText = document.createElement('span');
        commentText.classList.add('comment-text')
        commentText.classList.add(isOdd ? 'commentator-name-right' : 'commentator-name-left')
        commentText.classList.add('text');
        commentText.textContent = text;

        commentContainer.append(userName);
        commentContainer.append(commentText);
        
        return commentContainer;
    };

    const getIdFromUrl = () => {
        let urlString = window.location.search;
        let searchParams = new URLSearchParams(urlString);
        return searchParams.get('id');
    };

    const createPost = async (container) => {
        const id = getIdFromUrl();
        const data = await getData(id);

        const title = createTitle(data.title);
        container.append(title);
        
        const description = createDescription(data.body);
        container.append(description);

        const commentsData = await getComments(id);

        const commentsContainer = document.createElement('div');
        commentsContainer.classList.add('comments-container')
        for (let i = 0; i < commentsData.length; i++) {
            const comment = createComment(commentsData[i].name, commentsData[i].body, i % 2);
            commentsContainer.append(comment);
        }

        container.append(commentsContainer);
    };

    window.createPost = createPost;
})();