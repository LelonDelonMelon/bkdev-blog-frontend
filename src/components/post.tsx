type IProps = {
    postId: number;
    postTitle: string;
    postDetail: string;
    postDate: string;
}
export default function Post(props: IProps) {

    return (
        <>

            <div className="blog">
                <h2> <a href="#">{props.postTitle}</a></h2>
                <span className="blog-text">{props.postDetail} </span>
                <div className="blog-date">{props.postDate} </div>
            </div>
        </>
    );
}
