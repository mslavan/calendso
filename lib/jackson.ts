import jackson from "@boxyhq/saml-jackson";

import { BASE_URL } from "@lib/config/constants";
import { samlDatabaseUrl } from "@lib/saml";

// Set the required options. Refer to https://github.com/boxyhq/jackson#configuration for the full list
const opts = {
  externalUrl: BASE_URL,
  samlPath: "/api/auth/saml/callback",
  db: {
    engine: "sql",
    type: "postgres",
    url: samlDatabaseUrl,
    encryptionKey: process.env.CALENDSO_ENCRYPTION_KEY,
  },
};

let apiController: any;
let oauthController: any;

const g = global as any;

export default async function init() {
  if (!g.apiController || !g.oauthController) {
    const ret = await jackson(opts);
    apiController = ret.apiController;
    oauthController = ret.oauthController;
    g.apiController = apiController;
    g.oauthController = oauthController;
  } else {
    apiController = g.apiController;
    oauthController = g.oauthController;
  }

  return {
    apiController,
    oauthController,
  };
}