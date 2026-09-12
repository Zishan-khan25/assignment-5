// script.js
const technologies = [
    {
        "id": "react",
        "name": "React",
        "category": "Frontend",
        "description": "A declarative, component-based JavaScript library for building modern user interfaces.",
        "icon": "https://icon.icepanel.io/Technology/svg/React.svg",
        "rating": 4.9,
        "difficulty": "Beginner",
        "badge": "Popular"
    },
    {
        "id": "vue",
        "name": "Vue.js",
        "category": "Frontend",
        "description": "An approachable, performant, and versatile framework for building web user interfaces.",
        "icon": "https://icon.icepanel.io/Technology/svg/Vue.js.svg",
        "rating": 4.8,
        "difficulty": "Beginner",
        "badge": "Versatile"
    },
    {
        "id": "svelte",
        "name": "Svelte",
        "category": "Frontend",
        "description": "Cybernetically enhanced web apps with compile-time reactivity and zero virtual DOM overhead.",
        "icon": "https://icon.icepanel.io/Technology/svg/Svelte.svg",
        "rating": 4.8,
        "difficulty": "Intermed",
        "badge": "Fast"
    },
    {
        "id": "nextjs",
        "name": "Next.js",
        "category": "Frontend",
        "description": "The React framework for full-stack web applications with hybrid static & server rendering.",
        "icon": "https://icon.icepanel.io/Technology/svg/Next.js.svg",
        "rating": 4.9,
        "difficulty": "Intermed",
        "badge": "Modern"
    },
    {
        "id": "nodejs",
        "name": "Node.js",
        "category": "Backend",
        "description": "An asynchronous event-driven JavaScript runtime built on Chrome's V8 engine.",
        "icon": "https://icon.icepanel.io/Technology/svg/Node.js.svg",
        "rating": 4.8,
        "difficulty": "Intermed",
        "badge": "Standard"
    },
    {
        "id": "postgresql",
        "name": "PostgreSQL",
        "category": "Database",
        "description": "A powerful, open-source object-relational database system with proven reliability.",
        "icon": "https://icon.icepanel.io/Technology/svg/PostgresSQL.svg",
        "rating": 4.9,
        "difficulty": "Intermed",
        "badge": "Top SQL"
    },
    {
        "id": "redis",
        "name": "Redis",
        "category": "Database",
        "description": "In-memory data structure store used as a high-speed database, cache, and message broker.",
        "icon": "https://icon.icepanel.io/Technology/svg/Redis.svg",
        "rating": 4.8,
        "difficulty": "Intermed",
        "badge": "Cache"
    },
    {
        "id": "javascript",
        "name": "JavaScript",
        "category": "Language",
        "description": "The versatile, ubiquitous scripting language powering dynamic behavior across the web.",
        "icon": "https://icon.icepanel.io/Technology/svg/JavaScript.svg",
        "rating": 4.9,
        "difficulty": "Beginner",
        "badge": "Ubiquitous"
    },
    {
        "id": "typescript",
        "name": "TypeScript",
        "category": "Language",
        "description": "A strongly typed programming language that builds on JavaScript for robust tooling.",
        "icon": "https://icon.icepanel.io/Technology/svg/TypeScript.svg",
        "rating": 4.9,
        "difficulty": "Intermed",
        "badge": "Essential"
    }
];

let stack = [];

function renderTechnologies() {
    const grid = document.getElementById('tech-grid');
    grid.innerHTML = '';

    for (let i = 0; i < technologies.length; i++) {
        let tech = technologies[i];
        let isAdded = false;

        for (let j = 0; j < stack.length; j++) {
            if (stack[j].id === tech.id) {
                isAdded = true;
                break;
            }
        }

        let card = document.createElement('div');
        card.className = 'tech-card';

        card.innerHTML = `
            <div>
                <div class="card-top">
                    <div class="tech-icon-box">
                        <img src="${tech.icon}" alt="${tech.name}">
                    </div>
                    <span class="tech-badge">${tech.badge}</span>
                </div>
                <h3>${tech.name}</h3>
                <p>${tech.description}</p>
            </div>
            <div class="card-footer">
                <div class="card-info">
                    <span class="cat-tag">${tech.category}</span>
                    <span>${tech.difficulty}</span>
                    <span class="rating"><span>★</span> ${tech.rating}</span>
                </div>
                <button onclick="addToStack('${tech.id}')" class="btn-add ${isAdded ? 'added' : ''}">
                    ${isAdded ? '✓ Added to Stack' : 'Add to Stack'}
                </button>
            </div>
        `;

        grid.appendChild(card);
    }
}

function addToStack(id) {
    let techToAdd = null;
    for (let i = 0; i < technologies.length; i++) {
        if (technologies[i].id === id) {
            techToAdd = technologies[i];
            break;
        }
    }

    let alreadyExists = false;
    for (let i = 0; i < stack.length; i++) {
        if (stack[i].id === id) {
            alreadyExists = true;
            break;
        }
    }

    if (!alreadyExists && techToAdd) {
        stack.push(techToAdd);
    }

    renderTechnologies();
    renderStack();
}

function removeFromStack(id) {
    let newStack = [];
    for (let i = 0; i < stack.length; i++) {
        if (stack[i].id !== id) {
            newStack.push(stack[i]);
        }
    }
    stack = newStack;

    renderTechnologies();
    renderStack();
}

const removeAllBtn = document.getElementById('remove-all-btn');
removeAllBtn.addEventListener('click', function() {
    stack = [];
    renderTechnologies();
    renderStack();
});

function renderStack() {
    let stackContainer = document.getElementById('stack-container');
    let stackCount = document.getElementById('stack-count');

    if (stack.length === 0) {
        stackCount.innerText = "No technologies selected yet.";
        removeAllBtn.classList.add('hidden');
        stackContainer.innerHTML = `
            <div class="empty-stack">
                <p>No technologies selected yet.</p>
                <div class="empty-box">Your stack is empty.</div>
            </div>
        `;
        return;
    }

    stackCount.innerText = stack.length + " Technology Selected";
    removeAllBtn.classList.remove('hidden');
    stackContainer.innerHTML = '';

    for (let i = 0; i < stack.length; i++) {
        let item = stack[i];
        let itemDiv = document.createElement('div');
        itemDiv.className = 'stack-item-card';

        itemDiv.innerHTML = `
            <div class="stack-item-left">
                <img src="${item.icon}" alt="${item.name}">
                <div class="stack-item-info">
                    <h4>${item.name}</h4>
                    <span>${item.category}</span>
                </div>
            </div>
            <button onclick="removeFromStack('${item.id}')" class="btn-remove-item">✕</button>
        `;

        stackContainer.appendChild(itemDiv);
    }
}

renderTechnologies();
renderStack();