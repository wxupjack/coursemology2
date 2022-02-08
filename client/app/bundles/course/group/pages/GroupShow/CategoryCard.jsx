import React, { useCallback, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  defineMessages,
  FormattedMessage,
  injectIntl,
  intlShape,
} from 'react-intl';
import { connect } from 'react-redux';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import { red500 } from 'material-ui/styles/colors';

import ConfirmationDialog from 'lib/components/ConfirmationDialog';

import actionTypes, { dialogTypes } from '../../constants';
import { deleteCategory, updateCategory } from '../../actions';
import { categoryShape } from '../../propTypes';
import GroupFormDialog from '../../forms/GroupFormDialog';
import NameDescriptionForm from '../../forms/NameDescriptionForm';
import GroupCard from '../../components/GroupCard';

const translations = defineMessages({
  updateSuccess: {
    id: 'course.group.show.categoryCard.update.success',
    defaultMessage: '{categoryName} was successfully updated.',
  },
  updateFailure: {
    id: 'course.group.show.categoryCard.update.fail',
    defaultMessage: 'Failed to update {categoryName}.',
  },
  deleteSuccess: {
    id: 'course.group.show.categoryCard.delete.success',
    defaultMessage: '{categoryName} was successfully deleted.',
  },
  deleteFailure: {
    id: 'course.group.show.categoryCard.delete.fail',
    defaultMessage: 'Failed to delete {categoryName}.',
  },
  edit: {
    id: 'course.group.show.categoryCard.edit',
    defaultMessage: 'Edit',
  },
  manage: {
    id: 'course.group.show.categoryCard.manage',
    defaultMessage: 'Manage Groups',
  },
  delete: {
    id: 'course.group.show.categoryCard.delete',
    defaultMessage: 'Delete Category',
  },
  subtitle: {
    id: 'course.group.show.categoryCard.subtitle',
    defaultMessage:
      '{numGroups} {numGroups, plural, one {group} other {groups}}',
  },
  noDescription: {
    id: 'course.group.show.categoryCard.noDescription',
    defaultMessage: 'No description available.',
  },
  dialogTitle: {
    id: 'course.group.show.categoryCard.dialogTitle',
    defaultMessage: 'Edit Category',
  },
});

const CategoryCard = ({
  category,
  numGroups,
  intl,
  onManageGroups,
  dispatch,
}) => {
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  const onFormSubmit = useCallback(
    (data) =>
      dispatch(
        updateCategory(
          category.id,
          data,
          intl.formatMessage(translations.updateSuccess, {
            categoryName: category.name,
          }),
          intl.formatMessage(translations.updateFailure, {
            categoryName: category.name,
          }),
        ),
      ),
    [dispatch, category.id, category.name],
  );

  const handleEdit = useCallback(() => {
    dispatch({ type: actionTypes.UPDATE_CATEGORY_FORM_SHOW });
  }, [dispatch]);

  const handleDelete = useCallback(() => {
    dispatch(
      deleteCategory(
        category.id,
        intl.formatMessage(translations.deleteSuccess, {
          categoryName: category.name,
        }),
        intl.formatMessage(translations.deleteFailure, {
          categoryName: category.name,
        }),
      ),
    ).then(() => {
      setIsConfirmingDelete(false);
    });
  }, [dispatch, category.id, category.name, setIsConfirmingDelete]);

  const bottomButtons = useMemo(
    () => [
      {
        label: <FormattedMessage {...translations.edit} />,
        onClick: handleEdit,
      },
      {
        label: <FormattedMessage {...translations.manage} />,
        onClick: onManageGroups,
      },
      {
        label: <FormattedMessage {...translations.delete} />,
        onClick: () => setIsConfirmingDelete(true),
        isRight: true,
        icon: <DeleteIcon color={red500} />,
      },
    ],
    [handleEdit, onManageGroups, setIsConfirmingDelete],
  );

  return (
    <>
      <GroupCard
        title={category.name}
        subtitle={
          <FormattedMessage values={{ numGroups }} {...translations.subtitle} />
        }
        bottomButtons={bottomButtons}
      >
        {category.description ?? (
          <FormattedMessage {...translations.noDescription} />
        )}
      </GroupCard>
      <GroupFormDialog
        dialogTitle={intl.formatMessage(translations.dialogTitle)}
        expectedDialogTypes={[dialogTypes.UPDATE_CATEGORY]}
      >
        <NameDescriptionForm
          onSubmit={onFormSubmit}
          initialValues={{
            name: category.name,
            description: category.description,
          }}
        />
      </GroupFormDialog>
      <ConfirmationDialog
        confirmDiscard={!isConfirmingDelete}
        confirmDelete={isConfirmingDelete}
        open={isConfirmingDelete}
        onCancel={() => {
          setIsConfirmingDelete(false);
        }}
        onConfirm={() => {
          handleDelete();
        }}
      />
    </>
  );
};

CategoryCard.propTypes = {
  category: categoryShape.isRequired,
  dispatch: PropTypes.func.isRequired,
  numGroups: PropTypes.number.isRequired,
  onManageGroups: PropTypes.func.isRequired,
  intl: intlShape,
};

export default connect()(injectIntl(CategoryCard));
