const { SlashCommandBuilder } = require("discord.js");

const raidMessage = {};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time")
    .setDescription("현재 시간을 알아보세요!"),

  async execute(interaction) {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    let hours = now.getHours();
    const period = hours < 12 ? "오전" : "오후";
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
    }
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const dayName = days[now.getDay()];

    const formattedTime = `${year}년 ${month}월 ${day}일 (${dayName}) ${period} ${hours} : ${minutes} : ${seconds}`;

    await interaction.reply(`현재 시간은 ${formattedTime} 입니다.`);
  },
};
