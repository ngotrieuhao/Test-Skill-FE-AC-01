import { createInterface } from "readline";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

let playersData = [];
let teamsData = [];
let nationsData = [];

const playersJsonPath = join(__dirname, "players.json");
const teamsJsonPath = join(__dirname, "teams.json");
const nationsJsonPath = join(__dirname, "nations.json");

const playersJson = readFileSync(playersJsonPath, "utf-8");
const teamsJson = readFileSync(teamsJsonPath, "utf-8");
const nationsJson = readFileSync(nationsJsonPath, "utf-8");
playersData = JSON.parse(playersJson);
teamsData = JSON.parse(teamsJson);
nationsData = JSON.parse(nationsJson);

function run() {
  console.log(
    "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
  );
  console.log(" ");
  runFirstStep();
}

function continuteOrExit() {
  rl.question("", (inputKey) => {
    if (inputKey === "Enter") {
      runFirstStep();
    } else if (inputKey === "quit") {
      rl.close();
    } else {
      continuteOrExit();
    }
  });
}

function searchSymbol() {
  rl.question("", (secondOption) => {
    // Select Players
    if (secondOption === "1") {
      console.log("Enter search term");
      termPlayer();

      // Select Team
    } else if (secondOption === "2") {
      function getNationName(nationId) {
        const nation = nationsData.find((n) => n._id === nationId);
        return nation ? nation.name : null;
      }
      console.log("Enter search term");

      rl.question("", (inputKey) => {
        if (Object.keys(teamsData[0]).includes(inputKey)) {
          console.log("Enter search value");
          rl.question("", (inputValue) => {
            let results = [];
            for (let i = 0; i < teamsData.length; i++) {
              const team = teamsData[i];
              if (
                team[inputKey]?.toString().toLowerCase() ===
                inputValue.toLowerCase()
              ) {
                results.push({
                  ...team,
                  nation_name: getNationName(team.nation_id),
                  players: getPlayerName(team._id, 'team_id'),
                });
              }
            }
            if (results.length > 0) {
              if (results.length === 1) {
                const resultObject = results[0];
                console.log("=> Result: ");
                console.log(resultObject);
                console.log(
                  "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
                );
                continuteOrExit();
              } else {
                console.log("=> Result: ");
                console.log(results);
                console.log(
                  "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
                );
                continuteOrExit();
              }
            } else {
              console.log("No matching results found");
              continuteOrExit();
            }
          });
        } else {
          termTeam();
        }
      });

      // Select Nations
    } else if (secondOption === "3") {
      console.log("Enter search term");
      rl.question("", (inputKey) => {
        if (Object.keys(nationsData[0]).includes(inputKey)) {
          console.log("Enter search value");
          rl.question("", (inputValue) => {
            let results = [];
            for (let i = 0; i < nationsData.length; i++) {
              const nation = nationsData[i];
              if (
                nation[inputKey]?.toString().toLowerCase() ===
                inputValue.toLowerCase()
              ) {
                results.push({
                  ...nation,
                  team_name: getTeamName(nation._id, 'nation_id'),
                  players: getPlayerName(nation._id, 'nation_id'),
                });
              }
            }
            if (results.length > 0) {
              if (results.length === 1) {
                const resultObject = results[0];
                console.log("=> Result: ");
                console.log(resultObject);
                console.log(
                  "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
                );
                continuteOrExit();
              } else {
                console.log("=> Result: ");
                console.log(results);
                console.log(
                  "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
                );
                continuteOrExit();
              }
            } else {
              console.log("No matching results found");
              continuteOrExit();
            }
          });
        } else {
          termTeam();
        }
      });
    } else {
      searchSymbol();
    }
  });
}

function termPlayer() {
  function getNationName(nationId) {
    const nation = nationsData
      .filter((n) => n._id === nationId)
      .map((nationName) => nationName.name);
    return nation;
  }

  function searchValuePlayer(inputKey) {
    rl.question("", (inputValue) => {
      let results = [];
      for (let i = 0; i < playersData.length; i++) {
        const player = playersData[i];
        if (
          player[inputKey]?.toString().toLowerCase() ===
          inputValue.toLowerCase()
        ) {
          results.push({
            ...player,
            nation_name: getNationName(player.nation_id),
            team_name: getTeamName(player.team_id, '_id'),
          });
        }
      }
      if (results.length > 0) {
        if (results.length === 1) {
          const resultObject = results[0];
          console.log("=> Result: ");
          console.log(resultObject);
          console.log(" ");
          console.log(
            "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
          );
          continuteOrExit();
        } else {
          console.log("=> Result: ");
          console.log(results);
          console.log(" ");
          console.log(
            "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
          );
          continuteOrExit();
        }
      } else {
        console.log("No matching results found");
        searchValuePlayer(inputKey);
      }
    });
  }
  rl.question("", (inputKey) => {
    if (Object.keys(playersData[0]).includes(inputKey)) {
      console.log("Enter search value");
      searchValuePlayer(inputKey);
    } else {
      termPlayer();
    }
  });
}

