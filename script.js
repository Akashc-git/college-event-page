const events = [
    { title: "Football Tournament", date: "2026-02-02", category: "Sports", description: "Inter-college football championship." },
    { title: "AI Workshop", date: "2026-02-05", category: "Workshop", description: "Hands-on AI & ML workshop." },
    { title: "Guest Lecture: Cybersecurity", date: "2026-02-06", category: "Lecture", description: "Industry expert talk." },
    { title: "Basketball League", date: "2026-02-08", category: "Sports", description: "Annual basketball league." },
    { title: "Web Development Bootcamp", date: "2026-02-10", category: "Workshop", description: "Learn full-stack development." },
    { title: "Entrepreneurship Talk", date: "2026-02-12", category: "Lecture", description: "Startup success stories." }
];

let currentPage = 1;
const eventsPerPage = 5;

function renderEvents() {
    const container = document.getElementById("eventsContainer");
    container.innerHTML = "";

    let filteredEvents = events.filter(event => {
        const search = document.getElementById("searchInput").value.toLowerCase();
        const category = document.getElementById("categoryFilter").value;
        const dateFilter = document.getElementById("dateFilter").value;

        let matchSearch = event.title.toLowerCase().includes(search) || event.date.includes(search);
        let matchCategory = category === "All" || event.category === category;

        let matchDate = true;
        const today = new Date().toISOString().split("T")[0];

        if (dateFilter === "today") {
            matchDate = event.date === today;
        } else if (dateFilter === "week") {
            const eventDate = new Date(event.date);
            const now = new Date();
            const weekEnd = new Date();
            weekEnd.setDate(now.getDate() + 7);
            matchDate = eventDate >= now && eventDate <= weekEnd;
        }

        return matchSearch && matchCategory && matchDate;
    });

    const start = (currentPage - 1) * eventsPerPage;
    const paginatedEvents = filteredEvents.slice(start, start + eventsPerPage);

    paginatedEvents.forEach(event => {
        container.innerHTML += `
                <div class="event-card">
                    <h3>${event.title}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p>${event.description}</p>
                    <button>View Details</button>
                </div>
            `;
    });
}

function nextPage() {
    currentPage++;
    renderEvents();
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderEvents();
    }
}

document.getElementById("searchInput").addEventListener("input", renderEvents);
document.getElementById("categoryFilter").addEventListener("change", renderEvents);
document.getElementById("dateFilter").addEventListener("change", renderEvents);

renderEvents();