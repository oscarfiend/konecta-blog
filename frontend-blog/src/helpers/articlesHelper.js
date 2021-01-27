import Swal from "sweetalert2";
import { clienteAxios } from "../axios/clienteAxios";
import { loadData } from "../redux/actions/userActions";

// method for load all articles
export const loadArticles = async (dispatch,setArticles) => {
    dispatch(loadData())
    try {
      const res = await clienteAxios.get("/articles");
      setArticles(res.data);
    } catch (error) {
      console.log(error)
    }finally{
      dispatch(loadData())
    }
  };


//method for save a new article
export const saveArticle=async (data,slug,file,history) =>{
  data.slug = slug;
    try {
      //if the user has attached a file
      if (file) {
        try {
          const formData = new FormData();
          formData.append("upload_preset", "konecta_blog");
          formData.append("file", file);
          //save the image in cloudinary
          const res = await clienteAxios.post(
            "https://api.cloudinary.com/v1_1/datcggjwp/image/upload",
            formData
          );
          data.image = res.data.secure_url;
        } catch {
          console.log("The image has not been saved");
        }
        // else the image is default
      } else {
        data.image = "default.jpg";
      }
      //save the article data 
      await clienteAxios.post("/articles", data);
      history.push('/home')
      Swal.fire(
        "Congratulations!",
        "Your article has been created.",
        "success"
      );
    } catch (error) {
      Swal.fire("We are sorry!", "Your article has not been created.", "error");
    }
}


// edit an article
export const editArticle=async (articleSelected,articles,setArticles,data)=>{
  try {
    const res = await clienteAxios.put(
      `/articles/${articleSelected.id}`,
      data
    );
    const carticleNew = res.data;
    const newarticles = articles.map((article) =>
      article.id === articleSelected.id ? carticleNew : article
    );
    setArticles(newarticles);
    Swal.fire(
      "Congratulations!",
      "Your category has been updated.",
      "success"
    );
  } catch (error) {
    console.log(error);
    Swal.fire(
      "We are sorry!",
      "Your category has not been updated.",
      "error"
    );
  }
}

export const deleteArticle=(id,articles,setArticles)=>{
  Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
      try{
          await clienteAxios.delete(`/articles/${id}`);
          const newArticles=articles.filter(article=>article.id!==id);
          setArticles(newArticles)            
          Swal.fire(
              'Article deleted!',
              'Your file has been deleted.',
              'success'
            )
      }catch (error){
          Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
              footer: '<a href>Why do I have this issue?</a>'
            })
      }
        
      }
    })
}