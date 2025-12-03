const classToRoles = {
    "Guerrier": ["Tank", "DPS Cac"],
    "Paladin": ["Tank", "Heal", "DPS Cac"],
    "Chasseur": ["DPS Distant"],
    "Voleur": ["DPS Cac"],
    "Prêtre": ["Heal", "DPS Distant"],
    "Chevalier de la mort": ["Tank", "DPS Cac"],
    "Chaman": ["Heal", "DPS Distant", "DPS Cac"],
    "Mage": ["DPS Distant"],
    "Démoniste": ["DPS Distant"],
    "Moine": ["Tank", "Heal", "DPS Cac"],
    "Druide": ["Tank", "Heal", "DPS Distant", "DPS Cac"],
    "Chasseur de démons": ["Tank", "DPS Cac", "DPS Distant"],
    "Évocateur": ["Heal", "DPS Distant"]
};

const wowClasses = Object.keys(classToRoles);

document.addEventListener('DOMContentLoaded', () => {
    const classSelect = document.getElementById('characterClass');
    const primaryRoleSelect = document.getElementById('primaryRole');
    const secondaryRoleSelect = document.getElementById('secondaryRole');
    const form = document.getElementById('rosterForm');

    // Choice 2 Elements
    const addChoice2Btn = document.getElementById('addChoice2Btn');
    const removeChoice2Btn = document.getElementById('removeChoice2Btn');
    const choice2Container = document.getElementById('choice2Container');
    const c2ClassSelect = document.getElementById('choice2_class');
    const c2PrimaryRoleSelect = document.getElementById('choice2_primaryRole');
    const c2SecondaryRoleSelect = document.getElementById('choice2_secondaryRole');

    // Populate Class Dropdown
    wowClasses.sort().forEach(cls => {
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

        // Reset and Disable Roles
        primaryRoleSelect.innerHTML = '<option value="" disabled selected>Sélectionner un Rôle</option>';
        secondaryRoleSelect.innerHTML = '<option value="" disabled selected>Sélectionner un Rôle Sec.</option>';
        primaryRoleSelect.disabled = true;
        secondaryRoleSelect.disabled = true;

        if (selectedClass && classToRoles[selectedClass]) {
            // Populate Roles
            primaryRoleSelect.disabled = false;
            secondaryRoleSelect.disabled = false;

            classToRoles[selectedClass].forEach(role => {
                const option = document.createElement('option');
                option.value = role;
                option.textContent = role;
                primaryRoleSelect.appendChild(option);

                const optionSec = document.createElement('option');
                optionSec.value = role;
                optionSec.textContent = role;
                secondaryRoleSelect.appendChild(optionSec);
            });
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
        c2PrimaryRoleSelect.innerHTML = '<option value="" disabled selected>Rôle</option>';
        c2SecondaryRoleSelect.innerHTML = '<option value="" disabled selected>Rôle Sec.</option>';
        c2PrimaryRoleSelect.disabled = true;
        c2SecondaryRoleSelect.disabled = true;
    });

    c2ClassSelect.addEventListener('change', () => {
        const cls = c2ClassSelect.value;
        c2PrimaryRoleSelect.innerHTML = '<option value="" disabled selected>Rôle</option>';
        c2SecondaryRoleSelect.innerHTML = '<option value="" disabled selected>Rôle Sec.</option>';
        c2PrimaryRoleSelect.disabled = true;
        c2SecondaryRoleSelect.disabled = true;

        if (cls && classToRoles[cls]) {
            c2PrimaryRoleSelect.disabled = false;
            c2SecondaryRoleSelect.disabled = false;
            classToRoles[cls].forEach(role => {
                c2PrimaryRoleSelect.add(new Option(role, role));
                c2SecondaryRoleSelect.add(new Option(role, role));
            });
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
            const primaryRole = c2PrimaryRoleSelect.value;
            const secondaryRole = c2SecondaryRoleSelect.value;

            if (name && cls && primaryRole) {
                rerolls.push({
                    name,
                    characterClass: cls,
                    primaryRole,
                    secondaryRole: secondaryRole || null
                });
            }
        }

        const data = {
            name: rawData.name,
            characterClass: rawData.characterClass,
            primaryRole: rawData.primaryRole,
            secondaryRole: rawData.secondaryRole || null,
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
                primaryRoleSelect.disabled = true;
                secondaryRoleSelect.disabled = true;

                // Reset Choice 2
                choice2Container.style.display = 'none';
                addChoice2Btn.style.display = 'block';
                c2PrimaryRoleSelect.disabled = true;
                c2SecondaryRoleSelect.disabled = true;

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
    window.location.href = "admin-secret.html";
}
