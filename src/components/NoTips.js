import React from 'react'
import { Link } from 'react-router-dom';

const NoTips = () => (
    <div>
        <p>Et ole lisännyt vinkkejä vielä</p>
        <Link to={"/add-tip"} >
             <button className="button button-primary">Lisää uusi vinkki</button>
        </Link>
    </div>
);

export default NoTips;