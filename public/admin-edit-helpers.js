// Helper functions for admin edit modal class/role management
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

function populateEditClassDropdowns() {
    const editClassSelect = document.getElementById('edit_characterClass');
    const choice2ClassSelect = document.getElementById('edit_choice2_class');

    // Only populate if not already done
    if (editClassSelect.options.length <= 1) {
        Object.keys(classToRoles).sort().forEach(cls => {
            editClassSelect.add(new Option(cls, cls));
            choice2ClassSelect.add(new Option(cls, cls));
        });

        // Add event listeners for class changes
        editClassSelect.addEventListener('change', function () {
            updateEditRoles(this.value);
        });

        choice2ClassSelect.addEventListener('change', function () {
            updateEditChoice2Roles(this.value);
        });
    }
}

function updateEditRoles(selectedClass) {
    const primaryRoleSelect = document.getElementById('edit_primaryRole');
    const secondaryRoleSelect = document.getElementById('edit_secondaryRole');

    // Store current values
    const currentPrimary = primaryRoleSelect.value;
    const currentSecondary = secondaryRoleSelect.value;

    // Clear current options
    primaryRoleSelect.innerHTML = '';
    secondaryRoleSelect.innerHTML = '<option value="">Aucun</option>';

    if (selectedClass && classToRoles[selectedClass]) {
        classToRoles[selectedClass].forEach(role => {
            primaryRoleSelect.add(new Option(role, role));
            secondaryRoleSelect.add(new Option(role, role));
        });

        // Restore values if they're still valid
        if (classToRoles[selectedClass].includes(currentPrimary)) {
            primaryRoleSelect.value = currentPrimary;
        }
        if (classToRoles[selectedClass].includes(currentSecondary)) {
            secondaryRoleSelect.value = currentSecondary;
        }
    }
}

function updateEditChoice2Roles(selectedClass) {
    const primaryRoleSelect = document.getElementById('edit_choice2_primaryRole');
    const secondaryRoleSelect = document.getElementById('edit_choice2_secondaryRole');

    // Store current values
    const currentPrimary = primaryRoleSelect.value;
    const currentSecondary = secondaryRoleSelect.value;

    // Clear current options
    primaryRoleSelect.innerHTML = '<option value="">Aucun</option>';
    secondaryRoleSelect.innerHTML = '<option value="">Aucun</option>';

    if (selectedClass && classToRoles[selectedClass]) {
        classToRoles[selectedClass].forEach(role => {
            primaryRoleSelect.add(new Option(role, role));
            secondaryRoleSelect.add(new Option(role, role));
        });

        // Restore values if they're still valid
        if (classToRoles[selectedClass].includes(currentPrimary)) {
            primaryRoleSelect.value = currentPrimary;
        }
        if (classToRoles[selectedClass].includes(currentSecondary)) {
            secondaryRoleSelect.value = currentSecondary;
        }
    }
}
