import axios from "axios";
import { format } from "date-fns";

const AUTH = { auth: { username: "joshatoutthink", password: "GITfreedom2" } };
async function getRepos(user) {
  const url = await `https://api.github.com/users/${user}/repos`;
  const res = await axios.get(url, AUTH);
  const { data } = await res;
  const repos = await data.map(
    ({
      name,
      full_name,
      created_at,
      updated_at,
      language,
      git_url,
      description,
    }) => {
      const desc = description !== null ? description.replace("  ", "") : "";
      return {
        name,
        full_name,
        created_at,
        updated_at,
        language,
        url: git_url,
        description: desc,
      };
    }
  );
  return repos;
}

async function getCommitsByWeek(user) {
  try {
    const allRepoNames = await getRepos(user);
    const repoURLs = await allRepoNames.map(({ full_name, name }) => {
      return {
        name,
        url: `https://api.github.com/repos/${full_name}/stats/contributors`,
      };
    });

    const theStuff = await Promise.all(
      repoURLs.map(({ url, name }) =>
        axios.get(url, AUTH).then(({ data }) => {
          const repoData = data[0].weeks.map(week => {
            return { w: week.w, c: week.c, a: week.a };
          });
          //console.log(name, info);
          return { name, repoData };
        })
      )
    );
    return theStuff;
  } catch (e) {
    const allRepoNames = await getRepos(user);
    const repoURLs = await allRepoNames.map(({ full_name, name }) => {
      return {
        name,
        url: `https://api.github.com/repos/${full_name}/stats/contributors`,
      };
    });

    const theStuff = await Promise.all(
      repoURLs.map(({ url, name }) =>
        axios.get(url, AUTH).then(({ data }) => {
          const info = data[0].weeks.map(week => {
            return { w: week.w, c: week.c, a: week.a };
          });
          //console.log(name, info);
          return { name, info };
        })
      )
    );
    return theStuff;
  }
}

/*  catch (e) {
    console.log(e);
    const url = await `https://api.github.com/repos/${full_name}/stats/contributors`;
    const { data } = await axios.get(url, AUTH);
    const { weeks } = await data[0];
    const formated = await weeks.map(week => {
      const { w, c } = week;
      return { w, c };
    });
    console.log({ name, formated });
    return { name, formated };
  } */

export { getRepos, getCommitsByWeek };
