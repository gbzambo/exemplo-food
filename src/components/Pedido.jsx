import { useState } from "react"

//Array de objetos contendo o estado inicial do cardápio
const cardapio=[
  { id: 1, nome: "Combo-01", preco: 25.00, disponivel: true, quantidade: 0},
  { id: 2, nome: "Combo-02", preco: 35.00, disponivel: true, quantidade: 0 },
  { id: 3, nome: "Combo-03", preco: 45.00, disponivel: false, quantidade: 0 },
  { id: 4, nome: "Combo-04", preco: 55.00, disponivel: true, quantidade: 0 },
];

const Pedido = () => {

  //HOOK- useState- Manipula o estado da variável
  //Estados para gerenciar a lista de items do cardápio
const[items,setItems]=useState(cardapio);
const[status,setStatus]=useState("");
const[enviar,setEnviar]=useState(false);

//Valor fixo adicionado ao total quando tiver items no carrinho
const taxaEntrega=5.00;

//Função que altera a quantidade do pedido
const AlterarQuantidade =(id,valor)=>{
  setItems(alt =>
    //MAP: Cria novo array e percorre os items sem modificar o original (imutabilidade)
    alt.map(item=>
      //TERNÁRIO: Verifica se o item da iteração atual é o que deve ser alterado
      //SPREAD(...item): Mantem os valores antigos e adiciona os novos
      //MATH.MAX : Objeto que garante que a quantidade nunca seja menor que 0
      item.id === id ? {...item,quantidade: Math.max(0, item.quantidade + valor)}:item
    )
  )
}

//FILTER: Seleciona apenas os produtos disponíveis no carrinho
const produtosDisponiveis = items.filter(item => item.disponivel);
const cardapio = items.filter(item=> item.quantidade > 0);

//REDUCE: Calcula a soma dos items (preço + quantidade e adiciona a taxa de entrega)
const subTotal = carrinho.reduce((ac,item)=> ac + item.preco * item.quantidade,0);
const total = subTotal > 0 ? subTotal + taxaEntrega: 0;

//SIMULAÇÃO DO CICLO DE VIDA DE ENTREGA USANDO TEMPORIZADOR ASSINCRONO

const ConfirmarPedido=()=>{
  setEnviar(true);
  setStatus("Restaurante confirmou pagamento, preparando pedido");
  setTimeout(()=>{
    setStatus("Seu pedido saiu para a entrega")
    setEnviar(false);
  },5000)
  setTimeout(()=>{
    setStatus("Seu Pedido foi entregue com sucesso");
    setEnviar(false)
  },10000)
}



  return (
    <>
      
    </>
  )
}

export default Pedido
