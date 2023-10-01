import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="hero">
        <h1 className="hero-title">Burak Katı</h1>
        <div className="hero-social-links">
          <a
            className="hero-social-link"
            href="https://github.com/LelonDelonMelon"
          >
            Github
          </a>
          <a
            className="hero-social-link"
            href="https://www.linkedin.com/in/burakkati/"
          >
            Linkedin
          </a>
        </div>
      </div>

      <div className="blog">
        <h2 className="blog-title">
          <a className="blog-title-link" href="#">
            Deneme Baslik
          </a>
        </h2>
        <div className="blog-text">
          <p>Deneme text</p>
        </div>
        <div className="blog-date">30 Eylul 2023</div>
      </div>
    </div>
  );
}

export default App;
