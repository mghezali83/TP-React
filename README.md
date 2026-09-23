# Application React - TP de groupe

## Présentation

Application web développée avec React et TypeScript dans le cadre du TP de groupe.

L'application permet de consulter des recettes, gérer des favoris, consulter les profils utilisateurs et utiliser un espace Blog avec des articles et des commentaires.

Les données sont principalement récupérées depuis l'API DummyJSON.

---

## Fonctionnalités

### Authentification et utilisateurs

- Connexion avec l'API DummyJSON
- Sauvegarde du token dans le localStorage
- Déconnexion
- Annuaire des utilisateurs
- Affichage du profil de l'utilisateur connecté
- Protection des routes privées

### Recettes

- Affichage des recettes sur la page d'accueil
- Affichage du nom, de l'image et des temps de préparation et de cuisson
- Page détaillée d'une recette
- Affichage des ingrédients
- Affichage des instructions

### Favoris

- Ajout d'une recette aux favoris
- Retrait d'une recette des favoris
- Gestion des favoris avec Redux
- Page dédiée aux favoris
- Accès aux détails des recettes depuis les favoris
- Page des favoris protégée

### Blog

- Liste des articles
- Page détaillée d'un article
- Affichage des tags, réactions et vues
- Création d'un article
- Suppression d'un article
- Affichage des commentaires
- Ajout d'un commentaire
- Suppression d'un commentaire
- Gestion des articles et commentaires avec Redux
- Mise à jour immédiate de l'interface après les actions

### Citation du jour

- Récupération des citations depuis l'API DummyJSON
- Du 1er au 30 du mois : citation correspondant au numéro du jour
- Le 31 du mois : sélection aléatoire d'une citation

### Navigation et interface

- Header présent sur les différentes pages
- Navigation entre les fonctionnalités
- Gestion des routes privées
- Gestion des erreurs 404
- Interface responsive
- Design CSS commun à l'application

---
## Répartition des tâches

### Mohamed
- Authentification
- Annuaire des utilisateurs
- Profil utilisateur
- Recettes
- Commentaires
- Citation du jour
- Header et navigation
- CSS et responsive

### Leyth
- Favoris avec Redux
- Page des favoris
- Ajout et retrait des favoris
- Routes privées
- Protection des accès
- Blog

## Technologies utilisées

- React
- TypeScript
- React Router
- Redux Toolkit
- React Redux
- Axios
- Vite
- CSS
- API DummyJSON
