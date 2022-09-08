(function() {


    const cutDescription = (description) => {
        const descriptionSplited = description.split(' ').slice(0, 8);
        return `${descriptionSplited.join(' ')}...`;
    };


    const createArticleCard = (title, description) => {
        const card = document.createElement('div');
        card.classList.add('article-card');

        const titleElement = document.createElement('h4');
        titleElement.classList.add('text');
        titleElement.classList.add('card-title');
        titleElement.textContent = title;
        card.append(titleElement);

        const descriptionElement = document.createElement('span');
        descriptionElement.classList.add('text');
        descriptionElement.classList.add('card-description');
        descriptionElement.textContent = cutDescription(description);
        card.append(descriptionElement);

        const btn = document.createElement('btn');
        btn.classList.add('card-btn');
        btn.classList.add('text');
        btn.textContent = 'Читать далее';
        card.append(btn);

        return card;
    };

    async function createBlog(container) {
        const articleContainer = document.createElement('div');
        articleContainer.classList.add('article-container');

        const response = await fetch('https://gorest.co.in/public-api/posts');
        let data = await response.json();
        data = data.data;

        for (let i = 0; i < data.length; i++) {
            const card = createArticleCard(data[i].title, data[i].body);
            articleContainer.append(card);
        }
        container.append(articleContainer)
    }
    window.createBlog = createBlog;
})();