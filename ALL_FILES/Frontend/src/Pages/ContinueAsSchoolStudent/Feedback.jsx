import React from "react";
import { FaLinkedin, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import GetInTouch from "../../Components/GetInTouch";
import "../../Styles/Feedback.css";

export default function Feedback() {
  return (
    <div className="feedback-container">
      <div className="feedback-hero">
        <h1 className="feedback-title">Let's Connect!</h1>
        <p className="feedback-subtitle">
          Got questions? Want to share feedback? Or just want to say hi? 
          <br />We're all ears and would love to hear from you! 😊
        </p>
      </div>

      <div className="feedback-content">
        <div className="feedback-form-section">
          <div className="form-intro">
            <h2>Drop Us a Message</h2>
            <p>Fill out the form below and we'll get back to you as soon as possible.</p>
          </div>
          <GetInTouch />
        </div>

        <div className="feedback-info-section">
          <div className="social-card">
            <h2 className="social-title">Connect on Social Media</h2>
            <p className="social-description">
              Follow us for updates, tips, and behind-the-scenes content!
            </p>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/ramit8508"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github"
                aria-label="GitHub"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="info-card-full">
        <h2 className="info-title">Other Ways to Reach Us</h2>
        
        <div className="contact-items-grid">
          <div className="contact-item">
            <div className="contact-icon email-icon">
              <FaEnvelope />
            </div>
            <div className="contact-details">
              <h3>Email Us</h3>
              <a href="mailto:ramigoyal1987@gmail.com">ramigoyal1987@gmail.com</a>
              <p className="contact-note">We usually respond within 24 hours</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon phone-icon">
              <FaPhone />
            </div>
            <div className="contact-details">
              <h3>Give Us a Call</h3>
              <a href="tel:+918307730036">+91 8307730036</a>
              <p className="contact-note">Mon - Fri, 9 AM - 6 PM IST</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon location-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="contact-details">
              <h3>Visit Us</h3>
              <p>Zirakpur, Punjab, India</p>
              <p className="contact-note">Drop by for a cup of chai!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

