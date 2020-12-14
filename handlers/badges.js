const {readdirSync, read} = require('fs');
const ascii = require('ascii-table');
let table = new ascii("Badges");
table.setHeading("Name", "Category", "Load Status");
module.exports = (bot) => {
    readdirSync('./resources/badges/').forEach( dir => {
        const commands = readdirSync(`./resources/badges/${dir}`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../resources/badges/${dir}/${file}`);
            if(pull.name){
                bot.badges.set(pull.name, pull);
                table.addRow(file, pull.category, '✅');
            } else {
                table.addRow(file, '-----', '❌ -> Missing name or name is incorrect');
                continue;
            }
        }
    })
    console.log(table.toString());
}