import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export const EmailTask = () => {
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (formData.user_name.trim() === "") {
      errors.user_name = "Name is required";
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.user_email)) {
      errors.user_email = "Invalid email address";
      isValid = false;
    }

    if (formData.message.trim() === "") {
      errors.message = "Message is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    emailjs
      .sendForm("service_fvomhsc", "template_zlhxvq3", "#yourFormID", {
        publicKey: "sqJQ_baadMUJfiaik",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          // Clear form inputs
          setFormData({
            user_name: "",
            user_email: "",
            message: "",
          });
          // Show success popup for 3 seconds
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 3000);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="min-h d-flex">
      <div className="container">
        <h2>Contact Us</h2>
        <form onSubmit={sendEmail} id="yourFormID">
          <div className="form-group">
            <label htmlFor="user_name">Name:</label>
            <input
              type="text"
              id="user_name"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
            {errors.user_name && <span className="error">{errors.user_name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="user_email">Email:</label>
            <input
              type="email"
              id="user_email"
              name="user_email"
              value={formData.user_email}
              onChange={handleChange}
              required
            />
            {errors.user_email && <span className="error">{errors.user_email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            {errors.message && <span className="error">{errors.message}</span>}
          </div>
          <div className="form-group">
            <button type="submit">Send</button>
          </div>
        </form>
        {showPopup && (
          <div className="success-popup">
            Email sent successfully!
          </div>
        )}
      </div>
    </div>
  );
};