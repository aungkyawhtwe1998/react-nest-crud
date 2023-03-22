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

const Settings = () => {
  const company = useSelector((state: RootState) => state.userReducer.company);
  console.log("company", company);
  const dispatch = useDispatch();
  const [companyInfo, setCompanyInfo] = useState<CompanyState>({
    id: company?.id || null,
    name: company?.name || "",
    address: company?.address || "",
    // imageUrl: company?.imageUrl || "",
    // coverPhoto: company?.coverPhoto || "",
    currency: company?.currency || "",
    serviceChargeRate: company?.serviceChargeRate || null,
    taxRate: company.taxRate || null,
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
    console.log(company?.id);

    console.log(companyInfo);
    mutate(companyInfo);
  };
  const { mutate, isLoading: updateLoading } = useMutation({
    mutationFn: (body: CompanyState) =>
      updateData(
        `company/edit/${company?.id}`,
        JSON.stringify({
          ...body,
        })
      ),
    onSuccess: () => {
      dispatch(updateCompany(companyInfo));
      setOpenFormDialog({
        open: true,
        type: "create",
        data: { _id: "", name: "", year: "" },
      });
      openSnackBar("You have successfully updated the company");
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
          Company Settings
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
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, name: e.target.value })
                }
                value={companyInfo?.name}
              />
            </Box>

            <Box>
              <FormLabel
                htmlFor="name"
                style={{ color: "black" }}>
                Address
              </FormLabel>
              <input
                type="text"
                id="address"
                placeholder="enter address"
                required
                className="block rounded p-2"
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, address: e.target.value })
                }
                value={companyInfo?.address}
              />
            </Box>
          </Box>

          <Box
            display="flex"
            gap={1}>
            <Box>
              <FormLabel
                htmlFor="name"
                style={{ color: "black" }}>
                Currency
              </FormLabel>
              <input
                type="text"
                id="currency"
                placeholder="$"
                required
                className="block rounded p-2"
                onChange={(e) =>
                  setCompanyInfo({ ...companyInfo, currency: e.target.value })
                }
                value={companyInfo?.currency}
              />
            </Box>

            <Box>
              <FormLabel
                htmlFor="name"
                style={{ color: "black" }}>
                Tax Rate (%)
              </FormLabel>

              <input
                type="number"
                id="tax-rate"
                placeholder="tax %"
                required
                className="block rounded p-2"
                onChange={(e) =>
                  setCompanyInfo({
                    ...companyInfo,
                    taxRate: Number(e.target.value),
                  })
                }
                value={Number(companyInfo?.taxRate)}
              />
            </Box>
          </Box>

          <Box>
            <FormLabel
              htmlFor="name"
              style={{ color: "black" }}>
              Service Charge Rate (%)
            </FormLabel>

            <input
              type="number"
              id="service-charge"
              placeholder="%"
              required
              className="block rounded p-2"
              onChange={(e) =>
                setCompanyInfo({
                  ...companyInfo,
                  serviceChargeRate: Number(e.target.value),
                })
              }
              value={Number(companyInfo?.serviceChargeRate)}
            />
          </Box>

          <button
            type="submit"
            className=" text-white bg-lime-700 hover:bg-lime-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
            Update
          </button>
        </form>
      </Paper>
      {/* <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
         
        </div>
      </div> */}
    </Box>
  );
};

export default Settings;
