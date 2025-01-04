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
    const limit = 6;

    const loadProjects = async () => {
        try {
            const response = await fetch(`http://localhost:3001/api/repos?offset=${offset}&limit=${limit}`);
            const data = await response.json();

            if (data.data.length === 0) {
                loadMoreButton.disabled = true;
            }

            for (const project of data.data) {
                const div = document.createElement('div');
                div.classList.add('project');

                if (project.image && project.image.data && project.image.data.data) {
                    const blob = new Blob([new Uint8Array(project.image.data.data)], {
                        type: `${project.image.contentType}`,
                    });
                    const url = URL.createObjectURL(blob);

                    div.style.backgroundImage = `url(${url})`;
                }

                projectsContainer.appendChild(div);
            }
            offset += limit;
        } catch (error) {
            console.error(error);
        }
    };

    loadProjects();
    loadMoreButton.addEventListener('click', loadProjects);
});