import knex from 'knex';

class DbContainer {
    constructor(config, tableName) {
        this.dbClient = knex(config);
        this.tableName = tableName;
    }

    async getAllItems() {
        return this.dbClient.from(this.tableName).select()
            .then(rows => { return rows; })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    getItemById(id) {
        this.dbClient.from(this.tableName).select().where('id', '=', id)
            .then((allItems) => { return allItems; })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    async add(item) {
        this.dbClient(this.tableName).insert(item)
            .then(() => { console.log('Data insertada'); })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    modifyItemById(id, newData) {
        this.dbClient.from(this.tableName).where('id', '=', id).update(newData)
            .then(() => { console.log('Registro actualizado'); })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    deleteItemById(id) {
        this.dbClient.from(this.tableName).where('id', '=', id).del()
            .then(() => { console.log('Registro borrado'); })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }
}

export default DbContainer