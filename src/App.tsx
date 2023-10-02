import "./App.css";
import Post from "./components/post";
import fetchPosts from "./util/fetchPosts";
function App() {

    const dataFromFetchPosts = fetchPosts();
    console.log(dataFromFetchPosts);
    return (
        <div className="container">
            <div className="hero">
                <h1 className="hero-title">Burak Katı</h1>
                <div className="hero-social-links">

                    <a className="hero-social-link"
                        href="https://burakkati.dev">
                        My Website
                    </a>
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
            <Post postId={1} postTitle="Deneme Baslik" postDate="30 Eylul 2023" postDetail="  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In aliquet tincidunt lacus, et varius elit commodo eget. 
            Suspendisse viverra blandit ex, a tincidunt ligula pellentesque id. Vestibulum quis sodales libero. Etiam vel nisi sit amet arcu lacinia porttitor. Nullam quis ex tristique, convallis enim sed, feugiat tellus. Nunc a varius mi. Cras in felis mauris. Ut at velit mi. Vivamus eget turpis in arcu gravida tincidunt. Quisque fermentum lacus dapibus quam semper sodales. 
            Nullam tellus mi, efficitur eget malesuada dapibus, mattis sit amet arcu. Proin sed cursus turpis. 
            Quisque egestas ante eget magna tempus, ut sodales odio maximus. 
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Praesent volutpat convallis nibh finibus egestas. Proin commodo augue mattis sodales porttitor.
            Mauris quis bibendum magna. 
            Fusce pharetra suscipit eros in scelerisque. 
            Cras quis gravida risus.
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam varius, lacus nec ultrices convallis, orci nisi faucibus mauris, sit amet mollis urna augue eget lectus. Maecenas sit amet leo a sem faucibus tempus. Suspendisse consectetur sapien ac nulla egestas iaculis.    "></Post>

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
