(function() {

    const TOTAL_PAGINATION_ITEMS = 5;

    const getData = async (page) => {
        const response = await fetch(`https://gorest.co.in/public-api/posts?page=${page}`);
        let data = await response.json();
        const pages = data.meta.pagination;
        data = data.data;
        return {pages, data}
    };

    

    const createPaginationItem = (number, isAcive) => {
        const paginationElement = document.createElement('span');
        paginationElement.classList.add('pagination-element');
        paginationElement.classList.add('text');
        if (isAcive) {
            paginationElement.classList.add('pagination-element-active')
        }
        paginationElement.textContent = number;
        paginationElement.addEventListener('click', () => {
            window.location.search = `?page=${number}`;
        });
        
        return paginationElement;
    };

    const createPaginationDots = () => {
        const dots = document.createElement('span');
        dots.classList.add('pagination-dots');
        dots.textContent = '...';
        
        return dots;
    };

    const createArrow = (arrowText, isAcive) => {
        const arrow = document.createElement('span');
        arrow.textContent = arrowText;
        arrow.classList.add('pagination-arrow');
        if (!isAcive) {
            arrow.classList.add('arrow-disabled')
        }
        return arrow;
    };

    const getFirstShownPage = (currentPage, totalPages) => {
        if (currentPage > 2) {
            if (totalPages > currentPage + 2) {
                return currentPage - 2;
            } else {
                return totalPages - 5;
            }
        }
        return 1;
    };

    const createPagination = (pages, currentPage) => {
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add('pagination-container');
        const dots = createPaginationDots();

        const arrowLeft = createArrow('<', currentPage > 1);
        arrowLeft.addEventListener('click', () => {
            window.location.search = `?page=${--currentPage}`;
        });
        paginationContainer.append(arrowLeft);
        if (currentPage !== 1) {
            if (currentPage > 3) {
                paginationContainer.append(dots);
            }
        }
        const firstShownPage = getFirstShownPage(currentPage, pages);
        for (let i = firstShownPage; i < firstShownPage + TOTAL_PAGINATION_ITEMS; i++) {
            const paginationELement = createPaginationItem(i, i === currentPage);
            paginationContainer.append(paginationELement);
        }

        if (currentPage !== pages.length) {
            if (currentPage < pages - 3) {
                paginationContainer.append(dots.cloneNode(true));
            }
        }
        
        const arrowRight = createArrow('>', currentPage < pages);
        arrowRight.addEventListener('click', () => {
                window.location.search = `?page=${++currentPage}`;
        });
        paginationContainer.append(arrowRight);

        return paginationContainer;
    };

    const cutDescription = (description) => {
        const descriptionSplited = description.split(' ').slice(0, 8);
        return `${descriptionSplited.join(' ')}...`;
    };


    const createArticleCard = (title, description, id) => {
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
        btn.addEventListener('click', () => {
            window.location.href = `post.html?id=${id}`;
        });
        card.append(btn);

        return card;
    };

    const getPageFromUrl = () => {
        let urlString = window.location.search;
        let searchParams = new URLSearchParams(urlString);
        return searchParams.get('page');
    };

    async function createBlog(container) {
        const articleContainer = document.createElement('div');
        articleContainer.classList.add('article-container');

        const {pages, data} = await getData(getPageFromUrl());

        for (let i = 0; i < data.length; i++) {
            const card = createArticleCard(data[i].title, data[i].body, data[i].id);
            articleContainer.append(card);
        }
        container.append(articleContainer);
        const pagination = createPagination(pages.pages, pages.page);
        container.append(pagination);
    };
    window.createBlog = createBlog;
})();