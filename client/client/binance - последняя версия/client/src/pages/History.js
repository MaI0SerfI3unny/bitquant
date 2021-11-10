import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'
import HistoryTrades from "../components/HistoryTrades";
import {wrapMapToPropsConstant} from "react-redux/lib/connect/wrapMapToProps";

const History = (props) => {

    return (
        <div className="history-trades-wrap">
            <HistoryTrades></HistoryTrades>
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
