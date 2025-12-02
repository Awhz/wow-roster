const wowClasses = {
    "Guerrier": ["Armes", "Fureur", "Protection"],
    "Paladin": ["Sacré", "Protection", "Vindicte"],
    "Chasseur": ["Maîtrise des bêtes", "Précision", "Survie"],
    "Voleur": ["Assassinat", "Hors-la-loi", "Finesse"],
    "Prêtre": ["Discipline", "Sacré", "Ombre"],
    "Chevalier de la mort": ["Sang", "Givre", "Impie"],
    "Chaman": ["Élémentaire", "Amélioration", "Restauration"],
    "Mage": ["Arcanes", "Feu", "Givre"],
    "Démoniste": ["Affliction", "Démonologie", "Destruction"],
    "Moine": ["Maître brasseur", "Tisse-brume", "Marche-vent"],
    "Druide": ["Équilibre", "Farouche", "Gardien", "Restauration"],
    "Chasseur de démons": ["Dévastation", "Vengeance", "Dévoreur"],
    "Évocateur": ["Dévastation", "Préservation", "Augmentation"]
};

const wowRoles = {
    "Guerrier": ["Tank", "DPS"],
    "Paladin": ["Tank", "Healer", "DPS"],
    "Chasseur": ["DPS"],
    "Voleur": ["DPS"],
    "Prêtre": ["Healer", "DPS"],
    "Chevalier de la mort": ["Tank", "DPS"],
    "Chaman": ["Healer", "DPS"],
    "Mage": ["DPS"],
    "Démoniste": ["DPS"],
    "Moine": ["Tank", "Healer", "DPS"],
    "Druide": ["Tank", "Healer", "DPS"],
    "Chasseur de démons": ["Tank", "DPS"],
    "Évocateur": ["Healer", "DPS"]
};

document.addEventListener('DOMContentLoaded', () => {
    const classSelect = document.getElementById('characterClass');
    const specSelect = document.getElementById('spec');
    const roleSelect = document.getElementById('role');
    const form = document.getElementById('rosterForm');

    // Populate Class Dropdown
    Object.keys(wowClasses).sort().forEach(cls => {
        const option = document.createElement('option');
        option.value = cls;
        option.textContent = cls;
        classSelect.appendChild(option);
    });

    // Handle Class Change
    classSelect.addEventListener('change', () => {
        const selectedClass = classSelect.value;

        // Reset and Disable Spec & Role
        specSelect.innerHTML = '<option value="" disabled selected>Sélectionner une Spé</option>';
        roleSelect.innerHTML = '<option value="" disabled selected>Sélectionner un Rôle</option>';
        specSelect.disabled = true;
        roleSelect.disabled = true;

        if (selectedClass) {
            // Populate Specs
            if (wowClasses[selectedClass]) {
                specSelect.disabled = false;
                wowClasses[selectedClass].forEach(spec => {
                    const option = document.createElement('option');
                    option.value = spec;
                    option.textContent = spec;
                    specSelect.appendChild(option);
                });
            }

            // Populate Roles
            if (wowRoles[selectedClass]) {
                roleSelect.disabled = false;
                wowRoles[selectedClass].forEach(role => {
                    const option = document.createElement('option');
                    option.value = role;
                    option.textContent = role;
                    roleSelect.appendChild(option);
                });
            }
        }
    });

    // Handle Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('/api/roster', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                // Show Success Modal
                const modal = document.getElementById('successModal');
                modal.style.display = 'flex';

                form.reset();
                specSelect.disabled = true;
                roleSelect.disabled = true;
            } else {
                const error = await response.json();
                alert('Erreur lors de l\'envoi : ' + error.error);
            }
        } catch (err) {
            console.error('Erreur:', err);
            alert('Impossible de contacter le serveur.');
        }
    });
});

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}
