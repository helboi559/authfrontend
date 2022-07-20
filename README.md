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