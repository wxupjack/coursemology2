import { useMemo } from 'react';
import { defineMessages } from 'react-intl';

import ErrorCard from 'lib/components/core/ErrorCard';
import DataTable from 'lib/components/core/layouts/DataTable';
import LoadingIndicator from 'lib/components/core/LoadingIndicator';
import useTranslation from 'lib/hooks/useTranslation';

import { staffIndexShape } from '../../../propTypes/staff';

const options = {
  downloadOptions: {
    filename: 'staff_statistics',
  },
  jumpToPage: true,
  pagination: false,
  print: false,
  selectableRows: 'none',
  sortOrder: {
    name: 'averageMarkingTime',
    direction: 'asc',
  },
};

const translations = defineMessages({
  error: {
    id: 'course.statistics.StatisticsIndex.staff.error',
    defaultMessage:
      'Something went wrong when fetching staff statistics! Please refresh to try again.',
  },
  name: {
    id: 'course.statistics.StatisticsIndex.staff.name',
    defaultMessage: 'Name',
  },
  numGraded: {
    id: 'course.statistics.StatisticsIndex.staff.numGraded',
    defaultMessage: '# Marked',
  },
  numStudents: {
    id: 'course.statistics.StatisticsIndex.staff.numStudents',
    defaultMessage: '# Students',
  },
  averageMarkingTime: {
    id: 'course.statistics.StatisticsIndex.staff.averageMarkingTime',
    defaultMessage: 'Avg Time / Assessment',
  },
  stddev: {
    id: 'course.statistics.StatisticsIndex.staff.stddev',
    defaultMessage: 'Standard Deviation',
  },
  tableTitle: {
    id: 'course.statistics.StatisticsIndex.staff.tableTitle',
    defaultMessage: 'Staff Statistics',
  },
});

const StaffStatistics = ({ staff, isFetching, isError }) => {
  const { t } = useTranslation();
  const columns = useMemo(
    () => [
      {
        name: 'name',
        label: t(translations.name),
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: 'numGraded',
        label: t(translations.numGraded),
        options: {
          filter: false,
          sort: true,
          alignCenter: true,
        },
      },
      {
        name: 'numStudents',
        label: t(translations.numStudents),
        options: {
          filter: false,
          sort: true,
          alignCenter: true,
        },
      },
      {
        name: 'averageMarkingTime',
        label: t(translations.averageMarkingTime),
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: 'stddev',
        label: t(translations.stddev),
        options: {
          filter: false,
          sort: true,
        },
      },
    ],
    [t],
  );

  if (isFetching) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <ErrorCard message={t(translations.error)} />;
  }

  return (
    <DataTable
      columns={columns}
      data={staff}
      height="30px"
      includeRowNumber
      options={options}
      title={t(translations.tableTitle)}
    />
  );
};

StaffStatistics.propTypes = staffIndexShape;

export default StaffStatistics;
