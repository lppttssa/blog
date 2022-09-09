(function() {

    const getData = async (id) => {
        const response = await fetch(`https://gorest.co.in/public-api/posts/${id}`);
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
    };

    window.createPost = createPost;
})();