import Swal from "sweetalert2";
import { clienteAxios } from "../axios/clienteAxios";

// method for delete an user
  export const deleteUser = (id,users,setUsers) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await clienteAxios.delete(`/users/${id}`);
          const newUsers = users.filter((user) => user.id !== id);
          setUsers(newUsers);
          Swal.fire("User deleted!", "Your file has been deleted.", "success");
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: "<a href>Why do I have this issue?</a>",
          });
        }
      }
    });
  };

//   method for load all users
  export const loadUsers = async (setUsers,setError) => {
    try {
      const usersRes = await clienteAxios.get("/users");
      setUsers(usersRes.data);
    } catch {
      setError(true);
    }
  };

//   method for save/update an user
  export const saveUser=async (userSelected,users,setUsers,data) =>{
    if(userSelected){
        try {            
            const res=await clienteAxios.put(`/users/${userSelected.id}`,data)
            const userNew=res.data;
            const newUsers=users.map(user=>user.id===userSelected.id?userNew:user)
            setUsers(newUsers);
            Swal.fire(
                'Congratulations!',
                'Your user has been updated.',
                'success'
              )
        } catch (error) {
            console.log(error)
            Swal.fire(
                'We are sorry!',
                'Your user has not been updated.',
                'error'
              )
        }
    }
    //if is addering a new user
    else{
        try {           
            const res=await clienteAxios.post(`/register`,data)
            const userNew=res.data.data;
            setUsers([
                ...users,
                userNew
            ]);           
            Swal.fire(
                'Congratulations!',
                'Your user has been created.',
                'success'
              )
        } catch (error) {            
              Swal.fire(
                'We are sorry!',
                'Your file has not been created.',
                'error'
              )
        }
  }
}