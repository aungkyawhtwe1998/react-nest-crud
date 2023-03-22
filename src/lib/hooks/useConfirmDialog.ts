import { useDispatch } from "react-redux";
import { RootState } from "./../store/index";
import { useSelector } from "react-redux";
import { toggleDialog } from "../store/generalSlice";
let callbackFunction: Function = function () {};
const useConfirmDialog = () => {
  const { showConfirmDialog } = useSelector(
    (state: RootState) => state.generalReducer
  );

  const dispatch = useDispatch();

  function closeConfirmDialog() {
    dispatch(toggleDialog({ show: false, title: "" }));
  }

  function openConfirmDialog(callback: Function, title: string) {
    dispatch(toggleDialog({ show: true, title: title }));
    callbackFunction = callback;
  }

  function onConfirm() {
    callbackFunction();
    dispatch(toggleDialog({ show: false, title: "" }));
  }

  return {
    closeConfirmDialog,
    openConfirmDialog,
    showConfirmDialog,
    onConfirm,
  };
};

export default useConfirmDialog;
