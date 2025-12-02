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

const wowSpecRoles = {
    // Guerrier
    "Armes": "DPS", "Fureur": "DPS", "Protection": "Tank",
    // Paladin
    "Sacré": "Healer", "Vindicte": "DPS",
    // Chasseur
    "Maîtrise des bêtes": "DPS", "Précision": "DPS", "Survie": "DPS",
    // Voleur
    "Assassinat": "DPS", "Hors-la-loi": "DPS", "Finesse": "DPS",
    // Prêtre
    "Discipline": "Healer", "Ombre": "DPS",
    // DK
    "Sang": "Tank", "Givre": "DPS", "Impie": "DPS",
    // Chaman
    "Élémentaire": "DPS", "Amélioration": "DPS", "Restauration": "Healer",
    // Mage
    "Arcanes": "DPS", "Feu": "DPS",
    // Démoniste
    "Affliction": "DPS", "Démonologie": "DPS", "Destruction": "DPS",
    // Moine
    "Maître brasseur": "Tank", "Tisse-brume": "Healer", "Marche-vent": "DPS",
    // Druide
    "Équilibre": "DPS", "Farouche": "DPS", "Gardien": "Tank",
    // DH
    "Dévastation": "DPS", "Vengeance": "Tank", "Dévoreur": "DPS",
    // Évocateur
    "Préservation": "Healer", "Augmentation": "DPS"
};

document.addEventListener('DOMContentLoaded', () => {
    const classSelect = document.getElementById('characterClass');
    const specSelect = document.getElementById('spec');
    const secondarySpecSelect = document.getElementById('secondarySpec');
    const roleSelect = document.getElementById('role');
    const form = document.getElementById('rosterForm');

    // Choice 2 Elements
    const addChoice2Btn = document.getElementById('addChoice2Btn');
    const removeChoice2Btn = document.getElementById('removeChoice2Btn');
    const choice2Container = document.getElementById('choice2Container');
    const c2ClassSelect = document.getElementById('choice2_class');
    const c2SpecSelect = document.getElementById('choice2_spec');
    const c2RoleSelect = document.getElementById('choice2_role');

    // Populate Class Dropdown
    Object.keys(wowClasses).sort().forEach(cls => {
        const option = document.createElement('option');
        option.value = cls;
        option.textContent = cls;
        classSelect.appendChild(option);

        // Populate Choice 2 Class Dropdown as well
        const option2 = document.createElement('option');
        option2.value = cls;
        option2.textContent = cls;
        c2ClassSelect.appendChild(option2);
    });

    // Handle Class Change
    classSelect.addEventListener('change', () => {
        const selectedClass = classSelect.value;

        // Reset and Disable Spec & Role
        specSelect.innerHTML = '<option value="" disabled selected>Sélectionner une Spé</option>';
        secondarySpecSelect.innerHTML = '<option value="" disabled selected>Sélectionner une Spé Sec.</option>';
        roleSelect.innerHTML = '<option value="" disabled selected>Sélectionner un Rôle</option>';
        specSelect.disabled = true;
        secondarySpecSelect.disabled = true;
        roleSelect.disabled = true;

        if (selectedClass) {
            // Populate Specs
            if (wowClasses[selectedClass]) {
                specSelect.disabled = false;
                secondarySpecSelect.disabled = false;
                wowClasses[selectedClass].forEach(spec => {
                    const option = document.createElement('option');
                    option.value = spec;
                    option.textContent = spec;
                    specSelect.appendChild(option);

                    const optionSec = document.createElement('option');
                    optionSec.value = spec;
                    optionSec.textContent = spec;
                    secondarySpecSelect.appendChild(optionSec);
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

    // Auto-Select Role on Spec Change
    specSelect.addEventListener('change', () => {
        const spec = specSelect.value;
        if (wowSpecRoles[spec]) {
            roleSelect.value = wowSpecRoles[spec];
        }
    });

    // Choice 2 Logic
    addChoice2Btn.addEventListener('click', () => {
        choice2Container.style.display = 'block';
        addChoice2Btn.style.display = 'none';
    });

    removeChoice2Btn.addEventListener('click', () => {
        choice2Container.style.display = 'none';
        addChoice2Btn.style.display = 'block';
        // Reset inputs
        document.getElementById('choice2_name').value = '';
        c2ClassSelect.value = '';
        c2SpecSelect.innerHTML = '<option value="" disabled selected>Spé</option>';
        c2RoleSelect.innerHTML = '<option value="" disabled selected>Rôle</option>';
        c2SpecSelect.disabled = true;
        c2RoleSelect.disabled = true;
    });

    c2ClassSelect.addEventListener('change', () => {
        const cls = c2ClassSelect.value;
        c2SpecSelect.innerHTML = '<option value="" disabled selected>Spé</option>';
        c2RoleSelect.innerHTML = '<option value="" disabled selected>Rôle</option>';
        c2SpecSelect.disabled = true;
        c2RoleSelect.disabled = true;

        if (cls) {
            if (wowClasses[cls]) {
                c2SpecSelect.disabled = false;
                wowClasses[cls].forEach(spec => {
                    c2SpecSelect.add(new Option(spec, spec));
                });
            }
            if (wowRoles[cls]) {
                c2RoleSelect.disabled = false;
                wowRoles[cls].forEach(role => {
                    c2RoleSelect.add(new Option(role, role));
                });
            }
        }
    });

    // Auto-Select Choice 2 Role
    c2SpecSelect.addEventListener('change', () => {
        const spec = c2SpecSelect.value;
        if (wowSpecRoles[spec]) {
            c2RoleSelect.value = wowSpecRoles[spec];
        }
    });

    // Handle Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const rawData = Object.fromEntries(formData.entries());

        // Extract Choice 2
        const rerolls = [];
        if (choice2Container.style.display !== 'none') {
            const name = document.getElementById('choice2_name').value;
            const cls = c2ClassSelect.value;
            const spec = c2SpecSelect.value;
            const role = c2RoleSelect.value;

            if (name && cls && spec && role) {
                rerolls.push({ name, characterClass: cls, spec, role });
            }
        }

        const data = {
            name: rawData.name,
            characterClass: rawData.characterClass,
            spec: rawData.spec,
            secondarySpec: rawData.secondarySpec || null,
            role: rawData.role,
            playstyle: rawData.playstyle,
            comment: rawData.comment,
            rerolls: rerolls // Sending as array of 1 object
        };

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
                secondarySpecSelect.disabled = true;
                roleSelect.disabled = true;

                // Reset Choice 2
                choice2Container.style.display = 'none';
                addChoice2Btn.style.display = 'block';
                c2SpecSelect.disabled = true;
                c2RoleSelect.disabled = true;

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
