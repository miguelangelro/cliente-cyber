export class Producto {
    _id?: string;
    nombre: string;
    valor: number;

    constructor(nombre: string, valor: number) {
        this.nombre = nombre;
        this.valor = valor;
    }
}

