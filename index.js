const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

client.once(Events.ClientReady, (c) => {
  console.log(`✅ ${c.user.tag} is Ready!`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

//   console.log(`✅ ${c.user.tag} is online.`);

//   const ping = new SlashCommandBuilder()
//     .setName("ping")
//     .setDescription("This is ping command");

//   client.application.commands.create(ping);

//   const gae = new SlashCommandBuilder()
//     .setName("gae")
//     .setDescription("This is gae command");

//   client.application.commands.create(gae);
// });

// client.on("interactionCreate", (interaction) => {
//   if (!interaction.isChatInputCommand()) return;

//   if (interaction.commandName === "gae") {
//     return interaction.reply("Duck!");
//   }

//   if (interaction.commandName === "ping") {
//     return interaction.reply("Pong!");
//   }
// });

client.login(process.env.TOKEN);
