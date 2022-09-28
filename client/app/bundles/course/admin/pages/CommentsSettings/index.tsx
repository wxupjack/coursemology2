import { useState } from 'react';
import { toast } from 'react-toastify';

import { CommentsSettingsData } from 'types/course/admin/comments';
import useTranslation from 'lib/hooks/useTranslation';
import translations from 'lib/translations/form';
import { FormEmitter } from 'lib/components/form/Form';
import useSuspendedFetch from 'lib/hooks/useSuspendedFetch';
import CommentsSettingsForm from './CommentsSettingsForm';
import { fetchCommentsSettings, updateCommentsSettings } from './operations';
import { useOptionsReloader } from '../../components/SettingsNavigation';

const CommentsSettings = (): JSX.Element => {
  const { data: settings } = useSuspendedFetch(fetchCommentsSettings);
  const reloadOptions = useOptionsReloader();
  const { t } = useTranslation();
  const [form, setForm] = useState<FormEmitter>();

  const handleSubmit = (data: CommentsSettingsData): void => {
    updateCommentsSettings(data)
      .then((newData) => {
        if (!newData) return;
        form?.resetTo?.(newData);
        reloadOptions();
        toast.success(t(translations.changesSaved));
      })
      .catch((error: Error) => {
        toast.error(error.message);
      });
  };

  return (
    <CommentsSettingsForm
      data={settings}
      onSubmit={handleSubmit}
      emitsVia={setForm}
    />
  );
};

export default CommentsSettings;
