import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSettings,
  updateSetting as updateSettingApi,
} from "../../services/apiSettings";
import { toast } from "react-hot-toast";

export function useGetSettings() {
  const {
    isLoading,
    data: settings = [],
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, settings, error };
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateSettings } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      toast.success("Settings updated successfully");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { isUpdating, updateSettings };
}
