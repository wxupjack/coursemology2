import { FC, ReactElement, useState } from 'react';
import { defineMessages, injectIntl, WrappedComponentProps } from 'react-intl';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  CircularProgress,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { debounceSearchRender } from 'mui-datatables';
import {
  TableColumns,
  TableOptions,
  TableState,
} from 'types/components/DataTable';
import { AppDispatch } from 'types/store';
import {
  InstanceAdminStats,
  InstanceUserMiniEntity,
  InstanceUserRole,
} from 'types/system/instance/users';

import DataTable from 'lib/components/core/layouts/DataTable';
import {
  FIELD_DEBOUNCE_DELAY,
  INSTANCE_USER_ROLES,
  TABLE_ROWS_PER_PAGE,
} from 'lib/constants/sharedConstants';
import rebuildObjectFromRow from 'lib/helpers/mui-datatables-helpers';
import tableTranslations from 'lib/translations/table';

import { indexUsers, updateUser } from '../../operations';

interface Props extends WrappedComponentProps {
  users: InstanceUserMiniEntity[];
  userCounts: InstanceAdminStats;
  title: string;
  filter: { active: boolean; role: string };
  renderRowActionComponent: (user: InstanceUserMiniEntity) => ReactElement;
}

const translations = defineMessages({
  searchText: {
    id: 'system.admin.instance.components.tables.UsersTable.searchPlaceholder',
    defaultMessage: 'Search user name or emails',
  },
  renameSuccess: {
    id: 'system.admin.instance.user.rename.success',
    defaultMessage: '{oldName} was renamed to {newName}.',
  },
  changeRoleSuccess: {
    id: 'system.admin.instance.user.changeRole.success',
    defaultMessage: "Successfully changed {name}'s role to {role}.",
  },
  updateNameFailure: {
    id: 'system.admin.instance.user.update.updateNameFailure',
    defaultMessage: "Failed to update user's name.",
  },
  updateRoleFailure: {
    id: 'system.admin.instance.user.update.updateRoleFailure',
    defaultMessage: "Failed to update user's role.",
  },
  fetchFilteredUsersFailure: {
    id: 'system.admin.instance.users.fetchFiltered.failure',
    defaultMessage: 'Failed to fetch users.',
  },
});

