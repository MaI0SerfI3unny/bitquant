import React from 'react';
import {connect} from 'react-redux'
import { useTranslation } from 'react-i18next'

const TermsOfUse = (props) => {
  const { t } = useTranslation();

    return (
        <div className="terms-wrap">
            <div className="terms-body">
                <div className="terms-title">
                    <i className="far fa-award"></i>
                    <p className="">{t('terms')}</p>
                </div>
                <div className="terms-content">
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

export default connect(mapStateToProps, mapDispatchToProps)(TermsOfUse)
