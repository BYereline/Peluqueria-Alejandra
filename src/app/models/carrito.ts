export class Carrito {
    skey: string;
    user: string;
    productos: [
        {
            skey_prod: string;
            cantidad: number;
        }
    ];
    total: number;
    fecha: string;
}

