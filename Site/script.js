/**
 * Script pour le Portfolio d'Evan Lamy
 * Gère le menu mobile, le défilement fluide, le bouton retour en haut et le graphique des notes.
 */

// Menu Mobile
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Fermer le menu mobile quand on clique sur un lien
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Bouton Retour en haut
const scrollTopBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- GRAPHIQUE DES NOTES (Chart.js) ---

const gradesData = [
    { subject: "Tableur & Reporting", note: 11.75, ue: "UE 1.1" },
    { subject: "BDD Relationnelles", note: 10.88, ue: "UE 1.1" },
    { subject: "Programmation 1", note: 7.44, ue: "UE 1.1" },
    { subject: "SAE Reporting", note: 16.40, ue: "UE 1.1" },
    { subject: "Stat. Descriptive", note: 14.65, ue: "UE 1.2" },
    { subject: "Probabilités", note: 10.29, ue: "UE 1.2" },
    { subject: "Maths - Analyse", note: 8.95, ue: "UE 1.2" },
    { subject: "SAE Enquête", note: 15.93, ue: "UE 1.2" },
    { subject: "Anglais", note: 15.67, ue: "UE 1.3" },
    { subject: "Communication", note: 11.42, ue: "UE 1.3" },
    { subject: "Économie / Entreprise", note: 15.70, ue: "UE 1.3" },
    { subject: "SAE Prod. Données", note: 14.80, ue: "UE 1.3" }
];

const ctx = document.getElementById('gradesChart');
if (ctx) {
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: gradesData.map(d => d.subject),
            datasets: [{
                label: 'Note / 20',
                data: gradesData.map(d => d.note),
                backgroundColor: gradesData.map(d => {
                    if (d.ue === "UE 1.1") return '#38bdf8'; // Bleu accent
                    if (d.ue === "UE 1.2") return '#0f172a'; // Bleu primaire
                    return '#94a3b8'; // Gris
                }),
                borderRadius: 5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 20,
                    grid: { color: '#e2e8f0' }
                },
                x: {
                    grid: { display: false }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            const data = gradesData[context.dataIndex];
                            return `Unité: ${data.ue}`;
                        }
                    }
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const data = gradesData[index];
                    
                    const detailsDiv = document.getElementById('gradeDetails');
                    const subjectH3 = document.getElementById('detailSubject');
                    const noteP = document.getElementById('detailNote');
                    
                    subjectH3.innerText = data.subject + " (" + data.ue + ")";
                    noteP.innerText = data.note.toFixed(2) + " / 20";
                    detailsDiv.style.display = 'block';
                    
                    // Scroll léger vers les détails
                    detailsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }
    });
}
