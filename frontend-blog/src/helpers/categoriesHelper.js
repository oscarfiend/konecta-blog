import Swal from "sweetalert2"
import { clienteAxios } from "../axios/clienteAxios"

// load all categories
export const loadCategories=async (dispatch,loadData,setCategories)=>{
    dispatch(loadData())
      try{
          const res=await clienteAxios.get('/categories')
          setCategories(res.data)
      }catch(error){
          console.log(error)
      }finally{
        dispatch(loadData())
      }
  }
  

export const getCategory=async (article)=>{
    try {
       const category=await clienteAxios.get(`/categories/${article.category_id}`)
       return category.data
    } catch (error) {
        console.log(error.response)
    }        
}

  // method for update/save an category
  export const saveCategory=async (categorySelected,categories,setCategories,data)=>{
    //if is updating
    if(categorySelected){
      try {            
          const res=await clienteAxios.put(`/categories/${categorySelected.id}`,data)
          const categoryNew=res.data;
          const newCategories=categories.map(category=>category.id===categorySelected.id?categoryNew:category)
          setCategories(newCategories);
          Swal.fire(
              'Congratulations!',
              'Your category has been updated.',
              'success'
            )
      } catch (error) {
          console.log(error)
          Swal.fire(
              'We are sorry!',
              'Your category has not been updated.',
              'error'
            )
      }
  }
  //if is a new category
  else{
      try {            
          const res=await clienteAxios.post(`/categories`,data)
          const categoryNew=res.data;
          setCategories([
              ...categories,
              categoryNew
          ]);           
          Swal.fire(
              'Congratulations!',
              'Your category has been created.',
              'success'
            )
      } catch (error) {            
            Swal.fire(
              'We are sorry!',
              'Your category has not been created.',
              'error'
            )
      }
  }
  }


//   method for delete an category
export const deleteCategory=(id,setCategories,categories)=>{
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
            await clienteAxios.delete(`/categories/${id}`);
            const newCategories=categories.filter(category=>category.id!==id);
            setCategories(newCategories)            
            Swal.fire(
                'Category deleted!',
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