import React from 'react';
import {connect} from 'react-redux'
import { useTranslation } from 'react-i18next'

const Instructions = (props) => {
  const { t } = useTranslation();

    return (
        <div className="instructions-wrap">
            <div className="instructions-body">
                <div className="instructions-title">
                    <i className="fas fa-book"></i>
                    <p className="">{t('instruction')}</p>
                </div>
                <div className="instructions-content">
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

export default connect(mapStateToProps, mapDispatchToProps)(Instructions)
