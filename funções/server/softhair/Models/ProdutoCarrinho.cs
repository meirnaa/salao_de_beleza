namespace softhair.Models{
    public class ProdutoCarrinho
{
    public int ProdutoCarrinhoId { get; set; }
    public int ProdutoId { get; set; }
    public Produto? Produto { get; set; }
    public int CarrinhoId { get; set; }
    public Carrinho? Carrinho { get; set; }
}
}