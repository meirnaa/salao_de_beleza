namespace softhair.Models{
    public class Usuario
{
    public int UsuarioId { get; set; }
    public string? Nome { get; set; }
    public string? Telefone { get; set; }
    public string? Email { get; set; }
    public string? Senha { get; set; }

    // Relacionamento de navegação
    public Carrinho? Carrinho { get; set; }
}
}