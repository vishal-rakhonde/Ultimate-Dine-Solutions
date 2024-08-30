import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'; // Ensure MDB CSS is loaded

function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
        </div>
        <div>
          <a href='https://www.facebook.com' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='https://www.twitter.com' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='https://www.google.com' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='https://www.instagram.com' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='https://www.linkedin.com' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='https://www.github.com' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>
      <section>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="utensils" className="me-3" />
                Ultimate Dine Solutions
              </h6>
              <p>
                Ultimate Dine Solutions is your go-to platform for managing restaurant operations seamlessly. From menu management to employee oversight, billing, and orders, we have you covered.
              </p>
            </MDBCol>
            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Services</h6>
              <p>
                <a href='#' className='text-reset'>Menu Management</a>
              </p>
              <p>
                <a href='#' className='text-reset'>Employee Management</a>
              </p>
              <p>
                <a href='#' className='text-reset'>Billing</a>
              </p>
              <p>
                <a href='#' className='text-reset'>Order Management</a>
              </p>
            </MDBCol>
            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Quick Links</h6>
              <p>
                <a href='#pricing' className='text-reset'>Pricing</a>
              </p>
              <p>
                <a href='#settings' className='text-reset'>Settings</a>
              </p>
              <p>
                <a href='#orders' className='text-reset'>Orders</a>
              </p>
              <p>
                <a href='#help' className='text-reset'>Help</a>
              </p>
            </MDBCol>
            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact Us</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                support@ultimatedinesolutions.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +1 234 567 890
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> +1 234 567 891
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='https://ultimatedinesolutions.com/'>
          UltimateDineSolutions.com
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
