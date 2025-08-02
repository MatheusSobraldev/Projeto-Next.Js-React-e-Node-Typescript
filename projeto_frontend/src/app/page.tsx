import "./home.css"
export default function HomePage() {
  return (
    <>
      <header>
        <h1>
          Restaurante Tech
        </h1>
      </header>
      <div className="container">
        <main>
          <h2>Bem-vindo!</h2>
          <p>Gerencie seus pratos, alimentos e usuários com facilidade.</p>
          <img src="/imagem_restaurante.jpg" alt="Restaurante" />
        </main>
      </div>
    </>
  );
}
