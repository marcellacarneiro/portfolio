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

document.addEventListener('DOMContentLoaded', () => {
    const projectsData = [
        {
            id: 1,
            name: '/ portfolio',
            description: `Este projeto consiste na criação do meu portfólio pessoal, com o objetivo de exibir meus projetos e habilidades.
            
O design foi feito aplicando o conceito de mobile first, priorizando a experiência em dispositivos móveis e garantindo que a interface fosse responsiva e fluida.`,
            languages: ['HTML', 'CSS', 'JavaScript'],
            figmaUrl: 'https://www.figma.com/design/jW7XynZKV5eyMJhOD8p80a/Untitled?node-id=0-1&t=YuoU4oMGeM9LWPS3-1',
            githubUrl: 'https://github.com/marcellacarneiro/portfolio',
            deployUrl: '',
            image: '../assets/previews/images/portfolio-image.png',
            demo: '../assets/previews/demos/portfolio-demo.gif',
        },
        {
            id: 2,
            name: '/ my-tasks',
            description: `Um aplicativo de gerenciamento de tarefas projetado para ser simples e intuitivo. Com uma interface minimalista, o MyTasks oferece funcionalidades essenciais, como:

• Adicionar novas tarefas.
• Marcar tarefas como concluídas ou pendentes.
• Excluir tarefas.
• Visualizar detalhes de cada tarefa.`,
            languages: ['HTML', 'CSS', 'JavaScript', 'React'],
            figmaUrl: 'https://www.figma.com/design/vZcNxxPthTxwsephqwfJlT/Untitled?node-id=0-1&t=EptUPnquNUv5TYwi-1',
            githubUrl: 'https://github.com/marcellacarneiro/my-tasks',
            deployUrl: 'https://my-tasks-chi.vercel.app/',
            image: '../assets/previews/images/mytasks-image.png',
            demo: '../assets/previews/demos/mytasks-demo.gif',
        },
    ];

    const loadProjects = () => {
        const projectsContainer = document.getElementById('projects-container');
        for (const project of projectsData) {
            const projectDiv = document.createElement('div');
            projectDiv.classList.add('project');

            projectDiv.innerHTML = `
            <div class="project-container">
                <div class="project-img-preview" style="background-image: url('${project.image}');"></div>
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
                                    <img id="demo-preview" src="${project.demo}" alt="">
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
    loadProjects();
});