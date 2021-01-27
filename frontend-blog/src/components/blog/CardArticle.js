import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Zoom from 'react-reveal/Zoom';
import { getCategory } from '../../helpers/categoriesHelper';


const CardArticle = ({article}) => {
    
    const image=`../../../default.jpg`

    const history=useHistory()

    const [category, setCategory] = useState({})

    const date=moment(article.created_at).fromNow(true);

    const seeArticle=()=>{
        history.push(`/articles/${article.slug}`)
    }

    useEffect(() => {
        setCategory(getCategory(article))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (  
            <Zoom>           
            <div className="card mt-3" onClick={seeArticle}>
            {console.log("article:",article)} 
            <img src={article.image==="default.jpg"?image:article.image} className="card-img-top p-2" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.short_text}...</p>
                <p className="card-text text-secondary">Category: {category.name}</p>
                <p className="card-text text-secondary">Created: {date} ago</p>
                {/* shot the fliendly url */}
                <Link to={`/articles/${article.slug}`}>{`${window.location.href.split('/home',1)}/articles/${article.slug}`}</Link>
            </div>
            </div>       
            </Zoom>
    )
}

export default CardArticle
