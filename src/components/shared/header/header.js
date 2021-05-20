import React from 'react';

const Header = () => {
    return (
      <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 me-md-auto font-weight-normal">Company name</h5>
        <nav className="my-2 my-md-0 me-md-3">
          <a className="p-2 text-dark" href="#">El1</a>
          <a className="p-2 text-dark" href="#">El2</a>
          <a className="p-2 text-dark" href="#">El3</a>
        </nav>
        <a className="btn btn-outline-primary" href="#">Sign in</a>
      </header>
    );
  };
  
  export default Header;