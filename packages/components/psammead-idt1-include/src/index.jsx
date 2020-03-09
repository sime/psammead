import React, { useState, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Idt1Include = ({ html, requireJsSrc }) => {
  return (
    <>
      <Helmet>
        <script src={requireJsSrc} />
      </Helmet>

      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default Idt1Include;
