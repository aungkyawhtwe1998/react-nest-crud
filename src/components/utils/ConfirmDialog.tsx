import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import * as React from "react";
import useConfirmDialog from "../../lib/hooks/useConfirmDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction="up"
      ref={ref}
      {...props}
    />
  );
});

type Props = {
  open: boolean;
};

function ConfirmDialog({ open }: Props) {
  const { closeConfirmDialog, onConfirm } = useConfirmDialog();
  const { confirmTitle } = useSelector(
    (state: RootState) => state.generalReducer
  );

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={closeConfirmDialog}
        area-aria-describedby="alert-dialog-slide-description"
        sx={{ textAlign: "center" }}>
        <DialogTitle>{confirmTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Click "Confirm" button to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={closeConfirmDialog}>Cancel</Button>
          <Button onDoubleClick={onConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default React.memo(ConfirmDialog);
