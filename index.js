import express from "express";
import bodyParser from "body-parser";
import db from "./db";
import cors from "cors";
const jsonencoder = bodyParser.json();
import _ from "lodash";
import { getRepos, getCommitsByWeek } from "./githubData";

import groupAndTotal from "./groupAndTotal";
import fakedata from "./fakedata";

const app = express();
app.use(cors());

app.get("/", async (req, res, next) => {
  const USER = db.get("user").value();
  const data = await getCommitsByWeek(USER);
  const go = res.send({
    allRepoCommits: await getAllRepoCommits(data),
    eachBiggestCommitWeek: await getEachBiggestCommitWeek(data),
    EachTotalCommits: await EachTotalCommits(data),
    EachAverageGap: "",
    EachAverageCommitCount: await EachAverageCommitCount(data),
    user: USER,
  });
  return go;
});

async function getAllRepoCommits(data) {
  //const data = await getCommitsByWeek(user);
  //const data = fakedata;

  let all = []; //this needs refactorying uhh uhgly
  await data.map(({ repoData }) => {
    repoData.map(data => all.push(data));
  });
  const weeksTotaledData = await groupAndTotal(all, "w", "c");

  return weeksTotaledData;
}
async function getEachBiggestCommitWeek(data) {
  //const data = fakedata; //eventually will be getCommitsByWeek

  const eachRepo = await data.map(repo => {
    const groupedByWeek = groupAndTotal(repo.repoData, "w", "c");
    const biggestCommit = groupedByWeek.reduce(
      (big, next) => (big.total >= next.total ? big : next),
      groupedByWeek[0].total
    );
    return { repoName: repo.name, biggestCommit };
  });
  return eachRepo;
}

async function EachTotalCommits(data) {
  //const data = fakedata; //eventually will be getCommitsByWeek
  const eachRepo = await data.map(repo => {
    const totalCommits = repo.repoData.reduce(
      (total, data) => total + data.c,
      0
    );
    return { repoName: repo.name, totalCommits };
  });
  return eachRepo;
}
async function EachAverageCommitCount(data) {
  //const data = fakedata; //eventually will be getCommitsByWeek
  const eachRepo = await data.map(repo => {
    const totalCommits = repo.repoData.reduce(
      (total, data) => total + data.c,
      0
    );
    const count = repo.repoData.length;
    const averageCommit = Math.floor(totalCommits / count);
    return { repoName: repo.name, averageCommit };
  });
  return eachRepo;
}
app.post("/user-info", jsonencoder, async (req, res, next) => {
  const name = await req.body;
  const update = await db.set("user", name.user).write();

  console.log(db.get("user").value());
  await res.send(db.get("user").value());
  return update;
});

app.listen(3000, console.log("http://localhost:3000"));
