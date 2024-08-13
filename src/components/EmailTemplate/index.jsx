import React from 'react';
import ReactDOMServer from 'react-dom/server';

const EmailTemplate = ({ email, message }) => (
  <html>
    <head>
      <style>
        {`
          body {
            font-family: "__custom_3735ac";
            background: url("/background.jpg") no-repeat center center fixed;
            background-size: cover;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .container {
            background: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 90%;
            max-width: 600px;
            margin: 20px;
          }
          .logo img {
            width: 100%;
            max-width: 300px;
            display: block;
            margin: 0 auto 20px;
          }
          .title h1 {
            color: #05a2ac;
            font-size: 24px;
            text-align: center;
          }
          .form-group {
            margin-bottom: 15px;
          }
          label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
          }
          input, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-bottom: 10px;
          }
          button {
            display: block;
            width: 100%;
            padding: 10px;
            background-color: #00828a;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
          button:hover {
            background-color: #005f6b;
          }
        `}
      </style>
    </head>
    <body>
      <div className="container">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
        </div>
        <div className="title">
          <h1>الموقع تحت التطوير</h1>
        </div>
        <div className="form-group">
          <label>البريد الإلكتروني:</label>
          <input type="text" value={email} readOnly />
        </div>
        <div className="form-group">
          <label>نص الرسالة:</label>
          <textarea value={message} readOnly />
        </div>
      </div>
    </body>
  </html>
);

export const renderEmailTemplate = (props) => ReactDOMServer.renderToStaticMarkup(<EmailTemplate {...props} />);
