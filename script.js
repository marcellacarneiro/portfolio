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

const API_BASE_URL = 'http://127.0.0.1:3001/api/repos';
let limit = window.innerWidth < 768 ? 3 : 6;

const apiFetch = async () => {
    const response = await fetch(`${API_BASE_URL}?offset=0&limit=${limit}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch repositories: ${response.status}`);
    }

    return response.json();
};

const projectsContainer = document.getElementById('projects-container');

const loadProjects = (projects) => {
    for (const project of projects) {
        const imageUrl = project.hasImage ? `${API_BASE_URL}/${project._id}/image` : null;
        const demoUrl = project.hasDemo ? `${API_BASE_URL}/${project._id}/demo` : null;
        const imagePreview = project.hasImage ? `background-image: url('${imageUrl}');` : '';
        const demoPreview = project.hasDemo ? `<img src="${demoUrl}" alt="${project.name} demo">` : '';
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('project');

        projectDiv.innerHTML = `
            <div class="project-container">
                <div class="project-img-preview" style="${imagePreview}"></div>
                    <div class="project-title-container">
                        <span>${project.name}</span>
                    <button type="button" class="project-details-button">ver detalhes</button>
                </div>
            </div>
            `;
        projectsContainer.appendChild(projectDiv);

        projectDiv.querySelector('.project-details-button').addEventListener('click', () => {
            const modal = document.getElementById('project-details-modal');

            modal.innerHTML = `
                    <div class="close-modal-container">
                        <div class="close-modal">
                            <div class="bar"></div>
                            <div class="bar"></div>
                        </div>
                    </div>
                    <div class="project-details">
                        <div class="project-details__container">
                            <div class="details-left">
                                <div class="project-details__text">
                                    <h3>${project.name}</h3>
                                    <pre>${project.description}</pre>
                                    <p>Tecnologias: ${project.languages.join(', ')}</p>
                                </div>
                            </div>
                            <div class="details-right">
                                <div class="project-details__demo">
                                    ${demoPreview}
                                </div>
                                <div class="project-details__actions">
                                    <a href="${project.deployUrl}" target="_blank">
                                        <button type="button">acessar projeto</button>
                                    </a>
                                    <a href="${project.githubUrl}" target="_blank">
                                        <button type="button">acessar repositório</button>
                                    </a>
                                    <a href="${project.figmaUrl}" target="_blank">
                                        <button type="button">acessar protótipo</button>
                                    </a>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

            modal.showModal();

            modal.querySelector('.close-modal').addEventListener('click', () => {
                modal.close();
            });
        });
    }
};

const loadMoreButton = document.getElementById('load-more-button');

const updateLoadMoreButton = (response) => {
    if (response.data.length >= response.totalRepos) {
        loadMoreButton.style.display = 'none';
    } else {
        loadMoreButton.style.display = 'block';
    }
};

loadMoreButton.addEventListener('click', async () => {
    limit += 3;

    try {
        const response = await apiFetch();
        if (response.data.length >= response.totalRepos) {
            loadMoreButton.style.display = 'none';
        }
        projectsContainer.innerHTML = '';
        loadProjects(response.data);
    } catch (error) {
        console.error('Error loading more projects:', error);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await apiFetch();
        loadProjects(response.data);
        updateLoadMoreButton(response);
    } catch (error) {
        console.error('Error loading projects: ', error);
    }
});
