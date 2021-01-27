import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clienteAxios } from '../../../axios/clienteAxios';
import { loadArticles } from '../../../helpers/articlesHelper';
import { loadData, userAutenticated } from '../../../redux/actions/userActions';
import CardArticle from '../CardArticle';

const ArticleScreen = (props) => {

    //local state for the article
    const [article,setArticle]=useState()
    //local state for the article category
    const [category, setCategory] = useState({})

    const [articles, setarticles] = useState([])

    const { loadingData,logged } = useSelector((state) => state.user);

    const history=useHistory()
    
    //get the slug from the url
    const slug=props.match.params.slug;

    const dispatch = useDispatch()

    useEffect(() => {
        loadArticles(dispatch,setarticles);
        dispatch(userAutenticated())
        if(slug){
            dispatch(loadData())
            getArticle()
        }
        if(!logged){
            history.push('/login')
          }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //load the article with the slug of the url
    const getArticle=async ()=>{
        try {
           const res= await clienteAxios.get(`/articles/${slug}`)
           setArticle(res.data[0])
           const category=await clienteAxios.get(`/categories/${res.data[0].category_id}`)
           setCategory(category.data)
        } catch (error) {
            console.log("error category",error.response)
        }finally{
            dispatch(loadData())    
        }      
    }//end getArticle


    return (
        <div className="container">  
        {loadingData?
         <div className="spinner">
         <div className="double-bounce1"></div>
         <div className="double-bounce2"></div>
         </div>
         :
         article?
        <div className="tabla pr-4">
            {console.log(article)}
            <div className="row">
               
                <div className="col-lg-9  col-md-9 col-sm-12">
                    <h2 className="text-center text-danger title">{article.title}</h2>
                    <div className="row">
                        
                    <div className="col-7 p-1">
                    <img src={article.image==='default.jpg'?`../${article.image}`:article.image} className="card-img-top p-2" alt={article.image}/>
                        
                    </div>
                    <div className="col-5">
                        {category.name &&
                        <>
                        <h5 className="text-secondary">Category:</h5><span>{category?.name}</span>
                        </>
                         }
                        <hr/>
                        <h5 className="text-secondary">Created:</h5><span>{article.created_at}</span>
                        <hr/>
                        <p>{article.short_text}</p>
                    </div>
                    </div>
                    <div className="row mt-3">
                        <p className="large-text">{article.large_text}</p>
                    </div>
                </div> 

                <div className="col-lg-3 col-md-3 col-sm-12 justify-content-center">
                    <h2 className="text-secondary ">Other articles</h2>
                    <div className="row">
                    {articles.map((art,index) => (
                        index<2 && art.id!==article.id &&
                        <CardArticle article={art} key={art.id} />  
                        ))}
                </div> 
                </div>
            </div>
        </div> 
        : 
        <h1 className="text-center">There are no articles</h1>  
        }
        </div>
    )
}

export default ArticleScreen
