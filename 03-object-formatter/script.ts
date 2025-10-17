/*
convert :

{ 
    "cpu": { "core": 7, "usage": "3.65 %" }, 
    "ram": { "usage": "9.3 GB", "total": "9.71 GB" }, 
    "disk": { "usage": "65.15 GB", "total": "90.46 GB" }, 
    "network": { "received": "98.94 MB", "transmitted": "89.79 MB", "total": "188.72 MB" }
}

to:

[
  {
    usage: "",
    total: "",
    unit: ""
  }
]
*/

interface Resources {
  cpu: {
    core: number;
    usage: string;
  };
  ram: {
    usage: string;
    total: string;
  };
  disk: {
    usage: string;
    total: string;
  };
  network: {
    received: string;
    transmitted: string;
    total: string;
  };
}

const resources: Resources = {
  cpu: {
    core: 7,
    usage: "3.65 %",
  },
  ram: {
    usage: "9.3 GB",
    total: "9.71 GB",
  },
  disk: {
    usage: "65.15 GB",
    total: "90.46 GB",
  },
  network: {
    received: "98.94 MB",
    transmitted: "89.79 MB",
    total: "188.72 MB",
  },
};

const entries = Object.entries(resources);

const formattedResources = () => {
  return entries.map(([key, val]) => {
    let usage,
      unit,
      total = "";

    if (key === "cpu") {
      usage = val?.usage;
      total = val?.core;
      unit = "Core";
    } else if (key === "ram" || key === "disk") {
      usage = val?.usage;
      total = val?.total;
      unit = "GB";
    } else {
      usage = Number(val?.received) + Number(val?.transmitted);
      total = val?.total;
      unit = "MB";
    }

    return { usage, total, unit };
  });
};
