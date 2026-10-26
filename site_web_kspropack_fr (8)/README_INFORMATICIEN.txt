================================================================================
KS PRO PACK - GUIDE DE DÉPLOIEMENT EN PRODUCTION (OVHcloud)
Site Internet Officiel : www.kspropack.fr
================================================================================

Date de livraison : Juin 2026
Client : Société KS PRO PACK
Activité : Fabrication d'étiquettes adhésives, rubans transfert thermique & emballage
Slogan officiel : « Chaque colis mérite son étiquette ! »
Siège social : 2 rue de la clairière, 49230 Sèvremoine (Maine-et-Loire)
Téléphone direct : 07 89 68 86 36
Email commercial : alexandra@kspropack.fr


1. PRÉSENTATION DE L'ARCHIVE LIVRÉE
--------------------------------------------------------------------------------
Le présent package constitue le site web complet, autonome et prêt pour mise en
ligne immédiate sur tout hébergement OVHcloud (mutualisé, VPS ou serveur dédié).

Contenu de l'arborescence :
/tmp/kspropack_website/
├── index.html                 -> Page d'accueil (Hero, chiffres clés, solutions, devis express, FAQ)
├── produits.html              -> Catalogue solutions & produits avec filtres dynamiques
├── catalogue-48h.html         -> Page stock 48h (téléchargement PDF 27p + table interactive best-sellers)
├── contact.html               -> Page de contact, localisation, demande de devis express & étude technique
├── css/
│   └── style.css              -> Feuille de style CSS3 moderne, responsive (mobile, tablette, desktop)
├── js/
│   └── main.js                -> Scripts interactifs (menu burger mobile, filtres, recherche table, devis)
├── images/                    -> 18 images haute définition optimisées pour le web + logo officiel PNG/SVG
│   ├── logo-ks-pro-pack.png
│   ├── hero-banner.jpg
│   ├── ks-pro-pack-chaque-colis-merite-son.jpg
│   ├── etiquettes-et-emballages-de-qualite-superieure.jpg
│   ├── impression-d-etiquettes-logistiques-modernes.jpg
│   ├── ruban-adhesif-personnalise-pour-emballage-professionnel.jpg
│   ├── etiquettes-industrielles-resistantes-aux-produits-chimiques.jpg
│   ├── flacons-medicaux-tracabilite-et-conformite.jpg
│   ├── etiquettes-gourmandes-pour-produits-artisanaux.jpg
│   ├── elegance-artisanale-des-bouteilles-de-boissons.jpg
│   ├── etiquettes-de-luxe-pour-cosmetiques-et-produits-fins.jpg
│   ├── catalogue-48h-b2b-stock-ks-pro-pack.jpg
│   ├── catalogue-d-etiquettes-adhesives-best-sellers.jpg
│   ├── catalogue-de-solutions-d-etiquetage-et-d-emballage.jpg
│   ├── catalogue-stock-ks-pro-pack.jpg
│   ├── entrepot-logistique-moderne-et-efficace.jpg
│   ├── contact-et-devis-ks-pro-pack.jpg
│   ├── vitrine-web-reactive-ks-pro-pack.jpg
│   └── favicon.svg
├── pdf/
│   └── catalogue-stock-ks-pro-pack-2026.pdf -> Catalogue officiel (8.7 Mo)
├── favicon.svg                -> Favicon moderne au format SVG pour navigateurs et mobiles
├── .htaccess                  -> Configuration Apache OVH (redirection HTTPS, cache, compression, sécurité)
├── robots.txt                 -> Directives pour l'indexation par Google et moteurs de recherche
└── README_INFORMATICIEN.txt   -> La présente documentation de déploiement


2. PROCÉDURE DE DÉPLOIEMENT PAS-À-PAS SUR OVH (HÉBERGEMENT MUTUALISÉ)
--------------------------------------------------------------------------------
Les hébergements mutualisés d'OVH (Perso, Pro, Performance) utilisent un dossier
racine nommé "www" (ou équivalent configuré dans le Multisite).

