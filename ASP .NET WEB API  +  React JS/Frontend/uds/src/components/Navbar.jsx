import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import LoginForm from './LoginForm';  // Import the LoginForm component

const Navbar = () => {
  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/" style={{ fontWeight: 'bold', color: '#2C3E50', fontSize: '1.5rem' }}>
            Ultimate Dine Solutions
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav" 
            aria-controls="navbarNav" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/" aria-current="page">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/features">Features</Link>
              </li>
              <li className="nav-item">
                {/* <Link className="nav-link" to="/welcome">Welcome</Link> */}
              </li>
            </ul>
            <button
              className="btn btn-success ms-auto"
              style={{ color: 'white' }}
              onClick={handleOpenLogin} // Open login dialog
            >
              Log in as Restaurant
            </button>
          </div>
        </div>
      </nav>

      <LoginForm open={openLogin} onClose={handleCloseLogin} /> {/* Render LoginForm */}
    </>
  );
}

export default Navbar;






// import React from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg bg-body-tertiary">
//       <div className="container-fluid">
//       <a className="navbar-brand" href="#" style={{ fontWeight: 'bold', color: '#2C3E50', fontSize: '1.5rem' }}>Ultimate Dine Solutions</a>

//         {/* <a className="navbar-brand" href="#">Ultimate Dine Solutions</a> */}
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//           <div className="navbar-nav">
//             <a className="nav-link active" aria-current="page" href="#">Home</a>
//             <a className="nav-link" href="#">Features</a>
//             <a className="nav-link" href="#">Pricing</a>
//             <a className="nav-link disabled" aria-disabled="true">Disabled</a>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
