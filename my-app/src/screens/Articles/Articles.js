import { Button, CircularProgress, Container } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Article } from "../../Components/Article/Article"
import { getArticles } from "../../store/articles/actions"
import { selectArticles, selectArticlesError, selectArticlesStatus } from "../../store/articles/selectors"
import { FETCH_STATUSES } from "../../utils/constants"

export const Articles = () => {
    const dispatch = useDispatch();
    const articles = useSelector(selectArticles);
    const error = useSelector(selectArticlesError);
    const status = useSelector(selectArticlesStatus);

    const sendRequest = () => {
        dispatch(getArticles());
    };

    useEffect(() => {
        sendRequest();
    }, []);

    return (
        <Container>
            <h2 style={{ textAlign: 'center'}}>Articles</h2>
            <Button onClick={sendRequest}>Get articles</Button>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                {status === FETCH_STATUSES.REQUEST && <CircularProgress color="secondary" />}
            </div>
            {error && <h4>{error}</h4>}
            {articles.map(el => (<Article 
                                    key={el.id} 
                                    title={el.title} 
                                    url={el.url}
                                    image={el.imageUrl}
                                />))}
        </Container>
    )
}
