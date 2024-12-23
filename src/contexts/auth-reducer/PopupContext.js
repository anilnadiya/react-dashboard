import React, { createContext, useState, useContext } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popupState, setPopupState] = useState({
    open: false,
    title: '',
    message: '',
    onConfirm: null,
  });

  const openPopup = (title, message, onConfirm) => {
    setPopupState({ open: true, title, message, onConfirm });
  };

  const closePopup = () => {
    setPopupState((prev) => ({ ...prev, open: false }));
  };

  return (
    <PopupContext.Provider value={{ openPopup, closePopup }}>
      {children}
      <Dialog
        open={popupState.open}
        onClose={closePopup}
        aria-labelledby="global-dialog-title"
        aria-describedby="global-dialog-description"
      >
        <DialogTitle id="global-dialog-title">{popupState.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="global-dialog-description">{popupState.message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              popupState.onConfirm();
              closePopup();
            }}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
