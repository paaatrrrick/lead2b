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
  getSheetNames: string;
  createSheet: string;
  getSheet: string;
}

const constants : Constants = {
  serverUrl: isLocal ? "http://localhost:4500" : "https://lead2b.up.railway.app/",
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
    getSheetNames: "/sheet/getNames",
    createSheet: "/sheet/create",
    getSheet: "/sheet/get",
  }
};

export default constants;


