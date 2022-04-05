const { MessageEmbed } = require('discord.js');

module.exports = {
  createFoundEmbed: function (isHorde, itemName, crafters) {
    const crafterString = crafters?.length ? crafters.split(',').join('\n') : 'No crafters currently make this item';
    const imagePath = isHorde ? 'attachment://Horde.png' : 'attachment://Alliance.png';

    return new MessageEmbed()
      .setTitle(itemName)
      .addFields({
        name: 'crafters',
        value: `${crafterString}`,
      })
      .setThumbnail(imagePath)
      .setTimestamp();
  },
  createMultipleEmbed: function (isHorde, itemName, matches) {
    const imagePath = isHorde ? 'attachment://Horde.png' : 'attachment://Alliance.png';
    let matchesText = '';
    matches.forEach((match) => {
      matchesText += `${match.item}\n`;
    });

    return new MessageEmbed()
      .setTitle(`Multiple matches for: ${itemName}`)
      .addFields({
        name: 'Are you looking for one these?',
        value: `${matchesText}`,
        inline: true,
      })
      .setThumbnail(imagePath)
      .setTimestamp();
  },
};
