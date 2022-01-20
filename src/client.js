const GITHUB_API_ENDPOINT = 'https://api.github.com';

//TODO: add error handling
export const getPopularRepos = async () =>
  await fetch(
    `${GITHUB_API_ENDPOINT}/search/repositories?q=created:>=2021-12-12&sort=stars`
  )
    .then((response) => response.json())
    .then((data) => data.items);

export const getActiveUsers = async () =>
  await fetch(
    `${GITHUB_API_ENDPOINT}/search/users?q=created:>=2021-01-01&sort=followers`
  )
    .then((response) => response.json())
    .then((data) => data.items);

const getUser = async (username) =>
  await fetch(`${GITHUB_API_ENDPOINT}/users/${username}`)
    .then((response) => response.json())
    .then((data) => data);

export const resolveUsers = async (users) => {
  const fullUsers = [];

  for (const user of users) {
    const fullUser = await getUser(user.login);
    fullUsers.push(fullUser);
  }

  return fullUsers;
};
