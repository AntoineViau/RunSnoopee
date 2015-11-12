# RunSnoopee

## Présentation
RunSnoopee est le projet qui a gagné le startup week-end du 13/15 mars 2015 à Rennes.   
Il s'agit de mettre en relation les propriétaires de chiens avec des coureurs qui ne veulent plus faire leur jogging en solo.  
Il est devenu par la suite [MyDjogg](http://www.mydjogg.com).

Ce projet est la version MVP (Minimum Viable Product) qui a été produite dans la foulée du startup week-end.  
On peut s'inscrire au service (notamment par Facebook), remplir son profil (avec photos), effectuer des recherches avec critères et géolocalisées, et envoyer des messages via la messagerie interne.  
L'application est totalement SPA (Single Page Application) et "presque" intégralement responsive.

Une version de démo est disponible à cette adresse : [http://runsnoopee.antoineviau.com](http://runsnoopee.antoineviau.com)  

Il est basé sur :
 * AngularJS pour front-end
 * Parse.com (MongoDB-like en mode SaaS) par le back-end
 * Facebook Login API pour l'authentification
 * Google Maps
 * Here.com pour le géocoding
 * [Flatboard](http://wrapbootstrap.com/preview/WB0G434G7) pour le design
 * Gulp pour le build

## Installation
Prérequis : 
  * Git, Node et Npm.
  * Un compte Facebook avec une application configurée
  * Un compte Parse  avec une application configurée
  * Un compte here.com

Mettre en place les variables shell suivantes dans le même environnement (terminal) que Gulp : 

    FACEBOOK_APPID
    PARSE_APPID
    PARSE_RESTAPIKEY
    GEOCODER_APPID
    GEOCODER_APPCODE

Cloner le dépôt : 

    git clone https://github.com/AntoineViau/RunSnoopee.git

Installer les paquets Npm : 

    npm install

Lancer le build : 

    gulp build-dev

On peut lancer le build en release (concaténation, compression...) avec :

    gulp build-release

Servir l'application qui est disponible dans www : 

    npm run serve

Il ne reste plus qu'à aller sur le serveur local avec le navigateur.

