# 🐝 Biologie des Abeilles — Guide pour le Simulateur

Ce document contient tout ce que tu dois savoir sur le fonctionnement réel d'une colonie d'abeilles pour créer un simulateur réaliste.

---

## 📊 Vue d'ensemble d'une colonie

Une colonie typique contient :
- **1 Reine** (peut vivre 2-7 ans)
- **20 000 - 80 000 Ouvrières** (vivent 6 semaines en été, 4-6 mois en hiver)
- **0 - 2 000 Faux-bourdons** (présents printemps/été uniquement)

---

## 👑 La Reine (Queen)

### Caractéristiques
| Propriété | Valeur |
|-----------|--------|
| Durée de développement | 16 jours (œuf → adulte) |
| Durée de vie | 2-7 ans (moyenne 2-3 ans) |
| Ponte maximale | Jusqu'à 2 000 œufs/jour en pic |
| Ponte annuelle | ~200 000 œufs/an |
| Vols de fécondation | 1-3 vols, s'accouple avec 10-20 mâles |

### Rôles
1. **Ponte** — Seule femelle fertile de la colonie
2. **Phéromones** — Émet la "phéromone royale" (QMP) qui :
   - Inhibe le développement ovarien des ouvrières
   - Maintient la cohésion sociale
   - Attire les mâles pendant le vol nuptial
   - Signal la présence/santé de la reine

### Variables à simuler
```
- age: number (jours)
- fertility: number (décline avec l'âge)
- pheromoneStrength: number (décline avec l'âge)
- isVirgin: boolean (avant fécondation)
- spermCount: number (stock de sperme, diminue à chaque ponte)
- eggsLaidToday: number
- health: number
```

### Événements liés à la reine
- **Mort de la reine** → Les ouvrières créent des cellules royales d'urgence
- **Reine vieillissante** → Phéromones faibles → Risque d'essaimage
- **Supersédure** — Remplacement naturel d'une reine défaillante

---

## 👷 Les Ouvrières (Workers)

### Caractéristiques
| Propriété | Valeur |
|-----------|--------|
| Durée de développement | 21 jours (œuf → adulte) |
| Durée de vie (été) | 5-7 semaines |
| Durée de vie (hiver) | 4-6 mois |
| Sexe | Femelle (non fertile) |

### 🔄 Polyéthisme temporel (Division du travail par âge)

C'est LE concept central de ton simulateur. Les ouvrières changent de tâche selon leur âge :

| Âge (jours) | Rôle | Tâches |
|-------------|------|--------|
| 0-2 | **Nettoyeuse** | Nettoie les cellules, se prépare |
| 3-5 | **Nourrice (couvain)** | Nourrit les larves avec gelée royale/pollen |
| 6-11 | **Nourrice (reine)** | Nourrit et soigne la reine |
| 12-17 | **Cirière/Bâtisseuse** | Produit de la cire, construit les rayons |
| 12-17 | **Manutentionnaire** | Stocke nectar/pollen, évapore le nectar |
| 18-21 | **Ventileuse** | Régule température/humidité |
| 18-21 | **Gardienne** | Protège l'entrée de la ruche |
| 21+ | **Butineuse** | Récolte nectar, pollen, eau, propolis |

### ⚠️ Plasticité comportementale

**IMPORTANT pour le simulateur :** Cette progression n'est PAS rigide !

- Si manque de nourrices → des butineuses RÉGRESSENT pour devenir nourrices
- Si manque de butineuses → des jeunes abeilles ACCÉLÈRENT leur maturation
- Le ratio est régulé par les besoins de la colonie

**Mécanisme :** Hormone juvénile (JH) + Vitellogénine
- JH élevée = transition vers butineuse
- Vitellogénine élevée = reste nourrice

### Variables à simuler pour chaque ouvrière
```
- age: number (jours)
- role: WorkerRole (enum basé sur l'âge ET les besoins)
- health: number
- juvenileHormone: number (influence le rôle)
- vitellogenin: number (influence le rôle)
- fatBodies: number (réserves pour l'hiver)
- foragingExperience: number (améliore l'efficacité)
- knownFoodSources: FoodSource[] (mémoire des lieux)
```

---

## 🔵 Les Faux-bourdons (Drones)

### Caractéristiques
| Propriété | Valeur |
|-----------|--------|
| Durée de développement | 24 jours (œuf → adulte) |
| Durée de vie | ~90 jours max |
| Sexe | Mâle (haploïde) |
| Capacités | Pas de dard, ne butine pas, ne produit pas de cire |

### Rôle unique
- **Reproduction** — S'accouplent avec des reines vierges d'AUTRES colonies
- **Thermorégulation** — Participent au chauffage du couvain

