class Usuario{
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `El nombre y apellido del usuario es: ${this.nombre} ${this.apellido}`;
    }

    addMascota(nuevaMascota) {
        this.mascotas.push(nuevaMascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombreLibro, autorLibro) {
        this.libros.push({ nombre: nombreLibro, autor: autorLibro });
    }

    getBookNames() {
        const nombresLibros = this.libros.map((item) => { return item.nombre });
        return nombresLibros;
    }
}

const usuarioArian = new Usuario('Arián Noel', 'Fernández', [{ nombre: 'El club del crimen de los jueves', autor: 'Richard Osman' }], ['Alma']);

console.log('Estado inicial del usuario:');
console.log(usuarioArian);

// Añadir mascotas
usuarioArian.addMascota('Toto');
usuarioArian.addMascota('Luna');

// Añadir libro
usuarioArian.addBook('Los Vencejos', 'Fernando Aramburu');
usuarioArian.addBook('¿Quién eres?', 'Megan Maxwell');
usuarioArian.addBook('Fuertes, libres y nómadas', 'Elsa Punset');

// Imprimir nombre completo
console.log(usuarioArian.getFullName());

// Imprimir cantidad de mascotas
console.log(usuarioArian.countMascotas());

// Imprimir nombres de los libros
console.log(usuarioArian.getBookNames());


console.log('Estado final del usuario:');
console.log(usuarioArian);