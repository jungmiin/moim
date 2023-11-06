import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addedPersonInterface, deletedPersonInterface } from "@/interfaces";

const useGetQuery = (url: string, key: string, etc?: object) => {
  const queryKey = [key];
  const queryFn = async () => {
    const response = await axios.get(url);
    return response.data;
  };
  const { status, data } = useQuery({ queryKey, queryFn, ...etc });
  return { status, data };
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

export { useGetQuery, useDeleteMutate, useUpdateMutate };
