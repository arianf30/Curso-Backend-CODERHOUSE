const knex = require('knex');

class Contenedor{
    constructor(config, table){
        this.table = table;
        this.conexion = knex(config)
    }

    // FUNCIÓN PARA GUARDAR
    async save(producto) {
        try {
            const data = await this.conexion(this.table).insert(producto);
            return data.id
        } catch ( error ) {
            console.log('error: ', error); throw error;
        } finally {
            /* knex.destroy(); */
        }
    }

    // FUNCIÓN PARA EDITAR
    async edit(producto) {
        try {
            const data = await this.conexion(this.table)
                .where({ id: producto.id })
                .update(producto);
            return data.id;
        } catch ( error ) {
            console.log('error: ', error);
        }
    }

    // FUNCIÓN PARA RETORNAR UN ID ESPECÍFICO
    async getById(id) {
        try {
            const data = await this.conexion.from(this.table)
                .select('*')
                .where('id', '=', id);
            if (data.length === 0) {
                return null;
            } else {
                return data[0];
            }
        }
        catch (error) {
            console.log('error: ', error);
        }
    }
    
    // FUNCIÓN PARA RETORNAR TODOS LOS PRODUCTOS
    async getAll() {
        try {
            const data = await this.conexion.from(this.table)
                .select('*');
            return data;
        }
        catch (error) {
            console.log('error: ', error);
        }
    }

    // FUNCIÓN PARA BORRAR UN PRODUCTO SEGÚN ID
    async deleteById(id) {
        try {
            await this.conexion(this.table)
                .where({ id: id })
                .del();
            
            return 'Eliminado correctamente.';
        }
        catch (error) {
            console.log('error: ', error);
        }
    }

    // FUNCIÓN PARA BORRAR TODOS LOS OBJETOS
    async deleteAll() {
        try {
            await this.conexion(this.table)
                .del();
            
            return 'Eliminado correctamente.';
        }
        catch (error) {
            console.log('error: ', error);
        }
    }
}

module.exports = Contenedor;