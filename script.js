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
    const loadMoreButton = document.getElementById('load-more-button');
    let offset = 0;
    let limit = 6;
    let initialLoad = true;
    if (window.innerWidth < 768) {
        limit = 3;
    }

    const loadProjects = async () => {
        try {
            const response = await fetch(`http://192.168.15.8:3001/api/repos?offset=${offset}&limit=${limit}`);
            const data = await response.json();

            for (const project of data.data) {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');

                projectDiv.innerHTML = `
                    <div>
                        <span>${project.name}</span>
                        <button type="button" id="project-details-button">ver detalhes</button>
                    </div>
                `;

                if (project.image && project.image.data && project.image.data.data) {
                    const blob = new Blob([new Uint8Array(project.image.data.data)], {
                        type: `${project.image.contentType}`,
                    });
                    const url = URL.createObjectURL(blob);

                    projectDiv.style.backgroundImage = `url(${url})`;
                }

                projectsContainer.appendChild(projectDiv);
            }
            offset += limit;
            if (initialLoad) {
                limit = 3;
                initialLoad = false;
            }

            if (offset >= data.totalRepos) {
                loadMoreButton.style.display = 'none';
            }
        } catch (error) {
            console.error(error);
        }
    };

    loadProjects();
    loadMoreButton.addEventListener('click', loadProjects);
});