### Cycle annuel
- **Printemps** → Production de mâles commence
- **Été** → Population maximale (quelques centaines à 2000)
- **Automne** → **Expulsion des mâles** (les ouvrières les chassent/tuent)
- **Hiver** → Aucun mâle dans la ruche

### Variables à simuler
```
- age: number
- maturity: boolean (mature sexuellement vers 12 jours)
- health: number
- hasFlownToday: boolean (vols de fécondation l'après-midi)
```

---

## 🥚 Cycle de développement (Couvain)

### Stades de développement

| Stade | Durée Reine | Durée Ouvrière | Durée Mâle |
|-------|-------------|----------------|------------|
| Œuf | 3 jours | 3 jours | 3 jours |
| Larve | 5 jours | 6 jours | 7 jours |
| Nymphe | 8 jours | 12 jours | 14 jours |
| **TOTAL** | **16 jours** | **21 jours** | **24 jours** |

### Détermination du sexe et de la caste

```
Œuf fécondé (diploïde) → Femelle
  └── Nourriture normale → Ouvrière
  └── Gelée royale abondante → Reine

Œuf non fécondé (haploïde) → Mâle (faux-bourdon)
```

### Variables pour le couvain
```
- stage: 'egg' | 'larva' | 'pupa'
- daysInStage: number
- caste: 'worker' | 'queen' | 'drone'
- isFertilized: boolean
- fedRoyalJelly: boolean (détermine reine vs ouvrière)
- health: number
- temperature: number (critique pour le développement)
```

---

## 🍯 Ressources de la colonie

### Types de ressources

| Ressource | Origine | Utilisation | Stockage |
|-----------|---------|-------------|----------|
| **Nectar** | Fleurs | Transformé en miel | Cellules (non operculées) |
| **Miel** | Nectar déshydraté | Énergie (glucides) | Cellules operculées |
| **Pollen** | Fleurs | Protéines (couvain) | Cellules = "pain d'abeille" |
| **Eau** | Sources diverses | Dilution miel, thermorégulation | Non stockée |
| **Propolis** | Résine d'arbres | Antiseptique, colmatage | Utilisée directement |
| **Cire** | Glandes des ouvrières | Construction rayons | Rayons |

### Consommation

**Une colonie consomme par an :**
- ~120 kg de miel
- ~20-30 kg de pollen
- Des litres d'eau (variable selon climat)

**Une butineuse :**
- Fait 10-12 voyages/jour
- Rapporte ~40 mg de nectar ou ~15 mg de pollen par voyage
- Visite 50-1000 fleurs par voyage

### Variables à simuler
```
interface Resources {
  nectar: number;        // grammes
  honey: number;         // grammes (1 cadre plein ≈ 2-3 kg)
  pollen: number;        // grammes
  water: number;         // ml (besoin quotidien)
  propolis: number;      // grammes
  wax: number;           // grammes disponibles
  comb: number;          // nombre de cellules construites
}
```

---

## 💬 Communication

### 1. La Danse frétillante (Waggle Dance)

C'est le système de communication le plus fascinant !

**Quand :** Une butineuse a trouvé une source de nourriture intéressante

**Comment ça marche :**
```
Direction = Angle entre le soleil et la source
            (traduit en angle par rapport à la verticale sur le rayon)

Distance = Durée de la phase frétillante
           (1 seconde ≈ 1 km)

Qualité = Intensité/enthousiasme de la danse
```

**À simuler :**
```
interface WaggleDance {
  direction: number;      // angle en degrés
  distance: number;       // mètres
  duration: number;       // secondes de frétillement
  quality: number;        // "enthousiasme" 0-1
  foodSource: FoodSource;
  followers: Worker[];    // abeilles recrutées
}
```

### 2. Les Phéromones

| Phéromone | Émetteur | Effet |
|-----------|----------|-------|
| **QMP (Queen Mandibular Pheromone)** | Reine | Cohésion, inhibe ovaires ouvrières |
| **Phéromone de couvain** | Larves | Stimule nourrices, inhibe ovaires |
| **Phéromone d'alarme** | Ouvrières (dard) | Alerte, agression collective |
| **Phéromone de Nasanov** | Ouvrières | Orientation, marquage entrée |
| **Phéromone de trace** | Butineuses | Marque les fleurs visitées |

