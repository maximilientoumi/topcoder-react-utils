/**
 * Auxiliary wrapper around React Helmet that helps to generate meta tags for
 * generic use cases.
 */

import PT from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

function MetaTags({
  description,
  domain,
  image,
  siteName,
  socialDescription,
  socialTitle,
  title,
  url,
}) {
  const img = `${domain}${image}`;
  const socTitle = socialTitle || title;
  const socDesc = socialDescription || description;
  return (
    <Helmet>
      {/* General tags. */}
      <title>{title}</title>
      <meta property="description" content={description} />

      {/* Twitter cards. */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={socTitle} />
      <meta name="twitter:description" content={socDesc} />
      { image ? <meta name="twitter:image" content={img} /> : null }
      {
        siteName ? (
          <meta name="twitter:site" content={`@${siteName}`} />
        ) : null
      }

      {/* Open Graph data. */}
      <meta property="og:title" content={socTitle} />
      { image ? <meta property="og:image" content={img} /> : null }
      { image ? <meta property="og:image:alt" content={socTitle} /> : null }
      <meta property="og:description" content={socDesc} />
      {
        siteName ? (<meta property="og:sitename" content={siteName} />) : null
      }
      { url ? (<meta property="og:url" content={url} />) : null }
    </Helmet>
  );
}

MetaTags.defaultProps = {
  image: null,
  siteName: null,
  socialDescription: null,
  socialTitle: null,
  url: null,
};

MetaTags.propTypes = {
  description: PT.string.isRequired,
  domain: PT.string.isRequired,
  image: PT.string,
  siteName: PT.string,
  socialDescription: PT.string,
  socialTitle: PT.string,
  title: PT.string.isRequired,
  url: PT.string,
};

/* TODO: It is not good to depend on the domain written into redux state here,
 * better pass it via the renderer context at the server side, and get it from
 * the location at the frontend side, or something similar? */
export default connect(state => ({ domain: state.domain }))(MetaTags);