require("dotenv").config();
//var redirectAliases = require("./public/_redirects.js");
var sidebarImport = require("./sidebar.js");
//var algoliaSecret = require("./algolia-secret.js");

const autometa_options = {
  schema: true,
  site: {
    name: "Tokel Documentation",
    //twitter: "tokel",
  },
  canonical_base: "https://docs.tokel.io",
};

module.exports = {
  plugins: {
    // redirect: {
    //   alias: redirectAliases,
    // },
    "@vuepress/back-to-top": {},
    autometa: autometa_options,
    "@vuepress/last-updated": {
      transformer: (timestamp) => {
        // Don't forget to install moment yourself
        const moment = require("moment");
        return moment(timestamp).fromNow();
      },
    },
    "vuepress-plugin-medium-zoom": {
      //selector: ".my-wrapper .my-img",
      delay: 1000,
      options: {
        margin: 24,
        background: "#026782",
        scrollOffset: 0,
      },
    },
    // "vuepress-plugin-google-tag-manager": {
    //   gtm: "GTM-PC28587",
    // },
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/tokel_fav.svg",
      },
    ],
    /*[
      "meta",
      {
        name: "twitter:image",
        content:
          "https://developers.komodoplatform.com/start-here-pics/Dev_Docs_Introduction_small.png",
      },
    ],
    [
      "meta",
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],
    [
      "meta",
      {
        name: "twitter:site",
        content: "@tokel",
      },
    ],
    [
      "meta",
      {
        name: "twitter:title",
        content: "Tokel Developer Documentation",
      },
    ],
    [
      "meta",
      {
        name: "twitter:description",
        content: "Documentation for developers building on the Tokel Platform",
      },
    ],
   */
  ],
  title: "Tokel Documentation",
  base: "/",
  description: "Documentation for developers building on Tokel",
  themeConfig: {
    repo: "TokelPlatform/documentation",
    repoLabel: "Github",
    docsDir: "docs",
    editLinks: true,
    editLinkText: "Suggest an improvement for this page",
    //lastUpdated: "Last Updated",
    // sidebarDepth: 3,
    logo: "/tokel_logo.svg",
    // algolia: {
    //   apiKey: algoliaSecret.key,
    //   indexName: "komodoplatform",
    // },
    nav: [
      {
        text: "White Paper",
        link: "https://tokel.io/TokelPaper1stEdition.pdf",
      },
      {
        text: "tokel.io",
        link: "https://tokel.io",
      },
    ],
    sidebar: sidebarImport,
  },
};
