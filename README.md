# Roster Azeroth

Application de gestion de roster WoW, construite avec Node.js, Express et SQLite (compatible Turso pour le cloud).

## 🚀 Installation & Démarrage Local

1.  **Installer les dépendances** :
    ```bash
    npm install
    ```

2.  **Démarrer le serveur** :
    ```bash
    npm start
    ```
    Le site sera accessible sur `http://localhost:3000`.

---

## 💾 Base de Données

L'application est configurée pour fonctionner de deux manières (voir `database.js`) :

1.  **Mode Local (Fichier)** :
    Si aucune variable d'environnement n'est définie, l'application crée et utilise un fichier local `roster.db`. C'est le comportement par défaut si vous n'avez pas de fichier `.env.local`.

2.  **Mode Cloud (Turso)** :
    Pour que l'application se connecte à une base de données en ligne (nécessaire pour Vercel), elle utilise **Turso**.
    
    **Configuration Locale pour Turso** :
    Créez un fichier `.env.local` à la racine du projet avec vos identifiants :
    ```env
    TURSO_DATABASE_URL=libsql://votre-base.turso.io
    TURSO_AUTH_TOKEN=votre-token-jwt
    ```
    *Note : Ce fichier est ignoré par Git pour la sécurité.*

---

## ☁️ Déploiement sur Vercel

Le projet est configuré pour être déployé sur **Vercel**.

1.  **Pousser le code sur GitHub** (voir section Git ci-dessous).
2.  **Importer le projet dans Vercel**.
3.  **Configurer les Variables d'Environnement** dans Vercel (Settings > Environment Variables) :
    - `TURSO_DATABASE_URL` : Votre URL Turso.
    - `TURSO_AUTH_TOKEN` : Votre Token Turso.
4.  **Redéployer** (si nécessaire).

---

## 🛠️ Gestion Git & Mises à jour

Pour mettre à jour votre site en ligne, il suffit de pousser vos modifications sur la branche `main` de GitHub. Vercel détectera automatiquement le changement et redéploiera le site.

**Commandes utiles :**

1.  **Voir les fichiers modifiés** :
    ```bash
    git status
    ```

2.  **Ajouter les modifications** (préparer le commit) :
    ```bash
    git add .
    ```

3.  **Enregistrer les modifications** (créer le commit) :
    ```bash
    git commit -m "Description de vos changements"
    ```
    *Exemple : `git commit -m "Ajout du filtre de recherche"`*

4.  **Envoyer sur GitHub (et déclencher le déploiement Vercel)** :
    ```bash
    git push origin main
    ```

---

## 🛡️ Administration

- **URL Admin** : Accessible via le bouton "Admin" en haut à droite.
- **Mot de passe** : `Azeroth2024` (Configuré dans `index.html`).
- **Fonctionnalités** :
    - Voir la liste complète.
    - Filtrer par Rôle, Classe ou Pseudo.
    - Supprimer des entrées (croix rouge).
    - Exporter en PDF ou Excel.
    - Reset complet de la base.
