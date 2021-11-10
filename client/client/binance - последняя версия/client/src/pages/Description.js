import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux'

const Descriptions = (props) => {

    return (
        <div className="description-wrap">
            <div className="description-body">
                <div className="description-title">
                    <i className="fas fa-project-diagram"></i>
                    <p className="">Описание проекта</p>
                </div>
                <div className="description-content">
                    <p className="">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aut consectetur, consequatur cum et exercitationem hic iste itaque molestias non obcaecati provident quia quos reiciendis repellat sed tenetur ut, voluptates.
                    </p>
                </div>
            </div>
        </div>
    );
}
const mapDispatchToProps = {
    //createPost, showAlert
}

const mapStateToProps = state => ({
    //balance: state.binary.balance,
})

export default connect(mapStateToProps, mapDispatchToProps)(Descriptions)
