import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { clienteAxios } from "../../../axios/clienteAxios";
import { saveArticle } from "../../../helpers/articlesHelper";
import { userAutenticated } from "../../../redux/actions/userActions";

//styles from drag and drop zone
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  width: "100%",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#ffffff",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
//end styles from drag and drop

const NewArticleScreen = () => {
  const [image, setImage] = useState(null);
  const [file, setfile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [slug, setSlug] = useState("");

  const history = useHistory();

  const dispatch = useDispatch()

  //hook use form
  const { register, handleSubmit, errors } = useForm();

  // data for the drop zone
  const onDrop = useCallback((acceptedFiles) => {
    setImage(URL.createObjectURL(acceptedFiles[0]));
    setfile(acceptedFiles[0]);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: "image/*" });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );// end data for drop zone

  useEffect(() => {
    dispatch(userAutenticated())
    loadCategories();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //charge the categories when load the component
  const loadCategories = async () => {
    try {
      const res = await clienteAxios.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // method for generate the slug
  const changeSlug = (e) => {
    setSlug(e.target.value.trim().replace(/ /g, "-").toLowerCase());
  };

  const onSubmit = async (data) => {
    saveArticle(data,slug,file,history)
  };

  return (
    // form for new article
    <div className="container pr-5">
      <div className="tabla">
        <div className="row mb-4">
          <h2 className="text-center text-secondary col align-self-center">
            New Article
          </h2>
        </div>

        {/* form here */}
        <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
          <div className="row mr-2">
            <div className="col-lg-8 col-md-12">
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Article name
                    </label>
                    <input
                      type="text"
                      onChange={changeSlug}
                      className="form-control"
                      autoComplete="off"
                      name="title"
                      aria-describedby="emailHelp"
                      ref={register({
                        required: "Title is required",
                      })}
                    />
                    <p className="text-danger">{errors.title?.message}</p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="slug" className="form-label">
                      Slug
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      disabled
                      value={slug}
                      name="slug"
                      aria-describedby="emailHelp"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Category
                    </label>
                    <select
                      className="form-control"
                      name="category_id"
                      ref={register({
                        required: "Choose a category",
                      })}
                    >
                      
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
              </div>

              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="slug" className="form-label">
                      Short text
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      autoComplete="off"
                      name="short_text"
                      aria-describedby="emailHelp"
                      ref={register({
                        required: "Short text is required",
                      })}
                    />
                    <p className="text-danger">{errors.short_text?.message}</p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <div className="mb-3">
                    <label htmlFor="slug" className="form-label">
                      Long text
                    </label>
                    <textarea
                      type="text"
                      className="form-control"
                      name="large_text"
                      aria-describedby="emailHelp"
                      ref={register({
                        required: "Long text is required",
                      })}
                    />
                    <p className="text-danger">{errors.large_text?.message}</p>
                  </div>
                </div>
              </div>

              {/* row with drag and drop */}
              <div className="row">
                <div className="col-12">
                  <div {...getRootProps({ style })}>
                    <input name="image" {...getInputProps()} />
                    <p>Drag 'n' drop some file here, or click to select file</p>
                  </div>
                </div>
              </div>

              <div className="container">
                <button className="btn btn-danger btn-block" type="submit">
                  Save article
                </button>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 container-img">
              {image ? (
                <img src={image} alt="" className="img-loaded" />
              ) : (
                <div className="preview-img align-middle">
                  <h3 className="text-center">Preview image here.</h3>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewArticleScreen;
