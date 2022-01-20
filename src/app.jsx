import React, { useState, useEffect } from 'react';

import { getPopularRepos, getActiveUsers, resolveUsers } from './client';

import RefreshableTable from './refreshable-table';

import './app.scss';

const REPO_HEADERS = ['id', 'name', 'description', 'stars'];
const USER_HEADERS = ['id', 'login', 'avatar', 'followers'];

const App = () => {
  const [repos, setRepos] = useState([]);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingRepos, setLoadingRepos] = useState(false);

  useEffect(() => {
    refreshRepos();
    refreshUsers();

    const refreshUsersInterval = setInterval(() => {
      refreshUsers();
    }, 120000);

    return () => clearInterval(refreshUsersInterval);
  }, []);

  const refreshRepos = async () => {
    setLoadingRepos(true);
    const popularRepos = await getPopularRepos();

    const firstFiveRepos = popularRepos.slice(0, 5);

    setRepos(firstFiveRepos);
    setLoadingRepos(false);
  };

  const refreshUsers = async () => {
    setLoadingUsers(true);
    const activeUsers = await getActiveUsers();

    const firstFiveUsers = activeUsers.slice(0, 5);

    const fullUsers = await resolveUsers(firstFiveUsers);

    setUsers(fullUsers);
    setLoadingUsers(false);
  };

  const formatRepoRows = (unformattedRepos) =>
    unformattedRepos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
    }));

  const formatUserRows = (unformattedUsers) =>
    unformattedUsers.map((user) => ({
      id: user.id,
      login: user.login,
      avatar_url: user.avatar_url,
      followers: user.followers,
    }));

  return (
    <div className='github-toplist'>
      <div>
        <h2>Most starred repos since 2021-12-12</h2>
        <RefreshableTable
          headers={REPO_HEADERS}
          rows={formatRepoRows(repos)}
          doRefresh={refreshRepos}
          loading={loadingRepos}
          refreshButtonId={'hot_repo'}
        />
      </div>
      <div>
        <h2>Most followed users since 2021-01-01</h2>
        <RefreshableTable
          headers={USER_HEADERS}
          rows={formatUserRows(users)}
          doRefresh={refreshUsers}
          loading={loadingUsers}
          refreshButtonId={'profilic_users'}
        />
      </div>
    </div>
  );
};

export default App;
