import { useState } from 'react';
import { IconButton, IconButtonProps, Tooltip } from '@mui/material';
import Delete from '@mui/icons-material/Delete';
import ConfirmationDialog from '../dialogs/ConfirmationDialog';

interface Props extends IconButtonProps {
  disabled: boolean;
  loading?: boolean;
  onClick: () => Promise<void>;
  confirmMessage?: string;
  tooltip?: string;
}

const DeleteButton = ({
  disabled,
  onClick,
  confirmMessage,
  tooltip = '',
  loading = false,
  ...props
}: Props): JSX.Element => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Tooltip title={tooltip || 'Delete'}>
        <span>
          <IconButton
            disabled={disabled}
            onClick={(): void => {
              if (confirmMessage) {
                setDialogOpen(true);
              } else {
                onClick();
              }
            }}
            color="error"
            {...props}
            data-testid="DeleteIconButton"
          >
            <Delete data-testid="DeleteIcon" />
          </IconButton>
        </span>
      </Tooltip>
      {dialogOpen && (
        <ConfirmationDialog
          message={confirmMessage}
          disableCancelButton={disabled}
          disableConfirmButton={disabled}
          loadingConfirmButton={loading}
          open={dialogOpen}
          onCancel={(): void => setDialogOpen(false)}
          onConfirm={(): void => {
            onClick().finally(() => setDialogOpen(false));
          }}
        />
      )}
    </>
  );
};
export default DeleteButton;
