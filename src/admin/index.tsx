function adminPanel() {
  return (
    <div className="navbar-container">
      <div className="navbar">
        <a href="/">Back to the blog</a>
      </div>

      <div className="content">
        <div className="centered-form">
          <form action="">
            <div className="form-group">
              <span className="info">Post title</span>
              <input
                type="text"
                placeholder="Post title"
                className="input-field"
              />
              <span className="info">Post details </span>
              <textarea placeholder="lipsum..." className="input-field" />
              <span className="info">Post date</span>
              <input
                type="text"
                placeholder="01-23-4567"
                className="input-field"
              />
            </div>
            <button type="submit"> Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default adminPanel;
