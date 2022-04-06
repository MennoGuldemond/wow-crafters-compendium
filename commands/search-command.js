const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment } = require('discord.js');
const DriveReader = require('../drive-reader');
const MessageBuilder = require('../utils/message-builder');

const hordeImage = new MessageAttachment('./assets/Horde.png');
const allianceImage = new MessageAttachment('./assets/Alliance.png');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Returns the a list of crafters for a given recipe name')
    .addStringOption((option) => option.setName('item').setDescription('Enter an item name')).setRequired(true)),
  async execute(interaction) {
    let factionName;
    if (interaction.channelId === process.env.ALLIANCE_CHANNEL_ID) {
      factionName = 'alliance';
    } else if (interaction.channelId === process.env.HORDE_CHANNEL_ID) {
      factionName = 'horde';
    }

    if (factionName) {
      const itemName = interaction.options.getString('item');
      if (!itemName) {
        return await interaction.reply('Please provide an item to search for.');
      }

      DriveReader.getData(factionName)
        .catch((err) => {
          console.error(err);
        })
        .then(async (data) => {
          const matches = data.filter((x) => {
            if (x.item) {
              return x.item.toLowerCase().includes(itemName.toLowerCase());
            }
          });

          const isHorde = factionName.toLowerCase() === 'horde';

          if (matches.length === 1) {
            const embed = MessageBuilder.createFoundEmbed(isHorde, itemName, matches[0].crafters);
            return await interaction.reply({ embeds: [embed], files: [isHorde ? hordeImage : allianceImage] });
          } else if (matches.length > 1) {
            const embed = MessageBuilder.createMultipleEmbed(isHorde, itemName, matches);
            return await interaction.reply({ embeds: [embed], files: [isHorde ? hordeImage : allianceImage] });
          } else {
            return await interaction.reply(
              'Item could not be found.\nCheck your spelling or try searching for part of the name.'
            );
          }
        });
    }
  },
};
