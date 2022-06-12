# Budget Tracker - PWA Update
An update to an existing budget tracker application to allow for offline access and functionality.

## Use  
The user will be able to add expenses and deposits to their budget with or without a connection. If the user enters transactions offline, the total will be updated when they're brought back online. This application was deployed to and hosted on Heroku.

## Live Site Access
https://calm-falls-17749.herokuapp.com/ 

## Acceptance Criteria
- [x] When the user inputs an expense or deposit then they will receive a notification that they have added an expense or deposit
- [x] When the user reestablishes an internet connection then the deposits or expenses added while they were offline are added to their transaction history and their totals are updated

## Demo Screenshot
![pwa demo screenshot](/public/img/Live-Screenshot-pwa.jpg)

## Functionality
 - IndexedDB adds offline functionality
 - NoSQL MongoDB backend database 
 - Service Worker application
 - Manifest.json : name, short_name, icons, theme_color, background_color, start_url, display

## Credit
The assignment and initial code was presented by the UC Berkeley Coding Bootcamp Team.
