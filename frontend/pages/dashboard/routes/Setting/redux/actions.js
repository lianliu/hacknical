import { createAction, createActions } from 'redux-actions';
import objectAssign from 'object-assign';
import Api from 'API/index';

const {
  toggleSettingLoading,
  setUpdateTime,
  initialResumeShareInfo,
  initialGithubShareInfo
} = createActions(
  'TOGGLE_SETTING_LOADING',
  'SET_UPDATE_TIME',
  'INITIAL_RESUME_SHARE_INFO',
  'INITIAL_GITHUB_SHARE_INFO',
);

// github data update
const fetchGithubUpdateTime = () => (dispatch, getState) => {
  Api.github.getUpdateTime().then((result) => {
    dispatch(setUpdateTime(result));
  });
};

const refreshGithubDatas = () => (dispatch, getState) => {
  dispatch(toggleSettingLoading(true));
  Api.github.refresh().then((result) => {
    dispatch(setUpdateTime(result));
  });
};

// github share
const fetchGithubShareInfo = () => (dispatch, getState) => {
  Api.github.getShareData().then((result) => {
    dispatch(initialGithubShareInfo(result));
  });
};

const postGithubShareStatus = () => (dispatch, getState) => {
  const { openShare } = getState().setting.githubInfo;
  Api.github.toggleShare(!openShare).then((result) => {
    dispatch(initialGithubShareInfo({
      openShare: !openShare
    }));
  });
};

// resume
const fetchResumeShareInfo = () => (dispatch, getState) => {
  Api.resume.getPubResumeStatus().then((result) => {
    dispatch(initialResumeShareInfo({
      useGithub: result.useGithub,
      openShare: result.openShare
    }));
  });
};

const postResumeGithubStatus = () => (dispatch, getState) => {
  const { useGithub, openShare } = getState().setting.resumeInfo;
  Api.resume.postPubResumeGithubStatus(!useGithub).then((result) => {
    dispatch(initialResumeShareInfo({
      useGithub: !useGithub,
      openShare
    }));
  });
};

const postResumeShareStatus = () => (dispatch, getState) => {
  const { useGithub, openShare } = getState().setting.resumeInfo;
  Api.resume.postPubResumeShareStatus(!openShare).then((result) => {
    dispatch(initialResumeShareInfo({
      useGithub,
      openShare: !openShare
    }));
  });
};


export default {
  // github
  toggleSettingLoading,
  setUpdateTime,
  fetchGithubUpdateTime,
  refreshGithubDatas,
  // github share
  fetchGithubShareInfo,
  initialGithubShareInfo,
  postGithubShareStatus,
  // resume
  initialResumeShareInfo,
  fetchResumeShareInfo,
  postResumeGithubStatus,
  postResumeShareStatus,
}
