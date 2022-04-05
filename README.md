[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

# Wow Crafters Compendium Discord bot

A Discord bot that uses google sheets to return crafters for wow items.

## Getting started

1. run 'npm install'
1. open https://developers.google.com/sheets/api/quickstart/nodejs and click the button 'Enable the Google Sheets API'
1. Follow the steps to generate a credentials.json file and replace it with the one in the project (or add it to the root if there is none).
1. run 'node generate-token.js' and follow the steps to create a token.json file.
1. run 'node deploy-commands.js' to deploy the commands for the bot
1. Add a .env file to the root with the following properties:
   - BOT_TOKEN=
   - GUILD_ID=
   - CLIENT_ID=
   - HORDE_SPREADSHEET_ID=
   - ALLIANCE_SPREADSHEET_ID=
1. run 'node mc-bot.js' to start the bot.
