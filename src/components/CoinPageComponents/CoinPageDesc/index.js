import React from "react";

function CoinPageDesc({ name, desc, officialPage }) {
  return (
    <div className="coin-page-div description">
      <h2>{name}</h2>
      <p dangerouslySetInnerHTML={{ __html: desc }} />
      <a href={officialPage} target="_blank">Visit Official Page</a>
    </div>
  );
}

export default CoinPageDesc;