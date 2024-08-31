#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using softhair.Models;

namespace softhair.Controllers
{
    public class ProdutoCarrinhoController : Controller
    {
        private readonly MyDbContext _context;

        public ProdutoCarrinhoController(MyDbContext context)
        {
            _context = context;
        }

        // GET: ProdutoCarrinho
        public async Task<IActionResult> Index()
        {
            var myDbContext = _context.ProdutoCarrinho.Include(p => p.Carrinho).Include(p => p.Produto);
            return View(await myDbContext.ToListAsync());
        }

        // GET: ProdutoCarrinho/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var produtoCarrinho = await _context.ProdutoCarrinho
                .Include(p => p.Carrinho)
                .Include(p => p.Produto)
                .FirstOrDefaultAsync(m => m.ProdutoCarrinhoId == id);
            if (produtoCarrinho == null)
            {
                return NotFound();
            }

            return View(produtoCarrinho);
        }

        // GET: ProdutoCarrinho/Create
        public IActionResult Create()
        {
            ViewData["CarrinhoId"] = new SelectList(_context.Carrinho, "CarrinhoId", "CarrinhoId");
            ViewData["ProdutoId"] = new SelectList(_context.Produto, "ProdutoId", "ProdutoId");
            return View();
        }

        // POST: ProdutoCarrinho/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ProdutoCarrinhoId,ProdutoId,CarrinhoId")] ProdutoCarrinho produtoCarrinho)
        {
            if (ModelState.IsValid)
            {
                _context.Add(produtoCarrinho);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["CarrinhoId"] = new SelectList(_context.Carrinho, "CarrinhoId", "CarrinhoId", produtoCarrinho.CarrinhoId);
            ViewData["ProdutoId"] = new SelectList(_context.Produto, "ProdutoId", "ProdutoId", produtoCarrinho.ProdutoId);
            return View(produtoCarrinho);
        }

        // GET: ProdutoCarrinho/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var produtoCarrinho = await _context.ProdutoCarrinho.FindAsync(id);
            if (produtoCarrinho == null)
            {
                return NotFound();
            }
            ViewData["CarrinhoId"] = new SelectList(_context.Carrinho, "CarrinhoId", "CarrinhoId", produtoCarrinho.CarrinhoId);
            ViewData["ProdutoId"] = new SelectList(_context.Produto, "ProdutoId", "ProdutoId", produtoCarrinho.ProdutoId);
            return View(produtoCarrinho);
        }

        // POST: ProdutoCarrinho/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ProdutoCarrinhoId,ProdutoId,CarrinhoId")] ProdutoCarrinho produtoCarrinho)
        {
            if (id != produtoCarrinho.ProdutoCarrinhoId)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(produtoCarrinho);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProdutoCarrinhoExists(produtoCarrinho.ProdutoCarrinhoId))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            ViewData["CarrinhoId"] = new SelectList(_context.Carrinho, "CarrinhoId", "CarrinhoId", produtoCarrinho.CarrinhoId);
            ViewData["ProdutoId"] = new SelectList(_context.Produto, "ProdutoId", "ProdutoId", produtoCarrinho.ProdutoId);
            return View(produtoCarrinho);
        }

        // GET: ProdutoCarrinho/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var produtoCarrinho = await _context.ProdutoCarrinho
                .Include(p => p.Carrinho)
                .Include(p => p.Produto)
                .FirstOrDefaultAsync(m => m.ProdutoCarrinhoId == id);
            if (produtoCarrinho == null)
            {
                return NotFound();
            }

            return View(produtoCarrinho);
        }

        // POST: ProdutoCarrinho/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var produtoCarrinho = await _context.ProdutoCarrinho.FindAsync(id);
            _context.ProdutoCarrinho.Remove(produtoCarrinho);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool ProdutoCarrinhoExists(int id)
        {
            return _context.ProdutoCarrinho.Any(e => e.ProdutoCarrinhoId == id);
        }
    }
}
