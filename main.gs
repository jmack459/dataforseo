const userName = "jeff@the.com";
const password = "88a798a9774de66d";
const base64 = "amVmZkB0aGUuY29tOjg4YTc5OGE5Nzc0ZGU2NmQ=";
function stringReturn(urlList) {
  if (urlList.length === 1) {
    console.log("made it here");
    return urlList[0];
  }
  return urlList[1];
}

function cleanURL(url) {
  url = stringReturn(url.split("https://"));
  url = stringReturn(url.split("www."));
  url = url.split("/")[0];
  console.log(url);
  return url;
}

/* This function won't work here because we don't have access to buffer. Use this in JAVASCript to get buffer.
const base64 = (userName, password) => {
  const combined = `${userName}:${password}`;
  const buff = Buffer.from(combined);
  const base64 = buff.toString("base64");
  return base64;
};
*/
const fetchFunction = (searchString) => {
  const headers = {
    "content-type": "application/json",
    Authorization: `Basic ${base64}`,
  };
  const payload = [
    {
      language_code: "en",
      location_code: 2840,
      keyword: `site:${searchString}`,
      calculate_rectangles: true,
    },
  ];
  const response = UrlFetchApp.fetch(
    "https://api.dataforseo.com/v3/serp/google/organic/live/advanced",
    {
      method: "POST",
      headers,
      payload: JSON.stringify(payload),
    }
  );

  const datastring = response.getContentText();
  //grab results amount
  Logger.log(datastring);
  const data = JSON.parse(datastring);
  const tasks = data.tasks;
  const task = tasks[0];
  const results = task.result;
  const result = results[0];
  return result.se_results_count;
};

async function URLFETCH(input) {
  const url = String(input);
  const fixed = cleanURL(url);

  if (fixed === undefined) {
    return "URL ISSUE";
  }
  return fetchFunction(fixed);
}
