import mirrorCreator from 'mirror-creator';

export const formNames = mirrorCreator([
  'SUBMISSION',
]);

export const questionTypes = mirrorCreator([
  'MultipleChoice',
  'MultipleResponse',
  'Programming',
  'TextResponse',
  'FileUpload',
  'Scribing',
  'VoiceResponse',
]);

export const workflowStates = {
  Unstarted: 'unstarted',
  Attempting: 'attempting',
  Submitted: 'submitted',
  Graded: 'graded',
  Published: 'published',
};

export const TestCaseTypes = {
  Public: 'public_test',
  Private: 'private_test',
  Evaluation: 'evaluation_test',
};

export const scribingPopoverTypes = mirrorCreator([
  'TYPE',
  'DRAW',
  'LINE',
  'SHAPE',
  'LAYER',
]);

export const scribingToolColor = mirrorCreator([
  'TYPE',
  'DRAW',
  'LINE',
  'SHAPE_BORDER',
  'SHAPE_FILL',
]);

export const scribingToolThickness = mirrorCreator([
  'DRAW',
  'LINE',
  'SHAPE_BORDER',
]);

export const scribingToolLineStyle = mirrorCreator([
  'LINE',
  'SHAPE_BORDER',
]);

export const scribingTools = mirrorCreator([
  'TYPE',
  'DRAW',
  'LINE',
  'SHAPE',
  'SELECT',
  'PAN',
  'ZOOM_IN',
  'ZOOM_OUT',
  'DELETE',
]);

export const scribingShapes = mirrorCreator([
  'RECT',
  'ELLIPSE',
]);

export const canvasActionTypes = mirrorCreator([
  'SET_CANVAS',
  'SET_CANVAS_LOADED',
  'SET_TOOL_SELECTED',
  'SET_FONT_FAMILY',
  'SET_FONT_SIZE',
  'SET_LINE_STYLE_CHIP',
  'SET_COLORING_TOOL_COLOR',
  'SET_TOOL_THICKNESS',
  'SET_SELECTED_SHAPE',
  'SET_CANVAS_LOADED',
  'OPEN_POPOVER',
  'CLOSE_POPOVER',
  'ADD_LAYER',
  'SET_LAYER_DISPLAY',
  'SET_CANVAS_PROPERTIES',
  'SET_DRAWING_MODE',
  'SET_CANVAS_CURSOR',
  'SET_CANVAS_ZOOM',
  'RESET_CHANGE_TOOL',
  'DELETE_CANVAS_OBJECT',
  'RESET_CANVAS_DELETE',
  'SET_DISABLE_OBJECT_SELECTION',
  'RESET_DISABLE_OBJECT_SELECTION',
  'SET_ENABLE_OBJECT_SELECTION',
  'RESET_ENABLE_OBJECT_SELECTION',
  'SET_ENABLE_TEXT_SELECTION',
  'RESET_ENABLE_TEXT_SELECTION',
]);

const actionTypes = mirrorCreator([
  'FETCH_SUBMISSION_REQUEST', 'FETCH_SUBMISSION_SUCCESS', 'FETCH_SUBMISSION_FAILURE',
  'AUTOGRADE_SUBMISSION_REQUEST', 'AUTOGRADE_SUBMISSION_SUCCESS', 'AUTOGRADE_SUBMISSION_FAILURE',
  'SAVE_DRAFT_REQUEST', 'SAVE_DRAFT_SUCCESS', 'SAVE_DRAFT_FAILURE',
  'FINALISE_REQUEST', 'FINALISE_SUCCESS', 'FINALISE_FAILURE',
  'UNSUBMIT_REQUEST', 'UNSUBMIT_SUCCESS', 'UNSUBMIT_FAILURE',
  'AUTOGRADE_REQUEST', 'AUTOGRADE_SUCCESS', 'AUTOGRADE_FAILURE',
  'RESET_REQUEST', 'RESET_SUCCESS', 'RESET_FAILURE',
  'SAVE_GRADE_REQUEST', 'SAVE_GRADE_SUCCESS', 'SAVE_GRADE_FAILURE',
  'MARK_REQUEST', 'MARK_SUCCESS', 'MARK_FAILURE',
  'UNMARK_REQUEST', 'UNMARK_SUCCESS', 'UNMARK_FAILURE',
  'PUBLISH_REQUEST', 'PUBLISH_SUCCESS', 'PUBLISH_FAILURE',
  'RECORDER_SET_RECORDING', 'RECORDER_SET_UNRECORDING',
  'RECORDER_COMPONENT_MOUNT', 'RECORDER_COMPONENT_UNMOUNT',
  'CREATE_COMMENT_REQUEST', 'CREATE_COMMENT_SUCCESS', 'CREATE_COMMENT_FAILURE', 'CREATE_COMMENT_CHANGE',
  'UPDATE_COMMENT_REQUEST', 'UPDATE_COMMENT_SUCCESS', 'UPDATE_COMMENT_FAILURE', 'UPDATE_COMMENT_CHANGE',
  'DELETE_COMMENT_REQUEST', 'DELETE_COMMENT_SUCCESS', 'DELETE_COMMENT_FAILURE',
  'CREATE_ANNOTATION_REQUEST', 'CREATE_ANNOTATION_SUCCESS', 'CREATE_ANNOTATION_FAILURE', 'CREATE_ANNOTATION_CHANGE',
  'UPDATE_ANNOTATION_REQUEST', 'UPDATE_ANNOTATION_SUCCESS', 'UPDATE_ANNOTATION_FAILURE', 'UPDATE_ANNOTATION_CHANGE',
  'DELETE_ANNOTATION_REQUEST', 'DELETE_ANNOTATION_SUCCESS', 'DELETE_ANNOTATION_FAILURE',
  'DELETE_ATTACHMENT_REQUEST', 'DELETE_ATTACHMENT_SUCCESS', 'DELETE_ATTACHMENT_FAILURE',
  'UPDATE_GRADING', 'UPDATE_EXP', 'UPDATE_MULTIPLIER',

  'FETCH_SUBMISSIONS_REQUEST', 'FETCH_SUBMISSIONS_SUCCESS', 'FETCH_SUBMISSIONS_FAILURE',
  'PUBLISH_SUBMISSIONS_REQUEST', 'PUBLISH_SUBMISSIONS_SUCCESS', 'PUBLISH_SUBMISSIONS_FAILURE',
  'DOWNLOAD_SUBMISSIONS_REQUEST', 'DOWNLOAD_SUBMISSIONS_SUCCESS', 'DOWNLOAD_SUBMISSIONS_FAILURE',
  'DOWNLOAD_STATISTICS_REQUEST', 'DOWNLOAD_STATISTICS_SUCCESS', 'DOWNLOAD_STATISTICS_FAILURE',

  'SET_NOTIFICATION',
  // Scribing answer action types
  'SET_CANVAS_LOADED',
  'FETCH_SCRIBING_QUESTION_REQUEST', 'FETCH_SCRIBING_QUESTION_SUCCESS', 'FETCH_SCRIBING_QUESTION_FAILURE',
  'FETCH_SCRIBING_ANSWER_REQUEST', 'FETCH_SCRIBING_ANSWER_SUCCESS', 'FETCH_SCRIBING_ANSWER_FAILURE',
  'UPDATE_SCRIBING_ANSWER_REQUEST', 'UPDATE_SCRIBING_ANSWER_SUCCESS', 'UPDATE_SCRIBING_ANSWER_FAILURE',
  'UPDATE_SCRIBING_ANSWER_IN_LOCAL', 'CLEAR_SAVING_STATUS',
]);

export default actionTypes;
