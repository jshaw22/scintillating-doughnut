# Scintillating-Doughnut

Read the PRESS-RELEASE.MD. It'll rock your world. But in summary, we built this app because role delegation, voting, and clean-up/vote resets took up way too much unecessary time over lunch/dinner when time is too precious. 
> The Savory breakfast food have gotten sick and tired of taking a backseat to the sugary and sweet breakfast delights. They're disguising themselves as sweet, but are actually super salty underneath. Now it's up to the Mighty Scintillating Doughnut to prevent a breakfast table takeover.

## Team

  - __Product Owner__: Justin Shaw
  - __Scrum Master__: Kevin Weng
  - __Development Team Members__: Kris Albert Lee, Dakota Peel, Justin Shaw, Kevin Weng

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Avalon/Breakfast Game Rules and Basics]
1. [Contributing](#contributing)

## Usage


- npm install at root directory to install dependencies
- mongod to spin up database
- npm start to start server. This is esentially `node server/server.js` from root
- If you need a refresher or need to reference the Avalon game, see Avalon Game Rules and Basics section 

## Requirements

- All requirements and dependencies can be installed via 'npm install'
- Database: MongoDB
- Backend: Node/Express
- Front-End: AngularJS / Ionic for mobile
- Sockets with Socket.io

## Development
See [List of Features and their statuses](https://docs.google.com/spreadsheets/d/1hZFleg0Ch8ozMoGU2jeJO_pa8wD1_rQmuTdSgTEbGGM/edit#gid=0)

View open Git Issues [here](https://github.com/scintillating-doughnut/scintillating-doughnut/issues)


## Installing Dependencies

From within the root directory:

`sh
sudo npm install -g bower
npm install
`

## Avalon/Breakfast Game Rules and Basics

| Avalon Name | Breakfast Game Name    |
|-------------|------------------------|
| **Bad**     |                        |
| Assasin     | Egg-sassin             |
| Morgana     | Plain Bagel            |
| Mordred     | Chocolate Bacon        |
| Minion      | Sinister Sausage       |
|             |                        |
| **Good**    |                        |
| Merlin      | Scintillating Doughnut |
| Percival    | Perceiving Pancakes    |
| Servant     | Cereal                 |
| Servant     | Cinnamon Roll          |
| Servant     | Crepe                  |
| Servant     | Belgian Waffle         |

Also see the flowchart for gameflow. 

### Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.