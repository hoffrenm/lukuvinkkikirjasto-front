import React from 'react';
import { connect } from 'react-redux';

const TipList = (props) => {

    if (props.tips.processing) {
        return <div>Lataillaan...</div>;
    }

    if ( props.tips.tipdata.length === 0 ) {
        return null;
    }

    const tips = props.tips.tipdata;

    return (
        <div>
            <h2>Lukuvinkit</h2>
            {tips.map((tip) => {
                return (
                    <div data-cy="tip-item" key={tip.id} className="tip-list-item">
                        <div className="tip-content">
                            {tip.title} {tip.url}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        tips: state.tips
    };
};

const connectedTipList = connect(mapStateToProps)(TipList);
export default connectedTipList;