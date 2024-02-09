import { TodoCard, useGetTodo } from "@/entities";
import { Todo } from "@/entities/types/todo";
import { TodoDetails } from "@/features/todoDetails";
import { Box, ListItem } from "@mui/material";
import { memo, useState } from "react";
import { FixedSizeList, ListChildComponentProps, areEqual, } from 'react-window';
import styles from './todoList.module.scss';
type TodoListData = {
    todos: Todo[];
    onClick: (id: number) => void;
}
const renderRow = memo(({ index, style, data }: ListChildComponentProps<TodoListData>) => {
    const todo = data.todos[index];
    return (
        <ListItem style={style} key={todo.id}>
            <TodoCard onClick={data.onClick} body={todo.body} id={todo.id} title={todo.title} userId={todo.userId} />
        </ListItem>
    );
}, areEqual);

export const TodoList = () => {
    const { data } = useGetTodo()
    const [open, setOpen] = useState(false);
    const [todoId,setTodoId] = useState<number | null>(null)
    const handleOpen = (id:number) => {
        setTodoId(id)
        setOpen(true)
    }
    const handleClose = () => setOpen(false);
    
    return (
        <Box
            sx={{ width: '100%', height: '100vh', maxWidth: 360, bgcolor: 'background.paper' }}
        >
            <FixedSizeList
                className={styles.noScrollbars}
                height={window.innerHeight}
                width={'100%'}
                itemSize={260}
                itemData={{todos: data || [],onClick: handleOpen}}
                itemCount={data?.length || 0}
                overscanCount={5}
            >
                {renderRow}
            </FixedSizeList>
            <TodoDetails  closeModal={handleClose} open={open} id={todoId}/>
      
        </Box>
    );
}
