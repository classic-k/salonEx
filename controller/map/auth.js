import expressAsyncHandler from "express-async-handler";
import { config } from "dotenv";
import msal from "@azure/msal-node";

config();
export const cca = new msal.ConfidentialClientApplication({
  auth: {
    clientId: process.env.MSALCID,
    authority: process.env.MSALAUTH,
    clientSecret: process.env.MSALSEC,
  },
  system: {
    loggerOptions: {
      loggerCallback: (loglevel, message, containsPii) => {
        // console.log(message);
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
});

export const con_cli = expressAsyncHandler(async (req, res) => {
  const authUrlParam = {
    scopes: ["user_impersonation"],
    redirectURI: "http://localhost:5000/redirect",
  };

  cca
    .getAuthCodeUrl(authUrlParam)
    .then((response) => {
      res.redirect(response);
    })
    .catch((errs) => console.log(JSON.stringify(errs)));
});

export function url_re() {
  let token;
  const tokenreq = {
    scopes: ["https://atlas.microsoft.com/.default"],
    // redirectURI:"http://localhost:5000/redirect"
  };

  cca
    .acquireTokenByClientCredential(tokenreq)
    .then((data) => data.json())
    .then((dt) => dt)
    .catch((err) => {
      console.log(err);
    });
  //token = res.accessToken;
  //console.log(token)
  // return token;
}
