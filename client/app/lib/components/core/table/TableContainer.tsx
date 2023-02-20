import { ComponentRef, forwardRef, ReactNode } from 'react';
import {
  Paper as MuiPaper,
  Table as MuiTable,
  TableContainer as MuiTableContainer,
} from '@mui/material';

import { TableContainerProps } from './template';

const TableContainer = forwardRef<
  ComponentRef<typeof MuiTableContainer>,
  TableContainerProps & { children: ReactNode }
>(
  (props, ref): JSX.Element => (
    <MuiTableContainer
      ref={ref}
      className={`${props.stickyHeader ? 'overflow-x-visible' : ''} ${
        props.className ?? ''
      }`}
      component={MuiPaper}
      elevation={props.variant === 'bare' ? 0 : undefined}
      square={props.variant === 'bare'}
      variant={props.variant === 'bare' ? 'elevation' : props.variant}
    >
      <MuiTable
        className="border-separate"
        size={props.dense ? 'small' : 'medium'}
      >
        {props.children}
      </MuiTable>
    </MuiTableContainer>
  ),
);

TableContainer.displayName = 'TableContainer';

export default TableContainer;
