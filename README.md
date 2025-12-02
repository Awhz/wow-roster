# 🎮 WoW Roster - Gestionnaire de Roster de Guilde

Application web pour gérer le roster d'une guilde World of Warcraft, avec formulaire d'inscription, panneau d'administration et analytiques.

![WoW Theme](https://img.shields.io/badge/Theme-World%20of%20Warcraft-orange)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [API](#-api)
- [Sécurité](#-sécurité)
- [Déploiement](#-déploiement)

## ✨ Fonctionnalités

### 📝 Formulaire d'inscription
- Inscription des personnages principaux avec :
  - Nom, classe, spécialisation
  - Rôle (Tank, Healer, DPS)
  - Style de jeu (Progress, Social)
  - Spécialisation secondaire
  - Commentaires
- **Choix 2** : Possibilité d'ajouter un personnage secondaire complet
- Validation dynamique des champs selon la classe choisie
- Interface thématique WoW avec design immersif

### 🛡️ Panneau d'administration
- **Visualisation des données** :
  - Tableaux triables et filtrables
  - Graphiques interactifs (répartition par rôle, classe, style de jeu)
  - Recherche par nom de personnage
- **Gestion des entrées** :
  - ✏️ Édition en ligne avec modal
  - Modification du personnage principal ET du choix 2
  - 🗑️ Suppression d'entrées (protégée par mot de passe)
  - Réinitialisation complète de la base (protégée par mot de passe)
- **Affichage du Choix 2** :
  - Flèche dépliable (▶) à gauche du nom principal
  - Vue détaillée du personnage secondaire
- **Export des données** :
  - Export PDF
  - Export Excel

### 📊 Analytiques
- Graphiques en temps réel :
  - Répartition des rôles (Tank/Healer/DPS)
  - Préférences de style de jeu (Progress/Social)
  - Distribution des classes avec couleurs officielles WoW

## 🛠️ Technologies

### Backend
- **Node.js** avec Express.js
- **Turso** (LibSQL) - Base de données SQLite distribuée
- **dotenv** - Gestion des variables d'environnement

### Frontend
- **HTML5 / CSS3** - Interface responsive
- **JavaScript Vanilla** - Logique client
- **Chart.js** - Graphiques interactifs
- **jsPDF** & **jsPDF-AutoTable** - Export PDF
- **SheetJS (xlsx)** - Export Excel

### Fonts
- **Cinzel** - Titres (style médiéval)
- **Roboto** - Texte courant

## 📦 Installation

### Prérequis
- Node.js v18 ou supérieur
- npm ou yarn
- Compte Turso (base de données)

### Étapes

1. **Cloner le repository**
```bash
git clone https://github.com/Awhz/wow-roster.git
cd wow-roster
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer les variables d'environnement**

Créer un fichier `.env.local` à la racine :
```env
TURSO_DATABASE_URL=libsql://your-database.turso.io
TURSO_AUTH_TOKEN=your-auth-token
```

4. **Initialiser la base de données**

La base sera automatiquement créée au premier lancement.

5. **Démarrer le serveur**
```bash
npm start
```

L'application sera accessible sur `http://localhost:3000`

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Requis |
|----------|-------------|--------|
| `TURSO_DATABASE_URL` | URL de la base Turso | ✅ |
| `TURSO_AUTH_TOKEN` | Token d'authentification Turso | ✅ |
| `PORT` | Port du serveur (défaut: 3000) | ❌ |

### Mot de passe admin

Le mot de passe par défaut pour les actions destructives est : **`Azeroth2024`**

⚠️ **Important** : Changez ce mot de passe dans le code avant de déployer en production :
- Fichier : `public/admin-secret.html`
- Rechercher : `"Azeroth2024"`

## 🚀 Utilisation

### Accès utilisateur
1. Ouvrir `http://localhost:3000`
2. Remplir le formulaire d'inscription
3. (Optionnel) Ajouter un "Choix 2" pour un personnage secondaire
4. Soumettre

### Accès administrateur
1. Ouvrir `http://localhost:3000/admin-secret.html`
2. Visualiser les statistiques et le roster complet
3. Utiliser les filtres pour affiner la recherche
4. Cliquer sur ▶ pour voir les détails du choix 2
5. Cliquer sur ✏️ pour éditer une entrée
6. Exporter les données en PDF ou Excel

## 📁 Structure du projet

```
wow-roster/
├── public/
│   ├── index.html           # Formulaire d'inscription
│   ├── admin-secret.html    # Panneau admin
│   ├── style.css            # Styles globaux
│   ├── script.js            # Logique formulaire
│   └── background.jpg       # Image de fond
├── server.js                # Serveur Express
├── database.js              # Configuration DB
├── .env.local               # Variables d'environnement (non versionné)
├── package.json             # Dépendances
└── README.md                # Documentation
```

## 🔌 API

### Endpoints

#### `GET /api/roster`
Récupère toutes les entrées du roster.

**Réponse** :
```json
[
  {
    "id": 1,
    "name": "Thrall",
    "characterClass": "Chaman",
    "spec": "Amélioration",
    "secondarySpec": "Restauration",
    "role": "DPS",
    "playstyle": "Progress",
    "comment": "Main tank disponible si besoin",
    "rerolls": "[{\"name\":\"Jaina\",\"characterClass\":\"Mage\",\"spec\":\"Givre\",\"role\":\"DPS\"}]",
    "timestamp": "2024-12-02T18:30:00.000Z"
  }
]
```

#### `POST /api/roster`
Ajoute une nouvelle entrée.

**Body** :
```json
{
  "name": "Thrall",
  "characterClass": "Chaman",
  "spec": "Amélioration",
  "secondarySpec": "Restauration",
  "role": "DPS",
  "playstyle": "Progress",
  "comment": "Commentaire optionnel",
  "rerolls": [
    {
      "name": "Jaina",
      "characterClass": "Mage",
      "spec": "Givre",
      "role": "DPS"
    }
  ]
}
```

#### `PUT /api/roster/:id`
Met à jour une entrée existante.

**Body** : Même structure que POST

#### `DELETE /api/roster/:id`
Supprime une entrée spécifique.

#### `DELETE /api/roster`
Réinitialise toute la base de données.

## 🔒 Sécurité

### Mesures implémentées
- ✅ Mot de passe requis pour les suppressions
- ✅ Validation des données côté serveur
- ✅ Protection contre les injections SQL (requêtes préparées)
- ✅ Variables d'environnement pour les secrets

### Recommandations pour la production
- [ ] Implémenter une vraie authentification (JWT, OAuth)
- [ ] Ajouter HTTPS
- [ ] Limiter le taux de requêtes (rate limiting)
- [ ] Changer le mot de passe admin par défaut
- [ ] Ajouter des logs d'audit
- [ ] Implémenter CORS si nécessaire

## 🌐 Déploiement

### Déploiement sur Vercel

1. **Préparer le projet**
```bash
npm install -g vercel
```

2. **Configurer vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

3. **Déployer**
```bash
vercel --prod
```

4. **Configurer les variables d'environnement** dans le dashboard Vercel

### Déploiement sur Heroku

1. **Créer un Procfile**
```
web: node server.js
```

2. **Déployer**
```bash
heroku create wow-roster
git push heroku main
heroku config:set TURSO_DATABASE_URL=your-url
heroku config:set TURSO_AUTH_TOKEN=your-token
```

## 📝 Scripts disponibles

```bash
npm start          # Démarre le serveur
npm run dev        # Mode développement (si nodemon installé)
```

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteur

**Awhz** - [GitHub](https://github.com/Awhz)

## 🙏 Remerciements

- Blizzard Entertainment pour l'univers World of Warcraft
- La communauté open-source pour les bibliothèques utilisées
- Turso pour la base de données SQLite distribuée

---

⚔️ **For the Horde!** ⚔️ **For the Alliance!** ⚔️