function termTeam() {
  function getNationName(nationId) {
    const nation = nationsData.find((n) => n._id === nationId);
    return nation ? nation.name : null;
  }
  function searchValueTeam(inputKey) {
    rl.question("", (inputValue) => {
      let results = [];
      for (let i = 0; i < teamsData.length; i++) {
        const team = teamsData[i];
        if (
          team[inputKey]?.toString().toLowerCase() ===
          inputValue.toLowerCase()
        ) {
          results.push({
            ...team,
            nation_name: getNationName(team.nation_id),
            players: getPlayerName(team._id, 'team_id'),
          });
        }
      }
      if (results.length > 0) {
        if (results.length === 1) {
          const resultObject = results[0];
          console.log("=> Result: ");
          console.log(resultObject);
          console.log(" ");
          console.log(
            "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
          );
          continuteOrExit();
        } else {
          console.log("=> Result: ");
          console.log(results);
          console.log(" ");
          console.log(
            "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
          );
          continuteOrExit();
        }
      } else {
        console.log("No matching results found");
        searchValueTeam(inputKey);
      }
    });
  }

  rl.question("", (inputKey) => {
    if (Object.keys(teamsData[0]).includes(inputKey)) {
      console.log("Enter search value");
      searchValueTeam(inputKey);
    } else {
      termTeam();
    }
  });
}

function termNation() {
  function searchValueNation(inputKey) {
    rl.question("", (inputValue) => {
      let results = [];
      for (let i = 0; i < nationsData.length; i++) {
        const nation = nationsData[i];
        if (
          nation[inputKey]?.toString().toLowerCase() ===
          inputValue.toLowerCase()
        ) {
          results.push({
            ...nation,
            team_name: getTeamName(nation._id, 'nation_id'),
            players: getPlayerName(nation._id, 'nation_id'),
          });
        }
      }
      if (results.length > 0) {
        if (results.length === 1) {
          const resultObject = results[0];
          console.log("=> Result: ");
          console.log(resultObject);
          console.log(" ");
          console.log(
            "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
          );
          continuteOrExit();
        } else {
          console.log("=> Result: ");
          console.log(results);
          console.log(" ");
          console.log(
            "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
          );
          continuteOrExit();
        }
      } else {
        console.log("No matching results found");
        searchValueNation(inputKey);
      }
    });
  }

  rl.question("", (inputKey) => {
    if (Object.keys(nationsData[0]).includes(inputKey)) {
      console.log("Enter search value");
      searchValueNation(inputKey);
    } else {
      termNation();
    }
  });
}

function runFirstStep() {
  console.log("Select search options:");
  console.log(" - Press 1 to search");
  console.log(" - Press 2 to view a list of searchable fields");
  console.log(
    " - Type \x1b[38;2;242;127;36m'quit'\x1b[0m to \x1b[38;2;0;155;117mexit\x1b[0m"
  );
  console.log(" ");
  rl.question("", (selectedOption) => {
    // Selected for Search
    if (selectedOption === "1") {
      console.log("Select 1: Players or 2: Teams or 3: Nations");
      rl.question("", (secondOption) => {
        // Select Players
        if (secondOption === "1") {
          console.log("Enter search term");
          termPlayer();
          // Select Team
        } else if (secondOption === "2") {
          console.log("Enter search term");
          termTeam();
          // Select Nations
        } else if (secondOption === "3") {
          console.log("Enter search term");
          termNation();
        } else {
          searchSymbol();
        }
      });

      // Selected for View
    } else if (selectedOption === "2") {
      console.log("Select 1: Players or 2: Teams or 3: Nations");
      rl.question("", (viewOption) => {
        // View Players key
        if (viewOption === "1") {
          const keys = Object.keys(playersData[0]);
          console.log("=> Result: ");
          console.log("Search Players with");
          console.log(String(keys.join("\n")));
          console.log(" ");
          console.log(
            "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
          );
          continuteOrExit();

          // View Teams key
        } else if (viewOption === "2") {
          const keys = Object.keys(teamsData[0]);
          console.log("=> Result: ");
          console.log("Search Teams with");
          console.log(String(keys.join("\n")));
          console.log(" ");
          console.log(
            "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
          );
          continuteOrExit();

          // View Nations key
        } else if (viewOption === "3") {
          const keys = Object.keys(nationsData[0]);
          console.log("=> Result: ");
          console.log("Search Nations with");
          console.log(String(keys.join("\n")));
          console.log(" ");
          console.log(
            "Type \x1b[38;2;242;127;36m'quit'\x1b[0m to exit any time. Press \x1b[38;2;0;155;117m'Enter'\x1b[0m to continute"
          );
          continuteOrExit();
        } else {
          console.log("Invalid option for search.");
          continuteOrExit();
        }
      });
      // Quit
    } else if (selectedOption === "quit") {
      rl.close();
    } else {
      runFirstStep();
    }
  });
}

function getTeamName(id, key) {
  const team = teamsData
    .filter((n) => n[key] === id)
    .map((teamName) => teamName.name);
  return team;
}

function getPlayerName(id, key) {
  const player = playersData
    .filter((n) => n[key] === id)
    .map((matchingPlayer) => matchingPlayer.name);
  return player;
}

run();