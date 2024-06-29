import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {
  deleteCabin as deleteCabinApi,
  editCabin as editCabinApi,
  createCabin as createCabinApi,
  getCabins as getCabinsApi,
  duplicateCabin as duplicateCabinApi,
} from "../../services/apiCabins";

//basically a custom hooks file which perform operations on apiCabin.js and stores data to react query
//get all cabins and store the data in react query
export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabinsApi,
  });

  return { isLoading, cabins, error };
}

//create a new cabin using react query
export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createCabin } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("New Cabin created successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isCreating, createCabin };
}

//edit a cabin
export function useEditCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabinData, id }) => editCabinApi(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("Cabin Edited successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isEditing, editCabin };
}

//delete a cabin
export function useDeleteCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      toast.success("Cabin deleted successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
}

//duplicate a cabin
export function useDuplicateCabin() {
  const queryClient = useQueryClient();

  const { isLoading: isDuplicating, mutate: duplicateCabin } = useMutation({
    mutationFn: duplicateCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });

      toast.success("Cabin copied successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isDuplicating, duplicateCabin };
}
