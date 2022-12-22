import { defineMessages, useIntl } from 'react-intl';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

import ErrorCard from 'lib/components/core/ErrorCard';
import DataTable from 'lib/components/core/layouts/DataTable';
import Link from 'lib/components/core/Link';
import LoadingIndicator from 'lib/components/core/LoadingIndicator';
import { DEFAULT_TABLE_ROWS_PER_PAGE } from 'lib/constants/sharedConstants';

import { studentsIndexShape } from '../../../propTypes/students';

const options = {
  downloadOptions: {
    filename: 'students_statistics',
  },
  jumpToPage: true,
  print: false,
  rowsPerPage: DEFAULT_TABLE_ROWS_PER_PAGE,
  rowsPerPageOptions: [DEFAULT_TABLE_ROWS_PER_PAGE],
  selectableRows: 'none',
  sortOrder: {
    name: 'experiencePoints',
    direction: 'desc',
  },
};

const translations = defineMessages({
  error: {
    id: 'course.statistics.StatisticsIndex.students.error',
    defaultMessage:
      'Something went wrong when fetching student statistics! Please refresh to try again.',
  },
  name: {
    id: 'course.statistics.StatisticsIndex.students.name',
    defaultMessage: 'Name',
  },
  studentType: {
    id: 'course.statistics.StatisticsIndex.students.studentsType',
    defaultMessage: 'Student Type',
  },
  groupManagers: {
    id: 'course.statistics.StatisticsIndex.students.groupManagers',
    defaultMessage: 'Tutors',
  },
  level: {
    id: 'course.statistics.StatisticsIndex.students.level',
    defaultMessage: 'Level',
  },
  experiencePoints: {
    id: 'course.statistics.StatisticsIndex.students.experiencePoints',
    defaultMessage: 'Experience Points',
  },
  videoSubmissionCount: {
    id: 'course.statistics.StatisticsIndex.students.videoSubmissionCount',
    defaultMessage: 'Videos Watched (Total: {courseVideoCount})',
  },
  videoPercentWatched: {
    id: 'course.statistics.StatisticsIndex.students.videoPercentWatched',
    defaultMessage: 'Average % Watched',
  },
  tableTitle: {
    id: 'course.statistics.StatisticsIndex.students.tableTitle',
    defaultMessage: 'Student Statistics',
  },
});

const LinearProgressWithLabel = (props) => (
  <Box sx={{ display: 'flex', alignItems: 'center' }}>
    <Box sx={{ width: '100%', mr: 1 }}>
      <LinearProgress variant="determinate" {...props} />
    </Box>
    <Box sx={{ minWidth: 35 }}>
      <Typography color="text.secondary" variant="body2">{`${Math.round(
        props.value ?? 0,
      )}%`}</Typography>
    </Box>
  </Box>
);

LinearProgressWithLabel.propTypes = {
  /**
   * Value between 0 and 100.
   */
  value: PropTypes.number,
};

const StudentsStatistics = ({ metadata, students, isFetching, isError }) => {
  const { isCourseGamified, showVideo, courseVideoCount, hasGroupManagers } =
    metadata;
  const intl = useIntl();

  if (isFetching) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <ErrorCard message={intl.formatMessage(translations.error)} />;
  }
  const columns = [
    {
      name: 'name',
      label: intl.formatMessage(translations.name),
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'studentType',
      label: intl.formatMessage(translations.studentType),
      options: {
        filter: false,
        sort: true,
      },
    },
  ];

  if (hasGroupManagers) {
    columns.push({
      name: 'groupManagers',
      label: intl.formatMessage(translations.groupManagers),
      options: {
        filter: true,
        sort: true,
      },
    });
  }
  if (isCourseGamified) {
    columns.push({
      name: 'level',
      label: intl.formatMessage(translations.level),
      options: {
        filter: true,
        sort: true,
      },
    });
    columns.push({
      name: 'experiencePoints',
      label: intl.formatMessage(translations.experiencePoints),
      options: {
        filter: false,
        sort: true,
        alignCenter: true,
        customBodyRenderLite: (dataIndex) => {
          const student = students[dataIndex];
          return (
            <Link
              key={student.id}
              href={student.experiencePointsLink}
              opensInNewTab
            >
              {student.experiencePoints}
            </Link>
          );
        },
      },
    });
  }
  if (showVideo) {
    columns.push({
      name: 'videoSubmissionCount',
      label: intl.formatMessage(translations.videoSubmissionCount, {
        courseVideoCount,
      }),
      options: {
        alignCenter: true,
        customBodyRenderLite: (dataIndex) => {
          const student = students[dataIndex];
          return (
            <Link
              key={student.id}
              href={student.videoSubmissionLink}
              opensInNewTab
            >
              {student.videoSubmissionCount}
            </Link>
          );
        },
      },
    });
    columns.push({
      name: 'videoPercentWatched',
      label: intl.formatMessage(translations.videoPercentWatched),
      options: {
        filter: false,
        sort: true,
        alignCenter: true,
        customBodyRender: (value) => (
          <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={value} />
          </Box>
        ),
      },
    });
  }

  return (
    <DataTable
      columns={columns}
      data={students}
      height="30px"
      includeRowNumber
      options={options}
      title={intl.formatMessage(translations.tableTitle)}
    />
  );
};

StudentsStatistics.propTypes = studentsIndexShape;

export default StudentsStatistics;
