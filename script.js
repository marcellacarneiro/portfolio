function toggleMenu() {
    const menu = document.querySelector('.menu-container');
    menu.classList.toggle('active');
    const body = document.body;
    body.classList.toggle('no-scroll');
    if (window.innerWidth >= 768) {
        menu.classList.remove('active');
        body.classList.remove('no-scroll');
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    const projectsContainer = document.getElementById('projects-container');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageNumbersContainer = document.getElementById('page-numbers');

    let totalPages = 1;
    let currentPage = 1;
    const limit = 6;

    const loadProjects = async (page) => {
        try {
            const offset = (page - 1) * limit;
            const response = await fetch(`http://localhost:3001/api/repos?offset=${offset}&limit=${limit}`);
            const result = await response.json();

            totalPages = result.totalPages;

            projectsContainer.innerHTML = '';

            const gridAreas = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6'];

            result.data.forEach((project, index) => {
                const div = document.createElement('div');
                div.classList.add('project');
                div.style.gridArea = gridAreas[index];

                if (project.image && project.image.data && project.image.data.data) {
                    const blob = new Blob([new Uint8Array(project.image.data.data)], {
                        type: `${project.image.contentType}`,
                    });
                    const url = URL.createObjectURL(blob);
                    div.style.backgroundImage = `url(${url})`;
                } else {
                    div.style.backgroundImage = 'none';
                }

                projectsContainer.appendChild(div);
            });

            // Preencher espaços vazios
            // const emptySpaces = limit - result.data.length;
            // for (let i = 0; i < emptySpaces; i++) {
            //     const emptyDiv = document.createElement('div');
            //     emptyDiv.classList.add('project');
            //     emptyDiv.style.gridArea = gridAreas[result.data.length + i];
            //     emptyDiv.style.visibility = 'hidden';
            //     projectsContainer.appendChild(emptyDiv);
            // }

            updatePagination(currentPage, totalPages);
        } catch (error) {
            console.error(error);
        }
    };

    const updatePagination = (currentPage, totalPages) => {
        prevPageButton.disabled = currentPage === 1;
        nextPageButton.disabled = currentPage === totalPages;

        pageNumbersContainer.textContent = `${currentPage} de ${totalPages}`;
    };

    const changePage = (direction) => {
        if (direction === 'prev' && currentPage > 1) {
            currentPage--;
        } else if (direction === 'next' && currentPage < totalPages) {
            currentPage++;
        }
        loadProjects(currentPage);
    };

    prevPageButton.addEventListener('click', () => changePage('prev'));
    nextPageButton.addEventListener('click', () => changePage('next'));

    loadProjects(currentPage);
});
