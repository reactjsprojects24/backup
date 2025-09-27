import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledDialog = styled(Dialog)({
  "& .MuiPaper-root": {
    borderRadius: "16px",
    padding: "16px",
    width: "380px",
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: "8px",
  padding: "6px 16px",
}));

const ResetPasswordDialog = ({ open, onClose }) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "18px" }}>Password Resetted Successfully!</DialogTitle>
      <DialogContent>
        <Typography variant="body2" sx={{ color: "#6B7280", marginTop: "4px" }}>
          Thank you for registering. Your request is under review. You'll receive an email once approved.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-end", padding: "16px" }}>
        <StyledButton onClick={onClose} sx={{ color: "#0369A1" }}>Cancle</StyledButton>
        <StyledButton onClick={onClose} variant="contained" sx={{ backgroundColor: "#0369A1", ":hover": { backgroundColor: "#034C8C" } }}>Ok</StyledButton>
      </DialogActions>
    </StyledDialog>
  );
};

export default ResetPasswordDialog;
