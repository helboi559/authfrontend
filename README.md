### Requirements (Front-End-Boilerplate)

* Second, we will create a new react app for our front-end

* Create a new github repo called authfrontend, clone the repo to your computer and add the link to populi.
* Initialize the repo with create-react-app.
    * npx create-react-app .
* Install react-router
    * npm i react-router-dom@6
* Configure react-router by adding <BrowserRouter> to index.js.
  * import { BrowserRouter } from "react-router-dom";
  * root.render(
      <React.StrictMode>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </React.StrictMode>
    );

### Requirements (Front-End - Authentication)

* Third, we will create some basic pages including the registration and login page

* Create a new folder ./src/Pages
* Create a new file ./src/Pages/RegistrationPage.js with a default exported react component <RegistrationPage />
* Create a new file ./src/Pages/LoginPage.js with a default exported react component <LoginPage />
* Create a new file ./src/Pages/HomePage.js with a default exported react component <HomePage />
* Create a new folder ./src/Components
* Create a new file ./src/Components/NavBar.js with a default exported react component <NavBar /> and implement the following:
  * Add this import statement:
    * import { Outlet, Link } from "react-router-dom";
  * Add the following code to the JSX return statement of <NavBar />:
    * <div>
        <nav>
          <h3>NavBar</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/registration">Registration</Link>
            </li>
          </ul>
        </nav>
        <Outlet />
      </div>
* In <App>, implement the following:
  * Note: You will have to write the import statements for importing Pages and Components in order to support the following code.
  * Add this import statement:
    * import { Routes, Route } from "react-router-dom";
  * Add the following string as a global variable above the <App /> component:
    * const urlEndpoint ="http://localhost:4000";
  * Add the routes elements to the JSX 
    * <Routes></Routes>
  * Create a new route where the path is "/" and the element is <Navbar />, then nest the following routes within it:
    * A new index route with the element <HomePage />
    * A new route with the path "/login" and the element <LoginPage />
    * A new route with the path "/registration" and the element <RegistrationPage />
    * The routes should look similar to this:
    * <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<RegistrationPage />} />
        </Route>
      </Routes>

### Requirements  2B (Front-End - JWT Implementation)

* Fourth, we will implement the auth flow functionality

* In the root folder ./, implement the following:
  * Add a new env file ./.env.local and add the following environment variables to it:
    * REACT_APP_TOKEN_HEADER_KEY = ci_token_header_key
    * REACT_APP_URL_ENDPOINT = http://localhost:4000
    * Note: For react applications, environment variables MUST start with REACT_APP and by convention the file is named .env.local
* Add a new file ./src/Auth.js and implement the following:
  * Add a new variable in the global scope:
    * const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
  * Add a new exported function registerUser that does the following:
    * It should have two function parameters: username and password
      * export const registerUser = (username, password) => {}
    * In the function body, it should create a POST request to `${urlEndpoint}/auth/register-user` with a JSON.stringified object containing the user's username and password:
      * body: JSON.stringify({
        username,
        password
      })
      * Note: Do not forget to set the following header in the POST request:
        * headers: {
            'Content-Type': 'application/json'
          }
    * Finally, it should return true or false based upon the success message returned from the server
  * Add a new exported function loginUser that does the following:
    * It should have two function parameters: username and password
    * In the function body, it should create a POST request to `${urlEndpoint}/auth/login-user` with a JSON.stringified object containing the user's username and password:
      * body: JSON.stringify({
        username,
        password
      })
      * headers: {
          'Content-Type': 'application/json'
        }
    * It should await to receive a success message from the server
    * If the login was successful, it should set a new token in local storage:
      * const responseJSON = await response.json();
        if (responseJSON.success) {
          localStorage.setItem(process.env.REACT_APP_TOKEN_HEADER_KEY, JSON.stringify(responseJSON.token));
        }
      * Note: We will be using this local storage item on the front end to determine if the user is logged in or not. If the token exists, we assume the user is logged in. If the token does not exist for any page that requires authentication, we will redirect the user to the login page.
    * It should return true if all the above executed properly
  * Add a new exported function logoutUser that does the following:
    * localStorage.removeItem(process.env.REACT_APP_TOKEN_HEADER_KEY);
  * Add a new exported function getUserToken that does the following:
    * return JSON.parse(localStorage.getItem(process.env.REACT_APP_TOKEN_HEADER_KEY));

* In <App />, implement the following:
  * Add a new state variable isAuthLoading
  * Pass the isAuthLoading state variable as well as its setter function as props into <NavBar>, <RegistrationPage />, and <LoginPage />

* In <RegistrationPage />, implement the following:
  * Add two new state variables: username and password
  * Add two new text input fields and hook them up to username and password (the input fields should set the values for the two state variables)
  * Import the following functions from ./src/Auth.js: registerUser and loginUser
  * Add a button called Signup with the following functionality in the async onClick handler:
    * The function should call registerUser and pass in the username and password as arguments:
      * registerUser(username, password)
    * It should call props.setIsAuthLoading(true)
    * It should await for registerUser to return true
    * If registerUser returned true, it should call loginUser with the username and password as arguments
    * If loginUser returned true, it should:
      * Call props.setIsAuthLoading(false)
      * Programmatically redirect to "/"
        * const navigate = useNavigate()
        * navigate(`/`)

* In <LoginPage />, implement the following:
  * Add two new state variables: username and password
  * Add two new text input fields and hook them up to username and password
  * Import the function loginUser from ./src/Auth.js
  * Add a button called Login with the following functionality in the async onClick handler:
    * The function should call loginUser and pass in the username and password as arguments:
      * loginUser(username, password)
    * It should call props.setIsAuthLoading(true)
    * It should await for loginUser to return true
    * If loginUser returned true, it should:
      * Call props.setIsAuthLoading(false)
      * Programmatically redirect to "/"
        * const navigate = useNavigate()
        * navigate(`/`)
  
* In <NavBar />, implement the following:
  * Import the following functions from ./src/Auth.js: getUserToken and logoutUser
  * Add a new state variable called userToken
  * Add a new useEffect to <NavBar />
    * useEffect(()=>{
      const userToken = getUserToken()
      setUserToken(userToken)
    }, [isAuthLoading])
  * Update the return JSX in <NavBar /> to be the following:
    * <div>
        <nav>
          <h3>NavBar</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!userToken && 
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/registration">Registration</Link>
              </li>
            }
          </ul>
          {userToken && 
            <span><strong>You Are Logged In</strong></span>
            <button onClick={()=>{
              logoutUser()
            }}>Logout</button>
          }
        </nav>
        <Outlet />
      </div>

* Note: If all the above was implemented correctly, you should be able to do the entire auth flow from the front end. Register a user, login as that user and logout from that user. You should also see the NavBar update dynamically based upon your login status.