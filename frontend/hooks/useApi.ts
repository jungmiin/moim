import axios from "axios";
import { useQuery, useMutation, useSuspenseQuery } from "@tanstack/react-query";

const useGetQuery = (url: string, key: string, etc?: object) => {
  const queryKey = [key];
  const queryFn = async () => {
    const response = await axios.get(url);
    return response.data;
  };
  const { status, data } = useSuspenseQuery({ queryKey, queryFn, ...etc });
  return { status, data };
};

const usePostMutate = (url: string, etc?: object) => {
  const mutationFn = async (body: any) => {
    console.log(body);
    const response = await axios.post(url, body);
    return response.data;
  };
  const { isPending, mutate } = useMutation({ mutationFn, ...etc });
  return { isPending, mutate };
};

const useDeleteMutate = (url: string, etc?: object) => {
  const mutationFn = async (body: any) => {
    const response = await axios.delete(url, { data: body });
    return response.data;
  };
  const { mutate } = useMutation({ mutationFn, ...etc });
  return { mutate };
};

const useUpdateMutate = (url: string, etc?: object) => {
  const mutationFn = async (body: any) => {
    const response = await axios.post(url, body);
    return response.data;
  };
  const { mutate } = useMutation({ mutationFn, ...etc });
  return { mutate };
};

export { usePostMutate, useGetQuery, useDeleteMutate, useUpdateMutate };
