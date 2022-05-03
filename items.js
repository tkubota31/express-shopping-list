const items = require("./fakeDb")

class Items {
    constructor(price,name){
        this.price = price;
        this.name = name;
        items.push(this)
    }

    static allItems(){
        return items;
    }
    static update(name, data) {
        let foundItem = Item.find(name);
        if (foundItem === undefined) {
          throw {message: "Not Found", status: 404}
        }
        foundItem.name = data.name;
        foundItem.price = data.price;

        return foundItem;
      }

      /** Find & return item with matching name. */

      static find(name) {
        const foundItem = items.find(v => v.name === name);
        if(foundItem === undefined){
          throw { message: "Not Found", status: 404 }
        }
        return foundItem
      }

      /** Remove item with matching id. */


      static remove(name) {
        let foundIdx = items.findIndex(v => v.name === name);
        if (foundIdx === -1) {
          throw {message: "Not Found", status: 404}
        }
        items.splice(foundIdx, 1);
      }
    }



module.exports = Items;
