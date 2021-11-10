import React from 'react';
import {connect} from 'react-redux'
import { useTranslation } from 'react-i18next'

const Descriptions = (props) => {
  const { t } = useTranslation();
    return (
        <div className="description-wrap">
            <div className="description-body">
                <div className="description-title">
                    <i className="fas fa-project-diagram"></i>
                    <p>{t('description')}</p>
                </div>
                <div className="description-content">
                    <p>
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
