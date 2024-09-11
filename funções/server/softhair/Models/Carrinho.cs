namespace softhair.Models{
public class Carrinho
{
    public int CarrinhoId { get; set; }
    public decimal PrecoTotal { get; set; }

    // Relacionamentos de navegação
    public int UsuarioId { get; set; }
    public Usuario? Usuario { get; set; }

    // Inicializando a coleção no construtor
    public ICollection<ProdutoCarrinho> ProdutosCarrinho { get; set; } = new List<ProdutoCarrinho>();
}
}