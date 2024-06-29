import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useEditCabin } from "./useCabinAction";

function EditCabinForm({ cabinToEdit, onCloseModal }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: cabinToEdit,
  });

  const { errors } = formState;

  const { isEditing, editCabin } = useEditCabin();

  function onSubmit(data) {
    // console.log(data);

    const image = typeof data.image === "string" ? data.image : data.image[0];

    editCabin(
      { newCabinData: { ...data, image }, id: cabinToEdit.id },
      {
        onSuccess: () => {
          reset();
          onCloseModal();
        },
      }
    );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isEditing}
          {...register("name", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isEditing}
          {...register("maxCapacity", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isEditing}
          {...register("regularPrice", {
            required: "This Field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isEditing}
          {...register("discount", {
            required: "This Field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount should be less than regular Price",
          })}
          defaultValue={0}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isEditing}
          defaultValue=""
          {...register("description", {
            required: "This Field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id="image" accept="image/*" {...register("image")} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isEditing}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default EditCabinForm;
