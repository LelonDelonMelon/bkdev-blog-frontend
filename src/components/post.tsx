type IProps = {
    postId: string;
    postTitle: string;
    postDetail: string;
    postDate: string;
    postSlug: string;
}
export default function Post(props: IProps) {
    // Format date to be readable
    const formatDate = (dateString: string) => {
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch {
            return dateString;
        }
    };

    return (
        <>
            <div className="blog">
                <h2> 
                    <a href={`/posts/${props.postSlug}`}>{props.postTitle}</a>
                </h2>
                <span className="blog-text">{props.postDetail} </span>
                <div className="blog-date">{formatDate(props.postDate)} </div>
            </div>
        </>
    );
}
