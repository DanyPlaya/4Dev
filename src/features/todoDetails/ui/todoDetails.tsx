import { useDeleteTodo, useGetTodoById } from "@/entities/api/fetchTodoApi";
import { Modal, Typography, Box, Button } from "@mui/material";

type TodoDetailsProps = {
    id: number | null;
    open: boolean;
    closeModal: () => void;

};

export const TodoDetails = (props: TodoDetailsProps) => {
    const { id, closeModal, open } = props;
    const { data, isLoading } = useGetTodoById({ id: id });
    const {mutate} = useDeleteTodo(id)
    const deleteTodo = () =>{
        mutate(),
        closeModal()
    }
    return (
        <Modal open={open} onClose={closeModal}>
            <Box
                sx={{
                    position: 'absolute',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 2,
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                {isLoading ? (
                    <Typography>Loading...</Typography>
                ) : (
                    <>
                        <Typography variant="h6">{data?.title}</Typography>
                        <Typography>{data?.body}</Typography>
                        <Button onClick={closeModal} variant="contained" color="primary" sx={{ mt: 2 }}>
                            Close
                        </Button>
                        <Button onClick={() => deleteTodo()} variant="contained" color="primary" sx={{ mt: 2 }}>
                            Delete
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    );
};
