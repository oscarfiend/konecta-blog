import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { loadArticles } from "../../helpers/articlesHelper";
import { userAutenticated } from "../../redux/actions/userActions";
import CardArticle from "./CardArticle";

const BlogScreen = () => {
  const [articles, setArticles] = useState([]);

  const { loadingData,logged } = useSelector((state) => state.user);

  const history=useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userAutenticated())
    loadArticles(dispatch,setArticles);
    if(!logged){
      history.push('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  return (
    <div className="container">
      {loadingData?
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
      :
      articles.length !== 0?
        <>
          <h1 className="text-secondary">Articles</h1>
          <div className="row">
              {articles?.map((article) => (
            <div className="col-lg-4 col-md-6 col-sm-12 p-3" key={article.id}>
                <CardArticle article={article}  />
          </div>
              ))}
          </div>
        </>
        :
        <h1>There are no articles</h1>
      }      
      
    </div>
  );
};

export default BlogScreen;
