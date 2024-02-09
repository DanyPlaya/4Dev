import { usePostTodo } from "@/entities/api/fetchTodoApi";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const AddTodoForm = () => {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const {mutate,status} = usePostTodo();

    const handleSubmit = async () => {
        try {
            mutate({body:body,title:title})
            setTitle("");
            setBody("");
            alert("Пост успешно добавлен!");
        } catch (error) {
            console.error("Произошла ошибка:", error);
            alert("Произошла ошибка при добавлении поста.");
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Добавить новый пост
            </Typography>
            <TextField
                label="Заголовок"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
            />
            <TextField
                label="Текст"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                margin="normal"
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                
            >
                 {"Отправить"}
            </Button>
        </Box>
    );
};
