import { AddTodoForm } from "@/widgets/AddTodoForm"
import { TodoList } from "@/widgets/todoList"
import { Box } from "@mui/system"

export const MainPage = () =>{
    return(
    <Box sx={{display:"flex",justifyContent:'center',alignItems:"center",flexDirection:'column'}}>
       <Box sx={{padding:2}}>

      <AddTodoForm/>
       </Box>
      

      <TodoList />
     
     
    </Box>
    )
}