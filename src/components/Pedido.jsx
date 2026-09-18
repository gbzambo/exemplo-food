import { useState } from "react"

//Array de objetos contendo o estado inicial do cardápio
const cardapio = [
  { id: 1, nome: "Combo-01", preco: 25.00, disponivel: true, quantidade: 0 },
  { id: 2, nome: "Combo-02", preco: 35.00, disponivel: true, quantidade: 0 },
  { id: 3, nome: "Combo-03", preco: 45.00, disponivel: false, quantidade: 0 },
  { id: 4, nome: "Combo-04", preco: 55.00, disponivel: true, quantidade: 0 },
];

const Pedido = () => {

  //HOOK- useState- Manipula o estado da variável
  //Estados para gerenciar a lista de items do cardápio
  const [items, setItems] = useState(cardapio);
  const [status, setStatus] = useState("");
  const [enviar, setEnviar] = useState(false);

  //Valor fixo adicionado ao total quando tiver items no carrinho
  const taxaEntrega = 5.00;

  //Função que altera a quantidade do pedido
  const AlterarQuantidade = (id, valor) => {
    setItems(alt =>
      //MAP: Cria novo array e percorre os items sem modificar o original (imutabilidade)
      alt.map(item =>
        //TERNÁRIO: Verifica se o item da iteração atual é o que deve ser alterado
        //SPREAD(...item): Mantem os valores antigos e adiciona os novos
        //MATH.MAX : Objeto que garante que a quantidade nunca seja menor que 0
        item.id === id ? { ...item, quantidade: Math.max(0, item.quantidade + valor) } : item
      )
    )
  }

  //FILTER: Seleciona apenas os produtos disponíveis no carrinho
  const produtosDisponiveis = items.filter(item => item.disponivel);
  const carrinho = items.filter(item => item.quantidade > 0);

  //REDUCE: Calcula a soma dos items (preço + quantidade e adiciona a taxa de entrega)
  const subTotal = carrinho.reduce((ac, item) => ac + item.preco * item.quantidade, 0);
  const total = subTotal > 0 ? subTotal + taxaEntrega : 0;

  //SIMULAÇÃO DO CICLO DE VIDA DE ENTREGA USANDO TEMPORIZADOR ASSINCRONO

  const ConfirmarPedido = () => {
    setEnviar(true);
    setStatus("Restaurante confirmou pagamento, preparando pedido");
    setTimeout(() => {
      setStatus("Seu pedido saiu para a entrega")
      setEnviar(false);
    }, 5000)
    setTimeout(() => {
      setStatus("Seu Pedido foi entregue com sucesso");
      setEnviar(false)
    }, 10000)
  }




  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="mx-auto max-w-6xl">

        {/* Cabeçalho */}
        <header className="mb-8">
          <p className="text-sm font-medium text-red-600">
            Restaurante
          </p>

          <h2 className="mt-1 text-3xl font-bold text-gray-900">
            Cardápio do Restaurante
          </h2>

          <p className="mt-2 text-gray-500">
            Escolha seus combos e monte seu pedido.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* CARDÁPIO */}
          <section>
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Cardápio
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              {produtosDisponiveis.map(produto => (
                <div
                  key={produto.id}
                  className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-5">
                    <h4 className="text-lg font-bold text-gray-900">
                      {produto.nome}
                    </h4>

                    <p className="mt-1 text-lg font-semibold text-red-600">
                      R$ {produto.preco.toFixed(2)}
                    </p>
                  </div>

                  {/* Controle de quantidade */}
                  <div className="flex items-center justify-between rounded-xl bg-gray-100 p-2">
                    <span className="text-sm font-medium text-gray-500">
                      Quantidade
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => AlterarQuantidade(produto.id, -1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-lg font-bold text-gray-700 shadow-sm transition hover:bg-gray-200"
                      >
                        -
                      </button>

                      <span className="min-w-5 text-center font-bold text-gray-900">
                        {produto.quantidade}
                      </span>

                      <button
                        onClick={() => AlterarQuantidade(produto.id, +1)}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-lg font-bold text-white shadow-sm transition hover:bg-red-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RESUMO DO PEDIDO */}
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-6">
            <h3 className="text-xl font-bold text-gray-900">
              Resumo da Entrega
            </h3>

            <div className="my-5 h-px bg-gray-200" />

            {carrinho.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-4xl">🛒</p>

                <p className="mt-3 font-semibold text-gray-800">
                  Seu carrinho está vazio
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Adicione algum produto para continuar.
                </p>
              </div>
            ) : (
              <>
                {/* Produtos do carrinho */}
                <ul className="space-y-4">
                  {carrinho.map(item => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="font-semibold text-gray-800">
                          {item.quantidade}x {item.nome}
                        </p>

                        <p className="text-sm text-gray-500">
                          R$ {item.preco.toFixed(2)} cada
                        </p>
                      </div>

                      <span className="font-semibold text-gray-800">
                        R$ {(item.preco * item.quantidade).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="my-5 h-px bg-gray-200" />

                {/* Valores */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Subtotal
                    </span>

                    <span className="font-medium text-gray-800">
                      R$ {subTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-500">
                      Taxa de entrega
                    </span>

                    <span className="font-medium text-gray-800">
                      R$ {taxaEntrega.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between border-t border-gray-200 pt-4">
                    <span className="text-base font-bold text-gray-900">
                      Total
                    </span>

                    <span className="text-xl font-bold text-red-600">
                      R$ {total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Botão */}
                <button
                  onClick={ConfirmarPedido}
                  disabled={enviar}
                  className="mt-6 w-full rounded-xl bg-red-600 py-3 font-bold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  {enviar ? "Enviando pedido..." : "Confirmar Pedido"}
                </button>
              </>
            )}

            {/* Status */}
            {status && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="flex gap-3">
                  <span className="text-red-600">●</span>

                  <div>
                    <p className="font-bold text-red-800">
                      Status do pedido
                    </p>

                    <p className="mt-1 text-sm text-red-700">
                      {status}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </aside>

        </div>
      </div>
    </div>
  )
}


export default Pedido