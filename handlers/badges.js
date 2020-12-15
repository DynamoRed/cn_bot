const {readdirSync, read} = require('fs');
const ascii = require('ascii-table');
let table = new ascii("Badges");
table.setHeading("Name", "Category", "Load Status", "Directory");
module.exports = (bot) => {
    readdirSync('./badges/').forEach( dir => {
        const badges = readdirSync(`./badges/${dir}`).filter(file => file.endsWith('.js'));
        for(let file of badges){
            let pull = require(`../badges/${dir}/${file}`);
            if(pull.id){
                bot.badges.set(pull.id, pull);
                table.addRow(pull.id, pull.category, '✅', `./resources/badges/${dir}/${pull.id}.png`);
            } else {
                table.addRow(file, '-----', '❌ -> Missing id or id is incorrect', '-----');
                continue;
            }
        }
    })
    console.log(table.toString());
}