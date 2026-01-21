# 🐝 Bee Hive Simulator

Un simulateur réaliste de colonie d'abeilles développé en TypeScript avec Bun. Ce projet éducatif simule le comportement complexe d'une ruche, incluant la hiérarchie sociale, le cycle de vie, la division du travail et l'impact des saisons.

### Concepts simulés

- **Hiérarchie sociale** : Reine, ouvrières, faux-bourdons
- **Cycle de vie** : Naissance, développement, maturation, vieillissement, mort
- **Polyéthisme temporel** : Division du travail basée sur l'âge des ouvrières
- **Ressources** : Nectar, pollen, miel, cire, eau, propolis
- **Saisons** : Impact sur le comportement et la survie de la colonie
- **Événements** : Essaimage, maladies, prédateurs, supersédure

## 🛠️ Stack Technique

| Catégorie | Technologie | Objectif |
|-----------|------------|----------|
| **Runtime** | [Bun](https://bun.sh) | Runtime JavaScript ultra-rapide |
| **Langage** | TypeScript | Typage statique et sécurité |
| **Validation** | Zod | Validation de schémas |
| **API** | Hono | Framework web léger et rapide |
| **Base de données** | PostgreSQL + Prisma | Persistance et ORM |
| **Cache/Queue** | Redis + BullMQ | Cache et gestion des tâches |
| **Infra** | Docker | Conteneurisation |

## 📦 Installation

### Prérequis

- [Bun](https://bun.sh) v1.1.44 ou supérieur

### Installation des dépendances

```bash
bun install
```

## 🚀 Démarrage

### Mode développement

```bash
bun run index.ts
```

Le serveur démarre sur `http://localhost:3000`

## 📁 Structure du projet

```
bee-hive-simulator/
├── src/
│   ├── core/          # Logique métier centrale
│   ├── models/        # Modèles de données
│   └── types/         # Définitions TypeScript
├── docs/
│   ├── bee_guide.md   # Documentation biologique détaillée
│   ├── bee_guide.pdf  # Version PDF du guide
├── index.ts           # Point d'entrée de l'application
└── package.json
```

## 🐝 Concepts Biologiques

Le simulateur s'appuie sur des données biologiques réelles :

### Les Ouvrières (Workers)
- **Durée de vie** : 5-7 semaines (été) / 4-6 mois (hiver)
- **Polyéthisme temporel** : Changement de rôle selon l'âge
  - 0-2 jours : Nettoyeuses
  - 3-11 jours : Nourrices
  - 12-17 jours : Cirières/Manutentionnaires
  - 18-21 jours : Ventileuses/Gardiennes
  - 21+ jours : Butineuses

### La Reine (Queen)
- **Durée de vie** : 2-7 ans
- **Ponte** : Jusqu'à 2000 œufs/jour
- **Phéromones** : Régule la cohésion sociale

### Les Faux-bourdons (Drones)
- **Rôle** : Reproduction uniquement
- **Cycle annuel** : Présents printemps/été, expulsés en automne

## 👨‍💻 Auteur

**Francoisdotdev**


## 📄 Licence

Ce projet est entièrement Open Source.