import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [otpVisible, setOtpVisible] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    cardNo: "",
    expiryDate: "",
    cvv: "",
  });
  const [otp, setOtp] = useState("");
  const [paymentId, setPaymentId] = useState(null);
  const [isPayButtonEnabled, setIsPayButtonEnabled] = useState(false);

  // Check card details with database
  const checkCardDetails = async () => {
    try {
      const response = await axios.post('http://localhost:5202/api/payment/check', cardDetails);
      if (response.data.valid) {
        setPaymentId(response.data.id);
        setIsPayButtonEnabled(true);
      } else {
        setIsPayButtonEnabled(false);
        toast.error("Invalid card details", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Error validating card details", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({ ...cardDetails, [name]: value });
    if (cardDetails.cardNo && cardDetails.expiryDate && cardDetails.cvv) {
      checkCardDetails();
    }
  };

  const handlePayClick = () => {
    if (paymentMethod === "card") {
      setOtpVisible(true);
    } else {
      toast.success("Payment done successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      // Redirect to home page or perform other actions
    }
  };

  const handleVerifyAndPayClick = async () => {
    try {
      const response = await axios.post('http://localhost:5202/api/payment/verify', { otp, id: paymentId });
      if (response.data.valid) {
        toast.success("Payment done successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        // Redirect to home page
        window.location.href = "/";
      } else {
        toast.error("Wrong OTP", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Error verifying OTP", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="payment-container">
      <style>
        {`
          .payment-container {
            max-width: 400px;
            margin: 50px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f9f9f9;
          }
          .payment-methods {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }
          .payment-methods button {
            padding: 10px 20px;
            border: 1px solid #ddd;
            border-radius: 4px;
            cursor: pointer;
            background-color: #fff;
            color: #333;
            transition: background-color 0.3s, color 0.3s;
          }
          .payment-methods button.active {
            background-color: #FF5722;
            color: #fff;
            border-color: #FF5722;
          }
          .payment-methods button.upi {
            background-color: #FFC107;
            color: #000;
          }
          .form-group {
            margin-bottom: 15px;
          }
          .form-group label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
          }
          .form-group input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-color: #fff;
            color: #000;
          }
          .barcode {
            width: 100%;
            height: 150px;
            background-color: #f9f9f9;
            margin-bottom: 15px;
            text-align: center;
            line-height: 150px;
            font-size: 18px;
            color: #555;
            border: 1px solid #ddd;
            border-radius: 4px;
            background-image: url('/path/to/your/image.jpg'); /* Update with the path to your UPI barcode image */
            background-size: cover;
            background-position: center;
          }
          .pay-button {
            width: 100%;
            padding: 10px;
            border: none;
            background-color: #FF5722;
            color: #fff;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }
          .otp-container {
            margin-top: 20px;
          }
        `}
      </style>

      <div className="payment-methods">
        <button
          className={paymentMethod === "card" ? "active" : ""}
          onClick={() => setPaymentMethod("card")}
        >
          Card Payment
        </button>
        <button
          className={`upi ${paymentMethod === "upi" ? "active" : ""}`}
          onClick={() => setPaymentMethod("upi")}
        >
          UPI
        </button>
      </div>

      {paymentMethod === "upi" && (
        <>
          <div className="barcode">Dummy Barcode</div>
          <div>Total Price: ₹500</div>
          <button className="pay-button" onClick={handlePayClick}>
            Pay
          </button>
        </>
      )}

      {paymentMethod === "card" && (
        <>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNo"
              maxLength="16"
              pattern="\d*"
              value={cardDetails.cardNo}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              maxLength="5"
              value={cardDetails.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
            />
          </div>
          <div className="form-group">
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              maxLength="3"
              pattern="\d*"
              value={cardDetails.cvv}
              onChange={handleInputChange}
              placeholder="123"
            />
          </div>
          <button
            className="pay-button"
            onClick={handlePayClick}
            disabled={!isPayButtonEnabled}
          >
            Pay
          </button>

          {otpVisible && (
            <div className="otp-container">
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  maxLength="6"
                  pattern="\d*"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                />
              </div>
              <button className="pay-button" onClick={handleVerifyAndPayClick}>
                Verify and Pay
              </button>
            </div>
          )}
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default Payment;
