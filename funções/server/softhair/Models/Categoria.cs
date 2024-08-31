namespace softhair.Models{
    public class Categoria
{
    public int CategoriaId { get; set; }
    public string? Nome { get; set; }
    
    // Relacionamento de navegação
    public ICollection<Produto>? Produtos { get; set; }
}
}