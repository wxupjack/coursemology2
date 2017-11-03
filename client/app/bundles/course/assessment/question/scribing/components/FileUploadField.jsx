import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import createComponent from 'lib/components/redux-form/createComponent';
import mapError from 'lib/components/redux-form/mapError';

import SingleFileInput from 'lib/components/redux-form/SingleFileInput';
import { questionNamePrefix, questionIdPrefix } from '../constants';


const mapProps = props => ({ ...mapError(props) });

const propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  required: PropTypes.bool,
};

const FileUploadField = (props) => {
  const { field, label, isLoading, required } = props;

  return (
    <Field
      name={questionNamePrefix + field}
      id={questionIdPrefix + field}
      component={SingleFileInput}
      isNotBadge
      label={label}
      disabled={isLoading}
      accept="image/gif, image/png, image/jpeg, image/pjpeg, application/pdf"
      required={required}
    />
  );
};

FileUploadField.propTypes = propTypes;

export default createComponent(FileUploadField, mapProps);
