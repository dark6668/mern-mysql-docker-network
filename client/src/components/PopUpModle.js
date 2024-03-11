import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

export default function PopUpModal(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 750,
    height: 750,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    userSelect: "none",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <Modal
      open={props.handleOpen}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Button
          onClick={props.handleClose}
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          X
        </Button>
        {props.children}
      </Box>
    </Modal>
  );
}
