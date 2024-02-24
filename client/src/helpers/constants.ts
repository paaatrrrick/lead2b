let isLocal = false;
try {
  isLocal = window.location.href.includes('localhost');
} catch (e) {}
  
interface Constants {
    serverUrl: string;
    isLocal: boolean;
    errorTimeout: number;
    routes: Routes;
    endpoints: Endpoints;
}

interface Routes {
  defaultAuthenticatedRoute: string;
  login: string;
  signup: string;
  home: string;
  dashboard: string;
}

interface Endpoints {
  emailSignUp: string;
  googleSignUp: string;
}

//TODO_UPDATE_THIS: Update the serverUrl to your server url
const constants : Constants = {
  serverUrl: isLocal ? "http://localhost:4500" : "https://boilerplate.up.railway.app",
  isLocal: isLocal,
  errorTimeout: 7500,
  routes: {
    defaultAuthenticatedRoute: "/dashboard",
    login: "/login",
    signup: "/signup",
    home: "/",
    dashboard: "/dashboard",
  },
  endpoints: {
    emailSignUp: "/auth/email-signup",
    googleSignUp: "/auth/google-signup",
  }
};

export default constants;


