export const getFeeds = () => {
  return [
    {
      id: "tagesschau",
      name: "Tagesschau",
      url: "https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml",
    },
    { id: "yc", name: "YCombinator" },
    { id: "lobsters", name: "Lobsters" },
    { id: "vaultwardenrs", name: "Vaultwarden Releases" },
  ];
};
