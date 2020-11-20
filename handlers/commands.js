const {readdirSync, read} = require('fs');
const ascii = require('ascii-table');
let table = new ascii("Commands");
table.setHeading("Commands", "Category", "Load Status", "Aliases");
module.exports = (bot) => {
    readdirSync('./commands/').forEach( dir => {
        const commands = readdirSync(`./commands/${dir}`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name){
                bot.commands.set(pull.name, pull);
                table.addRow(file, pull.category, '✅', pull.aliases);
            } else {
                table.addRow(file, '-----', '❌ -> Missing name or name is incorrect', "-----");
                continue;
            }
            if(pull.aliases && Array.isArray(pull.aliases)){
                pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name));
            }
        }
    })
    console.log(table.toString());
}