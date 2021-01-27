import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { clienteAxios } from "../../../axios/clienteAxios";
import Swal from "sweetalert2";
import { editArticle } from "../../../helpers/articlesHelper";

const EditArticleForm = ({ articles, setArticles, handleClose }) => {
  const { articleSelected } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadCategories = async () => {
    try {
      const res = await clienteAxios.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // initial values for the form
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      title: articleSelected?.title || "",
      category_id: articleSelected?.category_id || "",
      short_text: articleSelected?.short_text || "",
      large_text: articleSelected?.large_text || "",
    },
  });

  const onSubmit = async (data) => {
    editArticle(articleSelected,articles,setArticles,data)
    handleClose();
  };
  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>Update Article</Modal.Title>
      </Modal.Header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)} className="form-modal">
          <div className="row">
            <div className="col-12">
              <label htmlFor="inputEmail" className="visually-hidden">
                Article title
              </label>
              <input
                autoComplete="off"
                name="title"
                ref={register({
                  required: "Article title is required",
                })}
                className="form-control"
                placeholder="Title"
              />
              <p className="text-danger">{errors.title?.message}</p>
            </div>
          </div>
          {categories.length !== 0 && (
            <div className="row">
              <div className="col-12">
                <label htmlFor="category" className="visually-hidden">
                  Category
                </label>

                <select
                  className="form-control"
                  name="category_id"
                  ref={register({
                    required: "Choose a category",
                  })}
                  defaultValue={articleSelected?.category_id}
                >
                  <p className="text-danger">{errors.category_id?.message}</p>
                  {categories.length !== 0 &&
                    categories.map((category) => (
                      <option value={category.id} key={category.id}>
                        {category.name}
                      </option>
                    ))}
                </select>
                <p className="text-danger">{errors.category_id?.message}</p>
              </div>
            </div>
          )}
          <div className="row">
            <div className="col-12">
              <label htmlFor="short_text" className="visually-hidden">
                Short text
              </label>
              <input
                autoComplete="off"
                name="short_text"
                ref={register({
                  required: "Short text is required",
                })}
                className="form-control"
                placeholder="short text"
              />
              <p className="text-danger">{errors.short_text?.message}</p>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="mb-3">
                <label htmlFor="larte_text" className="form-label">
                  Long text
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="large_text"
                  ref={register({
                    required: "Long text is required",
                  })}
                />
                <p className="text-danger">{errors.large_text?.message}</p>
              </div>
            </div>
          </div>
          <Modal.Footer>
            <button className="btn btn-outline-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="submit" className="btn btn-outline-danger">
              Update Changes
            </button>
          </Modal.Footer>
        </form>
      </main>
    </div>
  );
};

export default EditArticleForm;
