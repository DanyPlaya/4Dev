import { Card, CardContent, CardHeader } from "@mui/material"
import { Todo } from "../types/todo"
type TodoCardProps = Todo & {
    onClick: (id:number) => void
}
export const TodoCard = (props:TodoCardProps) =>{
    const {body,id,title,onClick} = props
    
    return(
        <Card sx={{cursor:'pointer',height:250,width:300}} onClick={()=> onClick(id)}>
            <CardHeader  title={`${title} № ${id}`}/>
            <CardContent>
                {body}
            </CardContent>
        </Card>
    )
}