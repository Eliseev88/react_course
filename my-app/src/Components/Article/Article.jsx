import './Article.scss';

export function Article ({title, url, image}) {
    return (
        <article className="article">
            <a className='article__link' href={url} target="_blank">
                <img className='article__image' src={image} alt="image" />
                <h4 className='article__title'>{title}</h4>
            </a>
        </article>
    )
}
