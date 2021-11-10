import React from 'react';
import {connect} from 'react-redux'
import HistoryTrades from "../components/HistoryTrades";

const History = (props) => {
  const {tradeType} = props
    return (
        <div className="history-trades-wrap">
            <HistoryTrades
            tradeType={tradeType}
            />
        </div>
    );
}
const mapDispatchToProps = {
    //createPost, showAlert
}

const mapStateToProps = state => ({
    //balance: state.binary.balance,
})

export default connect(mapStateToProps, mapDispatchToProps)(History)
