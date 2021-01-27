import React from 'react'
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clienteAxios } from "../../../axios/clienteAxios";
import Swal from 'sweetalert2';
import { selectArticle, userAutenticated,loadData } from "../../../redux/actions/userActions";
import { Link } from 'react-router-dom';
import {Modal} from 'react-bootstrap'
import EditArticleForm from './EditArticleForm';
import { deleteArticle, loadArticles } from '../../../helpers/articlesHelper';

const ArticlesScreen = () => {
const [articles, setArticles] = useState([]);
const [show, setShow] = useState(false);

const {loadingData} = useSelector(state => state.user);

const dispatch = useDispatch();

const handleClose = (e) =>{  
  dispatch(selectArticle(null));
  setShow(false);
} 

    useEffect(() => {
        loadArticles(dispatch,setArticles)
        dispatch(userAutenticated())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    const selectArt=(article)=>{
        dispatch(selectArticle(article));
        handleShow()
    }

    const handleShow = () => setShow(true);


    return (
        <div className="container pr-5">
       {loadingData?
       <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
       :
       
      <div className="tabla">
        <div className="row mb-4">
        <h2 className="text-center text-secondary col align-self-center">Articles</h2>
        <div className="mr-3">
        <Link className="btn btn-danger pr-5 pl-5" to="/new-article">Create new article</Link>
        </div>
        </div>
        {
        articles.length !== 0?
        <table className="table">
          <thead>
            <tr>
            <th scope="col">#</th>
              <th scope="col">Article title</th>
              <th scope="col">Short text</th>
              <th scope="col">Likes</th>
              <th scope="col">Created</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.length!==0 && articles.map((article,index)=>(
            <tr key={article.id}>
              <th scope="row">{index+1}</th>
              <td>{article.title}</td>
              <td>{article.short_text.substr(0,30)}</td>
              <td>{article.likes}</td>
              <td>{article.created_at}</td>
              <td>
              <div
                className="btn-group btn-group-sm mt-2"
                role="group"
                aria-label="Basic mixed styles example"
                >
                <button type="button" className="btn btn-outline-secondary" onClick={()=>selectArt(article)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                </svg>
                </button>
                
                <button type="button" className="btn btn-outline-danger" onClick={()=>deleteArticle(article.id,articles,setArticles)}>
                    <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                    >
                    <path
                      fillRule="evenodd"
                      d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
                      />
                  </svg>
                </button>
              </div>
            </td>
            </tr>
            )) 
            }
          </tbody>
        </table>
      :
      <h1 className="text-center">There are no articles</h1>
      }
      </div>
      }
      <Modal show={show} onHide={handleClose} >
        <EditArticleForm handleClose={handleClose} setArticles={setArticles} articles={articles}/>
      </Modal>
    </div>
    )
}

export default ArticlesScreen
