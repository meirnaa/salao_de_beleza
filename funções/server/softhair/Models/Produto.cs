namespace softhair.Models{
    public class Produto
{
    public int ProdutoId { get; set; }
    public string? Nome { get; set; }
    public int Quantidade { get; set; }
    public decimal Preco { get; set; }

    // Relacionamentos de navegação
    public int CategoriaId { get; set; }
    public Categoria? Categoria { get; set; }
}
}