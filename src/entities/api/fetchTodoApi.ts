import { baseApi } from "@/shared/api";
import { Todo } from "../types/todo";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib";
import { useId } from "react";

const todosKeys = {
    useGetTodo: () => ['posts'],
    useGetTodoById: (id: number | null) => ['post', id],
    usePostTodo: () => ['postTodo'],
    useDeleteTodo: (id:number | null) => ['deleteTodo',id]  
};

export const useGetTodo = () => {
    const fetcher = async () => (await baseApi.get<Todo[]>('/posts')).data;
    return useQuery({
        queryKey: todosKeys.useGetTodo(),
        queryFn: fetcher,
    });
};

export const useGetTodoById = (props: { id: number | null }) => {
    const { id } = props;
    const fetcher = async () => (await baseApi.get<Todo>(`/posts/${id}`)).data;
    return useQuery({
        queryKey: todosKeys.useGetTodoById(id),
        queryFn: fetcher,
        enabled: true
    });
};

type usePostTodoProps = Omit<Todo, 'userId' | 'id'>;
export const usePostTodo = () => {
    const id = useId()
    
    const fetcher = async (props: usePostTodoProps) => {
        const post = {...props,id: id,userId: id}
        return (await baseApi.post<Todo>('/posts', post)).data
    };
    const mutation = useMutation({
        mutationFn: fetcher,
        mutationKey: todosKeys.usePostTodo(),
        onSettled: () => queryClient.invalidateQueries({ queryKey: todosKeys.useGetTodo() })
    });
    return mutation;
};
export const useDeleteTodo = (id:number | null) => {
    const fetcher = async () => {
        return (await baseApi.delete(`/posts/${id}`)).data
    };
    const mutation = useMutation({
        mutationFn: fetcher,
        mutationKey: todosKeys.useDeleteTodo(id),
        onSettled: () => queryClient.invalidateQueries({ queryKey: todosKeys.useGetTodo() })
    }
    );
    return mutation;
};