const UsersTable: FC<Props> = (props) => {
  const { title, renderRowActionComponent, intl, users, userCounts, filter } =
    props;
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [tableState, setTableState] = useState<TableState>({
    count: userCounts.usersCount,
    page: 1,
    searchText: '',
  });

  const handleRoleUpdate = (
    rowData,
    newRole: string,
    updateValue,
  ): Promise<void> => {
    const user = rebuildObjectFromRow(
      columns, // eslint-disable-line @typescript-eslint/no-use-before-define
      rowData,
    ) as InstanceUserMiniEntity;
    const newUser = {
      ...user,
      role: newRole as InstanceUserRole,
    };
    return dispatch(updateUser(user.id, newUser))
      .then(() => {
        updateValue(newRole);
        toast.success(
          intl.formatMessage(translations.changeRoleSuccess, {
            name: user.name,
            role: INSTANCE_USER_ROLES[newRole],
          }),
        );
      })
      .catch(() => {
        toast.error(intl.formatMessage(translations.updateRoleFailure));
      });
  };

  const changePage = (page): void => {
    setIsLoading(true);
    setTableState({
      ...tableState,
      page,
    });
    dispatch(
      indexUsers({
        'filter[page_num]': page,
        'filter[length]': TABLE_ROWS_PER_PAGE,
        role: filter.role,
        active: filter.active,
      }),
    )
      .catch(() =>
        toast.error(intl.formatMessage(translations.fetchFilteredUsersFailure)),
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const search = (page: number, searchText?: string): void => {
    setIsLoading(true);
    setTableState({
      ...tableState,
      count: userCounts.usersCount,
    });
    dispatch(
      indexUsers({
        'filter[page_num]': page,
        'filter[length]': TABLE_ROWS_PER_PAGE,
        role: filter.role,
        active: filter.active,
        search: searchText ? searchText.trim() : searchText,
      }),
    )
      .catch(() =>
        toast.error(intl.formatMessage(translations.fetchFilteredUsersFailure)),
      )
      .finally(() => {
        setIsLoading(false);
      });
  };

  const options: TableOptions = {
    count: tableState.count,
    customSearchRender: debounceSearchRender(FIELD_DEBOUNCE_DELAY),
    download: false,
    filter: false,
    jumpToPage: true,
    onTableChange: (action, newTableState) => {
      switch (action) {
        case 'search':
          search(newTableState.page! + 1, newTableState.searchText);
          break;
        case 'changePage':
          changePage(newTableState.page! + 1);
          break;
        default:
          break;
      }
    },
    pagination: true,
    print: false,
    rowsPerPage: TABLE_ROWS_PER_PAGE,
    rowsPerPageOptions: [TABLE_ROWS_PER_PAGE],
    search: true,
    searchPlaceholder: intl.formatMessage(translations.searchText),
    selectableRows: 'none',
    serverSide: true,
    setTableProps: (): Record<string, unknown> => {
      return { size: 'small' };
    },
    setRowProps: (_row, _dataIndex, rowIndex): Record<string, unknown> => {
      return {
        key: `user_${users[rowIndex].id}`,
        userid: `user_${users[rowIndex].id}`,
        className: `instance_user instance_user_${users[rowIndex].id}`,
      };
    },
    viewColumns: false,
  };

  const columns: TableColumns[] = [
    {
      name: 'id',
      label: '',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'userId',
      label: '',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'masqueradePath',
      label: '',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'canMasquerade',
      label: '',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'name',
      label: intl.formatMessage(tableTranslations.name),
      options: {
        alignCenter: false,
        sort: false,
      },
    },
    {
      name: 'email',
      label: intl.formatMessage(tableTranslations.email),
      options: {
        alignCenter: false,
        sort: false,
        customBodyRenderLite: (dataIndex): JSX.Element => {
          const user = users[dataIndex];
          return (
            <Typography
              key={`email-${user.id}`}
              className="user_email"
              variant="body2"
            >
              {user.email}
            </Typography>
          );
        },
      },
    },
    {
      name: 'courses',
      label: intl.formatMessage(tableTranslations.relatedCourses),
      options: {
        alignCenter: false,
        sort: false,
        customBodyRenderLite: (dataIndex): JSX.Element => {
          const user = users[dataIndex];
          return (
            <Typography
              key={`courses-${user.id}`}
              className="user_courses"
              variant="body2"
            >
              <a href={`/users/${user.id}`} rel="noreferrer" target="_blank">
                {user.courses}
              </a>
            </Typography>
          );
        },
      },
    },
    {
      name: 'role',
      label: intl.formatMessage(tableTranslations.role),
      options: {
        alignCenter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue): JSX.Element => {
          const userId = tableMeta.rowData[0];
          return (
            <TextField
              key={`role-${userId}`}
              className="user_role"
              id={`role-${userId}`}
              onChange={(e): Promise<void> =>
                handleRoleUpdate(tableMeta.rowData, e.target.value, updateValue)
              }
              select
              value={value}
              variant="standard"
            >
              {Object.keys(INSTANCE_USER_ROLES).map((option) => (
                <MenuItem
                  key={`role-${userId}-${option}`}
                  id={`role-${userId}-${option}`}
                  value={option}
                >
                  {INSTANCE_USER_ROLES[option]}
                </MenuItem>
              ))}
            </TextField>
          );
        },
      },
    },
    {
      name: 'actions',
      label: intl.formatMessage(tableTranslations.actions),
      options: {
        empty: true,
        sort: false,
        alignCenter: true,
        customBodyRender: (_value, tableMeta): JSX.Element => {
          const rowData = tableMeta.rowData as InstanceUserMiniEntity;
          const user = rebuildObjectFromRow(columns, rowData);
          return renderRowActionComponent(user);
        },
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      isLoading={isLoading}
      options={options}
      title={
        <Typography variant="h6">
          {title}
          {isLoading && (
            <CircularProgress className="relative top-1 ml-4" size={24} />
          )}
        </Typography>
      }
      withMargin
    />
  );
};

export default injectIntl(UsersTable);
