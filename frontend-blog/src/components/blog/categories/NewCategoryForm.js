import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { saveArticle } from "../../../helpers/articlesHelper";
import { saveCategory } from "../../../helpers/categoriesHelper";

const NewCategoryForm = ({categories,setCategories,handleClose }) => {
  const { categorySelected } = useSelector((state) => state.user);

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      name: categorySelected?.name || ""
    },
  });

  const onSubmit =async (data) => {
    saveCategory(categorySelected,categories,setCategories,data)
    handleClose()
  };

  return (
    <div>
      <Modal.Header closeButton>
        <Modal.Title>
          {categorySelected ? "Update category" : "Creating a new category"}
        </Modal.Title>
      </Modal.Header>
      <main>
        <form onSubmit={handleSubmit(onSubmit)} className="form-modal">
          <div className="row">
            <div className="col-12">
              <label htmlFor="inputEmail" className="visually-hidden">
                Categoy name
              </label>
              <input
                autoComplete="off"
                name="name"
                ref={register({
                  required: "Category name is required"
                })}
                className="form-control"
                placeholder="Name"
              />
              <p className="text-danger">{errors.name?.message}</p>
            </div>            
            </div>
          <Modal.Footer>
            <button className="btn btn-outline-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="submit" className="btn btn-outline-danger">
              {categorySelected ? "Update Changes" : "Save Changes"}
            </button>
          </Modal.Footer>
        </form>
      </main>
    </div>
  );
};

export default NewCategoryForm;