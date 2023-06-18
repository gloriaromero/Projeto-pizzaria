import prismaClient from "../../prisma";
import { DetailOrderService } from "./DetailOrderService";

interface OrderRequest {
  id_pedido: string;
}

class FinishOrderService {
  async execute({ id_pedido }: OrderRequest) {
    const detailOrderService = new DetailOrderService();
    const order = await detailOrderService.execute({ id_pedido });

    let subTotalOrder = [];
    let totalOrder = 0;

    order.Produtos.forEach((produto) => {
      let subtotal = produto.Quantidade * produto.produto.preco;
      totalOrder += subtotal;
      subTotalOrder.push({
        [produto.produto.nome]: {
          Quantidade: produto.Quantidade,
          Valor: produto.produto.preco,
          Subtotal: subtotal,
        },
      });
    });

    return { Total: totalOrder, Produtos: subTotalOrder };
  }
}

export { FinishOrderService };