Étape 1 : Connexion SFTP ou FTP à l'hébergement
- Ouvrez votre client FTP préféré (FileZilla, WinSCP, Cyberduck).
- Paramètres de connexion fournis par OVH (disponibles dans le mail d'installation
  ou l'espace client > Hébergement > FTP - SSH) :
  * Hôte : ftp.clusterXXX.hosting.ovh.net (remplacer par votre cluster)
  * Nom d'utilisateur : votre identifiant FTP (ex: kspropa)
  * Mot de passe : votre mot de passe FTP
  * Port : 21 (FTP) ou port 22 si le protocole SFTP/SSH est actif sur votre offre.

Étape 2 : Téléversement des fichiers
- Accédez au dossier racine web : généralement `/www/`
- IMPORTANT : Si un fichier `index.html` par défaut d'OVH ("Site en construction")
  ou un fichier placeholder est présent, supprimez-le ou renommez-le.
- Téléversez l'ensemble des fichiers et dossiers de l'archive directement à la
  racine de `/www/` de sorte que `index.html` se trouve exactement à `/www/index.html`.
- Veillez à conserver l'arborescence des dossiers (`css/`, `js/`, `images/`, `pdf/`).

Étape 3 : Activation du certificat SSL (HTTPS gratuit Let's Encrypt)
- Connectez-vous à l'Espace Client OVH (manager.ovh.com).
- Rendez-vous dans : "Web Cloud" > "Hébergements" > sélectionnez votre hébergement.
- Cliquez sur l'onglet "Multisite".
- Sur les lignes correspondant à `kspropack.fr` et `www.kspropack.fr` :
  * Cliquez sur les trois petits points à droite > "Modifier le domaine".
  * Cochez "Activer le SSL" et vérifiez que le dossier racine pointe bien vers `www`.
  * Validez la modification.
- En haut à droite du tableau Multisite, cliquez sur "Actions" > "Régénérer le certificat SSL".
- Le certificat sera déployé et actif sous environ 15 à 30 minutes.
- Le fichier `.htaccess` fourni force automatiquement la redirection de tout le trafic
  HTTP non sécurisé vers HTTPS.

Étape 4 : Vérification de la Zone DNS
- Dans "Noms de domaine" > `kspropack.fr` > "Zone DNS" :
  * L'enregistrement `A` de `kspropack.fr` doit pointer vers l'adresse IPv4 de votre cluster OVH.
  * L'enregistrement `CNAME` de `www.kspropack.fr` doit pointer vers `kspropack.fr.`
  * Les enregistrements `MX` doivent pointer vers les serveurs de messagerie OVH (ex: `mx1.mail.ovh.net`, `mx2.mail.ovh.net`, etc.).


3. CONFIGURATION DES MESSAGERIES & FORMULAIRE DE CONTACT
--------------------------------------------------------------------------------
- Adresse email configurée sur le site : alexandra@kspropack.fr
- Le formulaire de contact sur `contact.html` et `index.html` dispose d'un système
  à double sécurité :
  1. En front-end (JavaScript) : validation des champs obligatoires (nom, société,
     téléphone, email), confirmation visuelle élégante à l'écran, et déclenchement
     instantané d'un email pré-rempli vers alexandra@kspropack.fr avec l'ensemble des
     champs structurés (référence, quantité, besoin, dimensions, volume estimé).
  2. Si vous souhaitez traiter les formulaires via un script PHP côté serveur :
     L'hébergement OVH supporte PHP nativement. Il vous suffit de remplacer l'attribut
     `action="mailto:..."` par un script PHP (ex: `action="contact-process.php"`)
     utilisant la fonction standard `mail()` de PHP autorisée sur OVH.


4. MISE À JOUR DU CATALOGUE PDF
--------------------------------------------------------------------------------
- Le catalogue officiel est stocké sous le chemin :
  `pdf/catalogue-stock-ks-pro-pack-2026.pdf`
- Lors d'une future mise à jour du catalogue (par exemple pour l'édition 2027),
  il suffit de téléverser le nouveau PDF au même emplacement en conservant le
  même nom de fichier, sans avoir à retoucher une seule ligne de code HTML.


5. POINTS TECHNIQUES & PERFORMANCE
--------------------------------------------------------------------------------
- Compatibilité W3C : HTML5 sémantique strict, accessible, sans frameworks lourds.
- Temps de chargement : site ultra-rapide (Vanilla JS pur et CSS natif, aucun
  chargement de dépendance externe bloquante type jQuery ou polices distantes lentes).
- SEO : Balises Title, Meta Description, OpenGraph et structure H1-H6 optimisées
  pour le référencement naturel sur les mots-clés : étiquettes adhésives, rubans
  transfert thermique, stock 48h, emballage personnalisé, Maine-et-Loire, Grand Ouest.
- Responsive Design : Testé sur écrans mobiles (375px/414px), tablettes (768px/1024px)
  et écrans larges de bureau (>1200px).


Pour toute question technique complémentaire, le service informatique ou le webmaster
peut s'appuyer sur la structure claire et documentée de l'ensemble des fichiers HTML/CSS/JS.
================================================================================
