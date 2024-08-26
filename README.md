# Gestion de Planning Automatique

Ce projet est une application de gestion de planning automatique développée avec [Electron](https://www.electronjs.org/). Elle permet de créer, organiser et gérer des plannings de manière automatique, en tenant compte de diverses contraintes et préférences définies par l'utilisateur.

## Fonctionnalités

- **Création Automatique de Planning** : Génération automatique de plannings en fonction des tâches, priorités, et contraintes horaires.
- **Gestion des Tâches** : Ajout, modification et suppression de tâches avec prise en compte de la durée, de la priorité, et des dépendances.
- **Interface Utilisateur Intuitive** : Interface graphique conviviale permettant de visualiser et d'interagir facilement avec le planning.
- **Notifications** : Rappels et notifications pour les tâches à venir ou en retard.
- **Sauvegarde et Chargement** : Sauvegarde et chargement des plannings en local.

## Installation

### Prérequis

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [Git](https://git-scm.com/)

### Étapes d'installation

1. Clonez ce dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/gestion-planning-automatique.git
   cd gestion-planning-automatique
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Lancez l'application en mode développement :

   ```bash
   npm start
   ```

## Build pour la Production

Pour créer une version distribuable de l'application :

```bash
npm run build
```

Le build final sera disponible dans le dossier `dist`.

