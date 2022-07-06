import * as React from "react"
import "./ContactUs.css"

export default function ContactUs(props) {
    return (
        <div className="contact-us">
            <h1 className="contact-us-header">
                Contact Us
            </h1>
            <div className="contact-us-info">
                <div className="contact-us-info-email">Email: idk@fb.com</div>
                <div className="contact-us-info-phone">Phone: 1-800-idk</div>
            </div>
        </div>
    )
}