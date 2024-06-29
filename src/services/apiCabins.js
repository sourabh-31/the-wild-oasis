import supabase, { supabaseUrl } from "./supabase";

//making operations to supabase
//get all cabins
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

// create a new cabin
export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin if there is a storage error
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could be uploaded and cabin could not be created"
    );
  }

  return data;
}

// Edit a cabin using cabin id
export async function editCabin(newCabin, id) {
  // console.log(newCabin);
  if (newCabin.image === undefined) throw new Error("Image is not selected");

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath =
    typeof newCabin.image === "string"
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be updated");
  }

  // 2. Upload image
  if (typeof newCabin.image !== "string") {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    // 3. Delete the cabin if there is a storage error
    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could be uploaded and cabin could not be created"
      );
    }
  }

  return data;
}

//Delete a cabin using cabin id
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}

//Duplicate a cabin

export async function duplicateCabin(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([cabin])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  return data;
}