### 3. Autres communications
- **Trophallaxie** — Échange de nourriture bouche-à-bouche (partage d'infos chimiques)
- **Vibrations** — Signaux sur les rayons
- **Sons** — "Piping" de la reine, "quacking" des reines en cellule

---

## 🌡️ Thermorégulation

### Températures critiques

| Zone | Température cible | Tolérance |
|------|-------------------|-----------|
| **Couvain** | 34-36°C | ±0.5°C (TRÈS strict) |
| **Grappe hivernale (centre)** | 20-25°C | - |
| **Grappe hivernale (surface)** | 8-10°C | - |

### Mécanismes

**Pour chauffer :**
- Contraction des muscles thoraciques (frissonnement)
- Regroupement sur le couvain

**Pour refroidir :**
- Ventilation (abeilles ventileuses à l'entrée)
- Évaporation d'eau (régurgitent de l'eau sur les rayons)
- Étalement de la grappe

### Impact sur le simulateur
```
- Température externe trop basse → Plus de consommation de miel
- Température externe trop haute → Risque de fonte des rayons
- Couvain mal thermorégulé → Malformations, mortalité
```

---

## 🦠 Maladies et Parasites

### 1. Varroa destructor (CRITIQUE)

Le pire ennemi des abeilles modernes.

| Propriété | Valeur |
|-----------|--------|
| Type | Acarien parasite |
| Cible | Couvain (reproduction) + adultes (alimentation) |
| Reproduction | Dans cellules de couvain operculé |
| Préférence | Couvain de mâles (plus long = plus de reproduction) |

**Cycle :**
1. Femelle varroa entre dans une cellule avant operculation
2. Se reproduit pendant le développement de la nymphe
3. Sort avec l'abeille adulte
4. Se nourrit de l'hémolymphe (sang) et du corps gras

**Effets :**
- Affaiblit les abeilles
- Transmet des virus (DWV = ailes déformées)
- Raccourcit la durée de vie
- Effondrement de la colonie si non traité

**À simuler :**
```
interface VarroaMite {
  age: number;
  location: 'phoretic' | 'reproductive'; // sur abeille ou dans cellule
  hostBee?: Bee;
  hostCell?: BroodCell;
  offspring: number;
}

// Taux d'infestation critique : >3 varroas / 100 abeilles = danger
```

### 2. Nosema (Nosema apis / N. ceranae)

| Propriété | Valeur |
|-----------|--------|
| Type | Champignon microsporidien |
| Cible | Intestin des abeilles adultes |
| Transmission | Spores dans les fèces |
| Effet | Dysenterie, durée de vie réduite, mauvaise digestion |

### 3. Loque américaine (American Foulbrood)

| Propriété | Valeur |
|-----------|--------|
| Type | Bactérie (Paenibacillus larvae) |
| Cible | Larves |
| Gravité | TRÈS grave, colonie souvent détruite |
| Signe | Larves mortes, odeur de pourriture |

### 4. Autres menaces
- **Loque européenne** (bactérie, moins grave)
- **Petit coléoptère de la ruche** (Aethina tumida)
- **Fausse teigne** (Galleria mellonella) — mange la cire
- **Virus** (DWV, ABPV, CBPV, etc.)
- **Pesticides** (néonicotinoïdes notamment)

---

## 🌸 Saisonnalité

### Printemps (Mars-Mai)

| Événement | Détail |
|-----------|--------|
| Reprise de ponte | La reine recommence à pondre massivement |
| Développement colonie | Population explose |
| Premières fleurs | Saule, pissenlits, arbres fruitiers |
| Risque d'essaimage | Colonies fortes peuvent essaimer |
| Production de mâles | Commence |

### Été (Juin-Août)

| Événement | Détail |
|-----------|--------|
| Pic de population | 40 000 - 80 000 abeilles |
| Miellée principale | Selon flore locale |
| Essaimage | Période principale |
| Fin des mâles | Expulsion fin août |

### Automne (Sept-Nov)

| Événement | Détail |
|-----------|--------|
| Réduction ponte | La reine ralentit |
| Abeilles d'hiver | Production d'ouvrières à longue durée de vie |
| Constitution réserves | Stockage intensif de miel |
| Expulsion mâles | Les ouvrières chassent les mâles |

### Hiver (Déc-Fév)

| Événement | Détail |
|-----------|--------|
| Grappe hivernale | Abeilles se regroupent en boule |
| Pas de couvain | Ou très peu |
| Consommation réserves | ~1-2 kg miel/mois |
| Mortalité hivernale | Période critique |

---

## 🐝 Essaimage (Swarming)

### C'est quoi ?
La reproduction de la COLONIE (pas des individus). La vieille reine part avec ~50% des ouvrières.

### Déclencheurs
1. Colonie trop forte (surpopulation)
2. Reine vieillissante (phéromones faibles)
3. Manque d'espace
4. Printemps favorable

### Séquence
1. Ouvrières construisent des cellules royales (10-20)
2. Reine pond dedans
3. ~1 semaine avant éclosion des nouvelles reines, l'ancienne part
4. **Essaim primaire** : vieille reine + 50% des ouvrières
5. Essaims secondaires possibles avec reines vierges

### À simuler
```
interface SwarmEvent {
  triggerFactors: {
    populationDensity: number;  // trop élevée
    queenPheromone: number;     // trop faible
    queenCellsBuilt: number;    // cellules royales présentes
  };
  departingBees: Worker[];
  departingQueen: Queen;
  remainingBees: Worker[];
  newQueens: Queen[];  // qui vont se battre
}
```

---

## 📈 Variables environnementales à simuler

### Météo
```
interface Weather {
  temperature: number;        // °C
  humidity: number;           // %
  precipitation: boolean;     // pluie = pas de vol
  windSpeed: number;          // km/h (>30 = pas de vol)
  cloudCover: number;         // % (affecte navigation)
  dayLength: number;          // heures de jour
}
```

### Flore
```
interface FlowerPatch {
  position: { x: number, y: number };
  distance: number;           // depuis la ruche
  nectarQuantity: number;     // disponible
  nectarQuality: number;      // concentration en sucre
  pollenQuantity: number;
  pollenQuality: number;      // teneur en protéines
  flowerCount: number;
  bloomStart: Date;
  bloomEnd: Date;
  isKnownByColony: boolean;
}
```

### Prédateurs
- Guêpes, frelons (surtout frelon asiatique)
- Oiseaux (guêpiers)
- Souris (en hiver, entrent dans la ruche)
- Ours (dans certaines régions)

---

## 🎮 Résumé pour le simulateur

### Entités principales
1. **Colony** — Conteneur global
2. **Queen** — Une par colonie
3. **Worker** — Milliers, avec rôles dynamiques
4. **Drone** — Saisonniers
5. **Brood** — Œufs, larves, nymphes
6. **Resources** — Miel, pollen, nectar, eau, cire
7. **Comb** — Structure physique (cellules)
8. **VarroaMite** — Parasites (optionnel mais réaliste)

### Systèmes à implémenter
1. **Cycle de vie** — Naissance, vieillissement, mort
2. **Division du travail** — Polyéthisme temporel + plasticité
3. **Ressources** — Collecte, stockage, consommation
4. **Communication** — Danse, phéromones
5. **Thermorégulation** — Chauffage/refroidissement
6. **Reproduction** — Ponte, essaimage
7. **Saisonnalité** — Cycle annuel
8. **Maladies** — Varroa, virus, etc. (optionnel)
9. **Environnement** — Météo, flore, prédateurs

### Paramètres de simulation suggérés
```
interface SimulationConfig {
  ticksPerDay: number;        // ex: 24 (1 tick = 1 heure)
  startDate: Date;
  startingSeason: Season;
  initialWorkers: number;     // ex: 10000
  initialDrones: number;      // ex: 0 (hiver) ou 200 (été)
  initialResources: Resources;
  weatherModel: 'static' | 'random' | 'realistic';
  diseasesEnabled: boolean;
  swarmingEnabled: boolean;
}
```

---

## 📚 Sources

- [PerfectBee - The Honeybee Lifecycle](https://www.perfectbee.com/beekeeping-articles/honey-bee-life-cycle)
- [PMC - Bee++ Simulator](https://pmc.ncbi.nlm.nih.gov/articles/PMC5371959/)
- [PlanetBee - The Three Castes](https://www.planetbee.org/post/the-three-castes-of-honey-bees-and-their-vital-roles-in-the-hive)
- [UF/IFAS - Tasks and Duties of Worker Bees](https://blogs.ifas.ufl.edu/miamidadeco/2022/08/22/tasks-and-duties-throughout-the-life-cycle-of-a-worker-honey-bee/)
- [PMC - Division of labor in honeybees](https://pmc.ncbi.nlm.nih.gov/articles/PMC2810364/)
- [Science Advances - Waggle Dance Research](https://www.science.org/doi/10.1126/sciadv.aat0450)
- [Nature - Foraging distances and waggle dance](https://www.nature.com/articles/s42003-024-06987-9)
- [Scientific Beekeeping - Varroa Research](https://scientificbeekeeping.com/a-test-of-thermal-treatment-for-varroa-part-1/)
- [Wiley - BEEHAVE Model for Varroa simulation](https://onlinelibrary.wiley.com/doi/full/10.1002/ece3.9456)

---

*Document créé pour le projet Simulateur de Ruche — 100 Jours Challenge*