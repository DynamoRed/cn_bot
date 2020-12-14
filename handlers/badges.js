const {readdirSync, read} = require('fs');
const ascii = require('ascii-table');
let table = new ascii("Badges");
table.setHeading("Name", "Category", "Load Status");
module.exports = (bot) => {
    readdirSync('./resources/badges/').forEach( dir => {
        const badges = readdirSync(`./resources/badges/${dir}`).filter(file => file.endsWith('.png'));
        for(let file of badges){
            bot.badges.set(file.replace(".png", ""));
            table.addRow(file.replace(".png", ""), dir, '✅');
        }
    })
    console.log(table.toString());
}