import React, { FormEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/store";
import { CompanyState } from "../../../lib/types";
import { Box, FormLabel, Paper, TextField } from "@mui/material";
import { Label } from "@mui/icons-material";
import { useMutation } from "react-query";
import { postData, updateData } from "../../../lib/fetcher";
import { updateCompany } from "../../../lib/store/userSlice";
import useSnackBar from "../../../lib/hooks/useSnackBar";
import useConfirmDialog from "../../../lib/hooks/useConfirmDialog";
import ConfirmDialog from "../../../components/utils/ConfirmDialog";

const MenuCategories = () => {
  const location = useSelector((state: RootState) => state.userReducer.location);
  const dispatch = useDispatch();
  const [name, setName] = useState<string>("");
  const [selectedMenuCate, setSelectedMenuCate] = useState<any>({
    id: null,
    name: ""
  });

  const [openFormDialog, setOpenFormDialog] = useState<{
    open: boolean;
    type: string;
    data: { _id?: string; name?: string; year?: string };
  }>({
    open: false,
    type: "create",
    data: { _id: "", name: "", year: "" },
  });
  const { openSnackBar } = useSnackBar();
  const { showConfirmDialog, openConfirmDialog } = useConfirmDialog();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(location?.id);
    mutate(name);
  };
  const { mutate, isLoading: updateLoading } = useMutation({
    mutationFn: (body: string) =>
      updateData(
        `menu-category/?location_id=${location?.id}`,
        JSON.stringify({
          name,
        })
      ),
    onSuccess: () => {
      setOpenFormDialog({
        open: true,
        type: "create",
        data: { _id: "", name: "", year: "" },
      });
      openSnackBar("You have successfully updated the menuCategory");
    },
    onError: (error: any) => {
      openSnackBar(error?.message || "Something went wrong");
    },
  });
  return (
    <Box
      component="section"
      sx={{ width: "100%" }}>
      <ConfirmDialog open={showConfirmDialog} />
      <Paper
        sx={{
          width: "100%",
          backgroundColor: "transparent",
          padding: "10px",
          overflow: "hidden",
        }}>
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
          Create Menu Category
        </h1>
        <form
          onSubmit={onSubmit}
          className="space-y-4 md:space-y-6">
          <Box
            display="flex"
            gap={1}>
            <Box>
              <FormLabel
                htmlFor="name"
                style={{ color: "black" }}>
                Name
              </FormLabel>
              <input
                type="text"
                id="name"
                placeholder="mg123"
                required
                className="block rounded p-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </Box>
          </Box>

          <button
            type="submit"
            className=" text-white bg-lime-700 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Update
          </button>

          <Box>
            {
              
            }
          </Box>
        </form>
      </Paper>
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
         
        </div>
      </div> */}
    </Box>
  );
};

export default MenuCategories;
