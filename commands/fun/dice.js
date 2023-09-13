const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dice")
    .setDescription("1부터 99까지의 랜덤 다이스를 굴려보세요!"),

  async execute(interaction) {
    const randomNumber = Math.floor(Math.random() * 99) + 1;
    await interaction.reply(`다이스 값 : ${randomNumber}`);
  },
};
