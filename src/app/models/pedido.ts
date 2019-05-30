export class Pedido {
    skey: string;
    pedidos: [
        {
            skey_ped: string;
            user: string;
            productos:[
                {
                    skey_prod: string;
                    cantidad: number;
                }
            ];
            total: number;
            fecha: string;
        }
    ];
    status: string;
}
